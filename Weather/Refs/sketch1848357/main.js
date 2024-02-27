function setup() {
  canvas = createCanvas(Main.canvasWidth, Main.canvasHeight);
  canvas.parent(select("section.canvas"));
  canvas.id("drawingCanvas");
  stopTouchScrolling(document.getElementById("drawingCanvas"));
  frameRate(Main.frameRate);
  canvasResize();
  pixelDensity(defaultDensity);
  g.pixelDensity(defaultDensity);
  cameraPresetChange();
  //mainPreset.setValue(mainPreset._values[floor(random(Object.keys(mainPreset).length))]);
  //img = loadImage('plain.png'); //Using textures
  presetChange();
  checkBrowser();
  settingsLoad();
  setInterval(checkStates, 500);
}

function draw() {
  clear();
  g.clear();
  g.reset();
  g.push();

  motionFunction();
  cameraFunction();
  bgFunction();

  if (captureBool && Stroke.Type != "Dots") {
    g.strokeWeight(Stroke.Weight * (Export.Size * 0.5));
  } else {
    g.strokeWeight(Stroke.Weight);
  }

  let yStep = yStepFlow;
  let t = -frame / (Loop.Length * Main.frameRate);

  for (let y = 0; y < rows; y++) {
    let xStep = xStepFlow;

    for (let x = 0; x < cols; x++) {
      let noise = 0;
      let octaves = 3;
      let amplitude = 1;
      let sumAmp = 0;
      let detail = map(Noise.Detail, 0, 100, 0, 0.5);
      let detailScale = Noise.detailScale;
      let xfreq = Noise.xFreq;
      let yfreq = Noise.yFreq;
      let xOffset = 51; // Random number for offsetting noise per octave
      let yOffset = 17; // Random number for offsetting noise per octave

      for (let i = 0; i < octaves; i++) {
        let octave = simplex(
          xfreq * x + xStep + xOffset,
          yfreq * y + yStep + yOffset,
          Loop.Speed * cos(TWO_PI * t),
          Loop.Speed * sin(TWO_PI * t)
        );

        switch (Noise.Type) {
          case "Wave":
            noise += octave * amplitude;
            break;

          case "Hill":
            //noise += pow(max(octave, 0), map(Noise.Elevation, 0, 1, 0.9999, 0.0001)) * amplitude;
            noise +=
              map(
                pow(max(octave, 0), map(Noise.Elevation, 0, 1, 0.9999, 0.0001)),
                0,
                1,
                0,
                0.9
              ) * amplitude;
            break;

          case "Scape":
          case "Crater":
            noise +=
              map(
                sq(octave + Noise.Elevation),
                0,
                sq(1 + Noise.Elevation),
                0,
                1
              ) * amplitude;
            break;
        }
        xfreq *= detailScale;
        yfreq *= detailScale;
        sumAmp += amplitude;
        amplitude *= detail;
        xOffset *= 0.19; // Random number for offsetting noise per octave
        yOffset *= 0.27; // Random number for offsetting noise per octave
      }

      noise = noise / sumAmp;

      if (Ease.Type == "None") {
        falloff = 1;
      } else {
        updateEase(x, y);
      }

      switch (Noise.Type) {
        case "Wave":
        case "Crater":
          planeArray[x][y] = noise * Noise.Amplitude * falloff;
          break;

        case "Hill":
        //planeArray[x][y] = -map(noise, 0, 1, -0.5, 0.5) * Noise.Amplitude * falloff; // If mapping noise to the center
        //break;

        case "Scape":
          planeArray[x][y] = -noise * Noise.Amplitude * falloff;
          break;
      }
    }
  }

  yStepFlow -= sin(radians(Flow.Angle)) * Flow.Force;
  xStepFlow += cos(radians(Flow.Angle)) * Flow.Force;

  fillFunction();
  strokeFunction();
  g.pop();
  frame++;
  image(g, 0, 0);
  captureState();
  posterGraphics();
  //noLoop();
}

function updatePlane() {
  cols = floor(Plane.Width / Plane.xCell);
  rows = floor(Plane.Height / Plane.yCell);
  planeArray.length = cols;
  colorArray.length = cols;
  randomArray.length = cols;
  for (let x = 0; x < cols; x++) {
    planeArray[x] = [];
    colorArray[x] = [];
    randomArray[x] = [];
    planeArray[x].length = rows;
    colorArray[x].length = rows;
    randomArray[x].length = rows;
    for (let y = 0; y < rows; y++) {
      planeArray[x][y] = 0;
      colorArray[x][y] = simplex2(x * 1.7 * 0.21, y * 3.2 * 0.11);
      randomArray[x][y] = simplex2((x + 333) * 0.41, (y + 111) * 0.77);
    }
  }
}

function updateEase(x, y) {
  let count, total, num;
  if (Ease.Type == "Round") {
    count = dist(x, y, cols / 2, rows / 2);
    total = dist(0, 0, cols / 2, rows / 2);

    switch (Ease.roundMode) {
      case "Center":
        num = map2(count, total, 0, Ease.Relief, 1, "Quadratic", BOTH);
        break;

      case "Edges":
        num = map2(count, total, 0, 1, Ease.Relief, "Quadratic", BOTH);
        break;

      case "Crater":
        if (count < total / 2) {
          num = map2(count, 0, total / 2, Ease.Relief, 1, "Quadratic", IN);
        } else {
          num = map2(count, total / 2, total, 1, Ease.Relief, "Quadratic", OUT);
        }
        break;
    }
  } else {
    if (Ease.Type == "Horizontal") {
      count = x;
      total = cols;
    } else if (Ease.Type == "Vertical") {
      count = y;
      total = rows;
    }
    switch (Ease.rowMode) {
      case "In":
        num = map2(count, 0, total, 1, Ease.Relief, "Quadratic", BOTH);
        break;

      case "Out":
        num = map2(count, 0, total, Ease.Relief, 1, "Quadratic", BOTH);
        break;

      case "Center":
        if (count < total / 2) {
          num = map2(count, 0, total / 2, 1, Ease.Relief, "Quadratic", BOTH);
        } else {
          num = map2(
            count,
            total / 2,
            total,
            Ease.Relief,
            1,
            "Quadratic",
            BOTH
          );
        }
        break;

      case "Edges":
        if (count < total / 2) {
          num = map2(count, 0, total / 2, Ease.Relief, 1, "Quadratic", BOTH);
        } else {
          num = map2(
            count,
            total / 2,
            total,
            1,
            Ease.Relief,
            "Quadratic",
            BOTH
          );
        }
        break;
    }
  }
  return (falloff = pow(num, Ease.Width));
}

function canvasResize() {
  Main.canvasWidth = min(Main.canvasWidth, Main.maxWidth);
  Main.canvasHeight = min(Main.canvasHeight, Main.maxHeight);
  resizeCanvas(Main.canvasWidth, Main.canvasHeight);
  updateGraphics();
  exportChange();
}

function windowResized() {
  if (!captureBool) {
    let width = min(window.innerWidth, Main.maxWidth);
    let height = min(window.windowHeight, Main.maxHeight);
    if (Main.canvasWidth > width) Main.canvasWidth = width;
    if (Main.canvasHeight > height) Main.canvasHeight = height;
    //canvasWidth.max(width); // Should to recreate controller with new max?
    //canvasHeight.max(height); // Should to recreate controller with new max?
  }
}

function updateGraphics() {
  if (g != undefined) {
    g.remove();
  }
  g = createGraphics(Main.canvasWidth, Main.canvasHeight, WEBGL);
  g.setAttributes({
    preserveDrawingBuffer: true,
    premultipliedAlpha: true,
    alpha: true,
    antialias: true,
  });
  cam = g.createCamera();
  cam._orbit(Camera.xValue, Camera.yValue, Camera.Zoom);
}

function updateFunctions() {
  updatePlane();
  bgChange();
  noiseTypeChange();
  //noiseDetailChange();
  noiseMotionChange();
  easeTypeChange();
  flowMotionChange();
  fillTypeChange();
  strokeTypeChange();
  cameraTypeChange();
  cameraFOVChange();
  axisChange();
  tiltMotionChange();
  motionStates();
}
