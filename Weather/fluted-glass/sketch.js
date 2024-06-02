const apiUrl =
  "https://data3p-al23s7k26q-de.a.run.app/weather/current?area=taipei";

let currentWeather;
let fadeLength = 100;
let f = 0;

let tempGraphic, humiGraphic;

// glass
let font;
let glassShader;
let txt = "sliced glass";
let motion = 1;
let txtColor = "#000000";
let bands = 45;
let distortion = 1.5;

function requestJsonData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
    });
}

function loadData(data) {
  // overwrite the quote string
  currentWeather = data;
  print(data);
}

let mappedTemps, mappedPerceps, mappedWind, mappedHumidity;

const pane = new Tweakpane.Pane();
const PARAMS = {
  Time: 0,
  TempColor: "#C62B01",
  movement: false,
  bg: "#f5f5f5",
  icon: "#6F1A07",
  percepsColorAngle: 50,
  dotSize: 4,
  cloudDotX: 5,
  cloudDotY: 5,
  theme: "",
  tempBlur: 0,
  humiBlur: 0,
  glassFilter: false,
  bands: 45,
  distortion: 1.5,
  angleStep: 0.02,
  lineThickness: 0.8,
  gap: 1,
  ringGap: 80,
  circleSize: 6,
  circleThickness: 1,
  fillCircle: false,
  circleAngleStep: 0.1,
  tempRingSize: 3,
  tempRingInnerSize: 90,
};
var cloud;
let forecast = [21, 25, 0.7]; // time, temp, humidity;
const sunlighColor = ["#1B0034", "e0c31d"]; // sunny, cloudy
let tempColor;
const temp = [
  28.91, 36.65, 17.93, 22.96, 21.09, 18.84, 32.0, 26.67, 24.44, 23.13, 29.29,
  33.18, 33.11, 33.03, 30.57, 19.61, 20.32, 23.79, 36.67, 29.4, 22.08, 17.65,
  25.81, 35.12,
];

const humidityColor = ["#DCA100", "#1000C6"]; // dry, humid
const humidity = [
  0.59, 0.87, 0.02, 0.18, 0.65, 0.72, 0.91, 0.99, 0.86, 0.03, 0.44, 0.81, 0.19,
  0.39, 0.72, 0.42, 0.24, 0.13, 0.56, 0.73, 0.64, 0.18, 0.6, 0.46,
];

const perceps = [
  0.15, 0.14, 0.12, 0.29, 0.14, 0.12, 0.17, 0.18, 0.26, 0.15, 0.51, 0.78, 1.0,
  1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.58, 0.34, 0.16, 0.13, 0.15, 0.27, 0.14, 0.28,
  0.1, 0.17, 0.2, 0.26, 0.27, 0.21, 0.18, 0.43, 0.74, 1.0, 1.0, 1.0, 1.0, 1.0,
  1.0, 1.0, 0.21, 0.14, 0.25, 0.11, 0.28,
];

const weatherData = [];
let ys = [];
let amount = 30;
let noiseGra;
const [_Width, _Height] = [480, 800];
let fontMono, fontSerif;
let date = new Date();
let formattedTime =
  date.getHours() +
  ":" +
  (date.getMinutes() < 10 ? "0" : "") +
  date.getMinutes();

function preload() {
  fontMono = loadFont("assets/fonts/NeueMet.ttf");
  fontSerif = loadFont("assets/fonts/Harmond SemiBold Condensed.ttf");
  font = loadFont(
    "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf"
  );
}

function setup() {
  textFont(fontSerif);
  blendMode(SCREEN);
  requestJsonData();
  mappedTemps = mapData(temp, 40);
  mappedPerceps = mapData(perceps, 40);
  // data prep

  // Pane
  pane.addInput(PARAMS, "bg", {
    view: "color",
  });
  pane.addInput(PARAMS, "glassFilter"),
    {
      view: "checkbox",
    };
  pane.addInput(PARAMS, "movement"),
    {
      view: "checkbox",
    };
  pane.addInput(PARAMS, "Time", {
    min: 0,
    max: 23,
    step: 1,
  });
  pane.addInput(PARAMS, "TempColor", {
    view: "color",
  });
  pane.addInput(PARAMS, "icon", {
    view: "color",
  });
  pane.addInput(PARAMS, "percepsColorAngle", {
    min: 0,
    max: 360,
  });
  pane.addInput(PARAMS, "dotSize", {
    min: 0,
    max: 40,
  });
  pane.addInput(PARAMS, "cloudDotX", {
    min: 0,
    max: 10,
  });
  pane.addInput(PARAMS, "cloudDotY", {
    min: 0,
    max: 10,
  });
  pane.addInput(PARAMS, "tempBlur", {
    min: 0,
    max: 50,
  });
  pane.addInput(PARAMS, "humiBlur", {
    min: 0,
    max: 50,
  });
  pane.addInput(PARAMS, "bands", {
    min: 0,
    max: 100,
    step: 1,
  });
  pane.addInput(PARAMS, "distortion", {
    min: 0,
    max: 10,
  });
  pane.addInput(PARAMS, "angleStep", {
    min: 0,
    max: 10,
  });
  pane.addInput(PARAMS, "circleAngleStep", {
    min: 0,
    max: 0.4,
  });
  pane.addInput(PARAMS, "lineThickness", {
    min: 0,
    max: 20,
  });
  pane.addInput(PARAMS, "gap", {
    min: 0,
    max: 1,
  });
  pane.addInput(PARAMS, "ringGap", {
    min: -50,
    max: 150,
  });
  pane.addInput(PARAMS, "circleSize", {
    min: 0,
    max: 20,
  });
  pane.addInput(PARAMS, "circleThickness", {
    min: 0,
    max: 20,
  });
  pane.addInput(PARAMS, "fillCircle", {
    view: "checkbox",
  });
  pane.addInput(PARAMS, "tempRingSize", {
    min: 0,
    max: 5,
  });
  pane.addInput(PARAMS, "tempRingInnerSize", {
    min: 0,
    max: 200,
  });

  createCanvas(_Width, _Height);

  glassShader = createFilterShader(`
  precision highp float;
  
  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  
  uniform float bands;
  uniform float distortion;
  
  void main() {
    vec2 coord = vTexCoord;
    float cellCenter = (floor(coord.x * bands) + 0.5) / bands;
    coord.x = (coord.x - cellCenter) * distortion + cellCenter;
    gl_FragColor = texture2D(tex0, coord);
  }
`);
  const bgClr = color("#ffd500");
  bgClr.setAlpha(50);
  background(bgClr);
  for (let i = 0; i < amount; i++) {
    const y = (height / amount) * i;
    ys.push(y);
  }
  // Noise texture
  noiseGra = createGraphics(_Width, _Height);
  noiseGra.loadPixels();
  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      noiseGra.set(
        x,
        y,
        color(0, noise(x / 10, y / 10, (x * y) / 50) * random([0, 20]))
      );
    }
  }
  noiseGra.updatePixels();
  image(noiseGra, 0, 0);

  tempGraphic = createGraphics(width, height);
  humiGraphic = createGraphics(width, height);
}

function draw() {
  clear();
  image(noiseGra, 0, 0);
  background(PARAMS.bg);
  fill(PARAMS.TempColor);

  // --------------------------------------------

  forecast = [PARAMS.Time, temp[PARAMS.Time], humidity[PARAMS.Time]]; // time, temp, humidity

  let temperture = forecast[1].toString().slice(0, 2);
  textSize(50);
  if (currentWeather) {
    temperture = round(
      getAverage([
        currentWeather.high_temperature,
        currentWeather.low_temperature,
      ]),
      1
    );
  }

  textSize(50);
  textFont(font);
  const w = (textWidth(txt) || 20) * 1.1;
  const h = textLeading();

  // Draw Cloud
  //drawCloud(width / 4, height / 4, "circle", cloudMask2);
  scale(min((width / w) * 0.8, height / h));
  noStroke();
  fill(txtColor);
  textAlign(CENTER, CENTER);
  fill(color("#7E3328"));
  //text(Math.round(currentWeather.high_temperature), width / 2, height / 2);
  glassShader.setUniform("bands", PARAMS.bands);
  glassShader.setUniform("distortion", PARAMS.distortion);
  push();
  if (PARAMS.movement)
    translate(sin(millis() * 0.001 * motion) * width * 0.05, 0);

  drawClimateRing(width / 2 - 150 / 2, height / 2 - 150 / 2, 150, 28, 70);
  pop();
  if (PARAMS.glassFilter) {
    filter(glassShader);
  }
}

function drawSun(x, y, size) {
  push();
  translate(x, y);
  // Mask setting
  //Mask
  beginClip();
  circle(0, 0, size);
  endClip();
  for (let i = 0; i < ys.length; i++) {
    const weight = map(ys[i], 0, height, height / amount, 1);
    const alpha = map(ys[i], 0, height, 255, 200);
    const clr1 = tempColor[1];
    const clr2 = tempColor[0];
    const ratio = map(ys[i], 0, height, 0, 1);
    const mixedClr = lerpColor(clr1, clr2, ratio);
    const strokeClr = color(mixedClr);
    strokeClr.setAlpha(alpha);
    strokeWeight(weight);
    stroke(strokeClr);
    line(0 - x, ys[i] - y, width, ys[i] - y);
    if (ys[i] > height) {
      ys[i] = 0;
    }
    ys[i] += 0.3; // Speed
  }
  pop();
}

// Draw Cloud
function drawCloud(x, y, type, mask) {
  push();
  translate(x, y);
  noStroke();

  // Create a gradient mask
  let gradientMask = createGraphics(100, 100);
  gradientMask.noFill();
  for (let r = 0; r < 50; r++) {
    let alpha = map(r, 0, 50, 255, 0);
    gradientMask.stroke(255, alpha);
    gradientMask.ellipse(50, 50, r * 2, r * 2);
  }

  // Draw cloud with gradient mask
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 40; j++) {
      if (type === "circle") {
        fill(255);
        let cloudSize =
          PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001);
        ellipse(
          (i * 40) / PARAMS.cloudDotX,
          (j * 40) / PARAMS.cloudDotY,
          cloudSize,
          cloudSize
        );
        image(
          gradientMask,
          (i * 40) / PARAMS.cloudDotX - 50,
          (j * 40) / PARAMS.cloudDotY - 50
        );
      } else if (type === "rect") {
        fill(255);
        let cloudSize =
          PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001);
        rect(
          (i * 40) / PARAMS.cloudDotX,
          (j * 40) / PARAMS.cloudDotY,
          cloudSize,
          cloudSize
        );
        image(
          gradientMask,
          (i * 40) / PARAMS.cloudDotX - 50,
          (j * 40) / PARAMS.cloudDotY - 50
        );
      }
    }
  }
  pop();
}

// -------------------- UTILS -------------------------------
const getAverage = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const getWeightedAverage = (arr, weights) =>
  arr.reduce((a, b, i) => a + b * weights[i], 0) / arr.length;
const round = (num, places) => {
  Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
};
function mapData(data, max) {
  // return a new array with the temps mapped to the canvasheight
  let maxData = Math.max(...data);
  let minData = Math.min(...data);
  let mappedData = data.map((dataI) => {
    return map(dataI, minData, maxData, 0, max);
  });
  return mappedData;
}

function drawClimateRing(cx, cy, radius, temperature, precipitation) {
  let outerRadius = radius;
  let innerRadiusTemp = radius - PARAMS.tempRingInnerSize; // Adjusted to remove gap
  let innerRadiusPrecip = radius - 85;
  let outerRadiusPrecip = radius - PARAMS.ringGap; // Adjusted to remove gap

  // Temperature gradient colors
  let coldColor = color("#1A58AB"); // blueish teal
  let hotColor = color("#AB2222"); // red-orange

  // Precipitation gradient colors
  let precipitationColor = color(26, 88, 171, 0); // blueish teal with 0 alpha
  let maxPrecipitationColor = color(26, 88, 171, 255); // blueish teal with 255 alpha

  // Calculate angles based on data
  let tempAngle = map(temperature, 5, 40, 0, TWO_PI);
  let precipAngle = map(precipitation, 0, 100, 0, TWO_PI);

  // Draw temperature ring
  drawGradientRing(
    cx,
    cy,
    outerRadius,
    innerRadiusTemp,
    -PI / 2,
    tempAngle,
    coldColor,
    hotColor
  );

  // Draw precipitation ring
  drawAlphaRing(
    cx,
    cy,
    outerRadiusPrecip,
    innerRadiusPrecip,
    -PI / 2,
    precipAngle,
    precipitationColor,
    maxPrecipitationColor
  );
}

function drawGradientRing(
  cx,
  cy,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  startColor,
  endColor
) {
  // Create a graphics buffer for the ring
  tempGraphic.clear();
  tempGraphic.angleMode(RADIANS);

  let angleStep = PARAMS.angleStep; // Larger step size for performance
  let lineThickness = PARAMS.lineThickness; // Thickness of each line segment
  let gap = PARAMS.gap; // Gap between each line segment

  for (let angle = -90; angle <= 270; angle += angleStep + radians(gap)) {
    tempGraphic.strokeWeight(lineThickness);
    let angleToTime = map(angle, -90, 270, 0, 12);
    //console.log(angle);
    let tempItem = temp[Math.round(angleToTime)];
    //console.log(Math.round(angleToTime));
    //console.log(temp);
    //console.log(tempItem);
    let tempIndex = map(tempItem, 20, 40, 0, 1);
    let col = lerpColor(startColor, endColor, tempIndex);
    tempGraphic.stroke(col);
    let x1 = cx + cos(angle) * tempItem * PARAMS.tempRingSize;
    let y1 = cy + sin(angle) * tempItem * PARAMS.tempRingSize;
    let x2 = cx + cos(angle) * innerRadius;
    let y2 = cy + sin(angle) * innerRadius;

    stroke(col);
    temp;
    tempGraphic.line(x1, y1, x2, y2);
  }

  tempGraphic.filter(BLUR, PARAMS.tempBlur); // Apply blur effect
  // Draw the blurred ring onto the main canvas
  image(tempGraphic, 0, 0);
}

function drawAlphaRing(
  cx,
  cy,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle,
  startColor,
  endColor
) {
  humiGraphic.clear();
  humiGraphic.angleMode(RADIANS);
  let angleStep = PARAMS.circleAngleStep; // Larger step size for performance
  let lineThickness = PARAMS.circleThickness; // Thickness of each line segment
  let gap = PARAMS.gap; // Gap between each line segment

  for (
    let angle = startAngle;
    angle <= startAngle + endAngle;
    angle += angleStep + radians(gap)
  ) {
    let inter = map(angle, startAngle, startAngle + endAngle, 0, 1);
    let col = lerpColor(startColor, endColor, inter);
    humiGraphic.stroke(col);
    humiGraphic.strokeWeight(lineThickness);

    let x1 = cx + cos(angle) * outerRadius;
    let y1 = cy + sin(angle) * outerRadius;
    let x2 = cx + cos(angle) * innerRadius;
    let y2 = cy + sin(angle) * innerRadius;

    if (PARAMS.fillCircle) {
      humiGraphic.fill(col);
    }
    humiGraphic.circle(x1, y1, PARAMS.circleSize);
    //humiGraphic.line(x1, y1, x2, y2);
  }

  humiGraphic.filter(BLUR, PARAMS.humiBlur); // Apply blur effect

  image(humiGraphic, 0, 0);
}
