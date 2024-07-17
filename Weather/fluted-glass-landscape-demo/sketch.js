const apiUrl =
  "https://data3p-al23s7k26q-de.a.run.app/weather/current?area=taipei";
let dataLoaded = false;
let cloudIcon;
let currentWeather;
let fadeLength = 100;
let f = 0;
let currentTemp;
let tempGraphic;
let condition;
let tempGraphic1, tempGraphic2, tempGraphic3;
let percepsGraphic1, percepsGraphic2, percepsGraphic3;
let introText =
  "18ºc ~ 29ºc with gusty winds throughout the day, partly cloudy skies turning overcast by evening. Expect a high UV index.";
let percepText = "With a 23% chance of rain.";
let currentCharacter = 0;

let textGraphic, shadowGraphic;
let xOffset = 0;
let yOffset = 10000;
// glass
let font;
let glassShader;
let txt = "sliced glass";
let motion = 1;
let txtColor = "#000000";
let bands = 45;
let distortion = 1.5;

let maxX, maxY, minX, minY, rainX, rainY;

let hotColor, coldColor, hotColor1, coldColor1;

function requestJsonData() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
      dataLoaded = true;
    });
}

function capitalizeFirstLetterOfEachLine(text) {
  return text
    .split("\n")
    .map((line) => line.charAt(0).toUpperCase() + line.slice(1))
    .join("\n");
}

function loadData(data) {
  currentWeather = data;
  console.log("currentWeather", currentWeather);
  currentTemp = round(
    getAverage([
      currentWeather.high_temperature,
      currentWeather.low_temperature,
    ]),
    1
  );
  currentTemp = Math.round(
    (currentWeather.high_temperature + currentWeather.low_temperature) / 2
  );
  condition = currentWeather.description.replace(/ /g, "\n");
  condition = capitalizeFirstLetterOfEachLine(condition);
  console.log("currentTemp", currentTemp);
  print(data);
}

let mappedTemps, mappedPerceps, mappedWind, mappedHumidity;

const pane = new Tweakpane.Pane();
const PARAMS = {
  movement: false,
  movementAmp: 1,
  bg: "#FFF5F5",
  theme: "",
  toggleBlur: true,
  toggleTempBlur: true,
  togglePercepBlur: true,
  pos1X: 607,
  pos1Y: 269,
  pos2X: 589,
  pos2Y: 250,
  pos3X: 614,
  pos3Y: 365,
  tempBlur: 0,
  ringBlur1: 0,
  ringBlur2: 0,
  ringBlur3: 1.74,
  glassFilter: true,
  bands: 255,
  distortion: 17.39,
  angleStep: 0.03,
  lineThickness: 0.87,
  gap: 0.16,
  circleSize: 2.74,
  tempRingSize1: 5,
  tempRingSize2: 5.3,
  tempRingSize3: 6,
  tempRingInnerSize: 60.87,
  tempRingPow: 1.12,
  percepGap: 0.1,
  percepsAngleStep: 0.07,
  ringGap: 4,
  window1X: 0.58,
  window1Y: 0.15,
  window1W: 0.12,
  window1H: 0.2,
};
var cloud;
let forecast = [21, 25, 0.7]; // time, temp, humidity;
const sunlighColor = ["#1B0034", "e0c31d"]; // sunny, cloudy
let tempColor;
const temp = [
  23, 23, 22, 22.6, 22, 22, 23, 23, 23, 24, 25, 26, 26, 26, 26, 26, 26, 26, 25,
  24, 23.08, 23, 23.1, 23,
];

const humidityColor = ["#DCA100", "#1000C6"]; // dry, humid
const humidity = [
  0.59, 0.87, 0.02, 0.18, 0.65, 0.72, 0.91, 0.99, 0.86, 0.03, 0.44, 0.81, 0.19,
  0.39, 0.72, 0.42, 0.24, 0.13, 0.56, 0.73, 0.64, 0.18, 0.6, 0.46,
];

const perceps = [
  0.15, 0.14, 0.12, 0.29, 0.14, 0.12, 0.17, 0.18, 0.26, 0.15, 0.51, 1,
];

const weatherData = [];
let ys = [];
let amount = 30;
let noiseGra;
const [_Width, _Height] = [860, 480];
let fontMono,
  fontSerif,
  abcOracleLight,
  abcOracleGreek,
  abcSyntSlant,
  spectralElLt;
let date = new Date();
let formattedTime =
  date.getHours() +
  ":" +
  (date.getMinutes() < 10 ? "0" : "") +
  date.getMinutes();
function preload() {
  fontMono = loadFont("assets/fonts/NeueMet.ttf");
  fontSerif = loadFont("assets/fonts/Harmond SemiBold Condensed.ttf");
  abcOracleLight = loadFont("assets/fonts/ABCOracle-Light-Trial.ttf");
  abcOracleGreek = loadFont("assets/fonts/ABCOracleGreek-Md-Trial.ttf");
  abcSyntSlant = loadFont("assets/fonts/ABCSynt-BookSlant-Trial.ttf");
  spectralElLt = loadFont("assets/fonts/Spectral-ExtraLightItalic.ttf");
  font = loadFont(
    "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf"
  );

  cloudIcon = loadImage("./assets/imgs/cloudicon.png");
  requestJsonData();
}

async function setup() {
  textFont(abcOracleGreek);
  blendMode(SCREEN);
  mappedTemps = mapData(temp, 40);
  mappedPerceps = mapData(perceps, 40);

  textGraphic = createGraphics(_Width, _Height);
  shadowGraphic = createGraphics(_Width, _Height);
  setupDebugPanel();

  // Temperature gradient colors
  coldColor = color("#BCD9D7"); // blueish teal
  hotColor = color("#FBAD6F"); // red-orange
  coldColor1 = color("#C2E0F8");
  hotColor1 = color("#FF817A");

  createCanvas(_Width, _Height);

  glassShader = createFilterShader(`
  precision highp float;
  
  varying vec2 vTexCoord;
  uniform sampler2D tex0;
  
  uniform float bands;
  uniform float distortion;

  uniform vec2 maskPosition;
  uniform vec2 maskSize;
  
  void main() {
    vec2 coord = vTexCoord;
    bool insideMask = 
    coord.x >= maskPosition.x && 
    coord.x <= maskPosition.x + maskSize.x &&
    coord.y >= maskPosition.y && 
    coord.y <= maskPosition.y + maskSize.y;
  
  if (!insideMask) {
    // Apply the distortion effect only outside the mask
    float cellCenter = (floor(coord.x * bands) + 0.5) / bands;
    coord.x = (coord.x - cellCenter) * distortion + cellCenter;
  }
  
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
  tempGraphic1 = createGraphics(width, height);
  tempGraphic2 = createGraphics(width, height);
  tempGraphic3 = createGraphics(width, height);
  percepsGraphic = createGraphics(width, height);
  percepsGraphic1 = createGraphics(width, height);
  percepsGraphic2 = createGraphics(width, height);
  percepsGraphic3 = createGraphics(width, height);
}

function draw() {
  clear();
  image(noiseGra, 0, 0);
  background(PARAMS.bg);

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

  noStroke();
  fill(txtColor);
  textAlign(CENTER, CENTER);
  fill(color("#7E3328"));
  glassShader.setUniform("bands", PARAMS.bands);
  glassShader.setUniform("distortion", PARAMS.distortion);
  glassShader.setUniform("maskPosition", [PARAMS.window1X, PARAMS.window1Y]); // Example: mask starts at 25% from top-left
  glassShader.setUniform("maskSize", [PARAMS.window1W, PARAMS.window1H]); // Example: mask covers 50% of width and height
  push();
  if (PARAMS.movement) {
    xOffset += 0.0005 * motion;
    yOffset += 0.0005 * motion;
  }

  let xOffset1 = xOffset;
  let yOffset1 = yOffset;
  let xOffset2 = xOffset + 1000; // Add a large number to get different noise values
  let yOffset2 = yOffset + 1000;
  let xOffset3 = xOffset + 2000;
  let yOffset3 = yOffset + 2000;

  let xMovement1 = PARAMS.movement
    ? (noise(xOffset1) - 0.5) * width * PARAMS.movementAmp
    : 0;
  let yMovement1 = PARAMS.movement
    ? (noise(yOffset1) - 0.5) * height * PARAMS.movementAmp
    : 0;

  let xMovement2 = PARAMS.movement
    ? (noise(xOffset2) - 0.5) * width * PARAMS.movementAmp
    : 0;
  let yMovement2 = PARAMS.movement
    ? (noise(yOffset2) - 0.5) * height * PARAMS.movementAmp
    : 0;

  let xMovement3 = PARAMS.movement
    ? (noise(xOffset3) - 0.5) * width * PARAMS.movementAmp
    : 0;
  let yMovement3 = PARAMS.movement
    ? (noise(yOffset3) - 0.5) * height * PARAMS.movementAmp
    : 0;

  // First climate ring
  // push();
  // drawClimateRing(
  //   PARAMS.pos1X + xMovement1,
  //   PARAMS.pos1Y + yMovement1,
  //   240,
  //   28,
  //   70,
  //   tempGraphic1,
  //   percepsGraphic1,
  //   PARAMS.ringBlur1,
  //   PARAMS.tempRingSize1,
  //   hotColor,
  //   coldColor
  // );
  // pop();

  // Second climate ring
  push();
  drawClimateRing(
    PARAMS.pos2X + xMovement2 * 0.8,
    PARAMS.pos2Y + yMovement2 * 0.8,
    200,
    28,
    70,
    tempGraphic2,
    percepsGraphic2,
    PARAMS.ringBlur2,
    PARAMS.tempRingSize2,
    hotColor1,
    coldColor1
  );
  pop();

  // Third climate ring
  // push();
  // drawClimateRing(
  //   PARAMS.pos3X + xMovement3 * 1.2,
  //   PARAMS.pos3Y + yMovement3 * 1.2,
  //   240,
  //   28,
  //   70,
  //   tempGraphic3,
  //   percepsGraphic3,
  //   PARAMS.ringBlur3,
  //   PARAMS.tempRingSize3,
  //   hotColor1,
  //   coldColor1
  // );
  // pop();

  if (PARAMS.glassFilter) {
    filter(glassShader);
  }

  drawText(textGraphic);
  drawShadow();
  //typeWriter(introText);
  //image(cloudIcon, 500, 270, 90, 56);
}
function drawSun(x, y, size) {
  push();
  translate(x, y);
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
    ys[i] += 0.3;
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
  let maxData = Math.max(...data);
  let minData = Math.min(...data);
  let mappedData = data.map((dataI) => {
    return map(dataI, minData, maxData, 0, max);
  });
  return mappedData;
}

function drawClimateRing(
  cx,
  cy,
  radius,
  temperature,
  precipitation,
  tempGraphic,
  percepsGraphic,
  graphicBlur = 0,
  tempRingSize,
  colorHot,
  colorCold
) {
  let outerRadius = radius;
  let innerRadiusTemp = radius - PARAMS.tempRingInnerSize; // Adjusted to remove gap

  // Draw temperature ring
  drawGradientRing(
    cx,
    cy,
    outerRadius,
    innerRadiusTemp,
    -PI / 2,
    1.5 * PI,
    colorHot,
    colorCold,
    tempGraphic,
    graphicBlur,
    tempRingSize
  );

  // Draw precipitation ring
  drawAlphaRing(
    cx,
    cy,
    outerRadius,
    innerRadiusTemp,
    -PI / 2,
    1.5 * PI,
    hotColor,
    coldColor,
    percepsGraphic,
    graphicBlur,
    tempRingSize
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
  endColor,
  tempGraphic,
  blur,
  size
) {
  // Create a graphics buffer for the ring
  tempGraphic.clear();
  tempGraphic.angleMode(RADIANS);

  let totalAngle = endAngle - startAngle;
  let numberOfSteps = Math.floor(
    totalAngle / (PARAMS.angleStep + radians(PARAMS.gap))
  );
  let adjustedAngleStep = totalAngle / numberOfSteps;

  let lineThickness = PARAMS.lineThickness; // Thickness of each line segment
  let gap = PARAMS.gap; // Gap between each line segment

  let totalLength = dist(
    cx + cos(startAngle) * outerRadius,
    cy + sin(startAngle) * outerRadius,
    cx + cos(startAngle) * innerRadius,
    cy + sin(startAngle) * innerRadius
  );

  // Locates the maximum and minimum temperature values for annotation
  let maxTemp = Math.max(...temp);
  let minTemp = Math.min(...temp);
  let maxTempFound = false;
  let minTempFound = false;

  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += adjustedAngleStep + radians(gap)
  ) {
    tempGraphic.strokeWeight(lineThickness);
    let angleToTime = map(angle, startAngle, endAngle, 0, 11);

    let tempItem = temp[Math.round(angleToTime)];
    //let tempIndex = map(tempItem, 20, 40, 0, 1);
    //let col = lerpColor(startColor, endColor, tempIndex);
    //tempGraphic.stroke(col);

    let x1 = cx + cos(angle) * size * pow(tempItem, PARAMS.tempRingPow);
    let y1 = cy + sin(angle) * size * pow(tempItem, PARAMS.tempRingPow);
    let x2 = cx + cos(angle) * innerRadius;
    let y2 = cy + sin(angle) * innerRadius;

    //tempGraphic.line(x1, y1, x2, y2);
    let currentLength = dist(x1, y1, x2, y2);

    gradientLine(
      tempGraphic,
      x1,
      y1,
      x2,
      y2,
      startColor,
      endColor,
      totalLength,
      currentLength
    );

    if (tempItem === maxTemp && !maxTempFound) {
      maxX = x1;
      maxY = y1;
      maxTempFound = true;
    } else if (tempItem === minTemp && !minTempFound) {
      minX = x1;
      minY = y1;
      minTempFound = true;
    }
  }

  if (PARAMS.toggleBlur) {
    tempGraphic.filter(BLUR, blur); // Apply blur effect
  }

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
  endColor,
  percepsGraphic,
  graphicBlur,
  size
) {
  // Create a graphics buffer for the ring
  percepsGraphic.clear();
  percepsGraphic.angleMode(RADIANS);
  const radius = innerRadius - PARAMS.ringGap;

  let totalAngle = endAngle - startAngle;
  let numberOfSteps = Math.floor(
    totalAngle / (PARAMS.percepsAngleStep + radians(PARAMS.percepGap))
  );
  let adjustedAngleStep = totalAngle / numberOfSteps;

  let lineThickness = PARAMS.lineThickness; // Thickness of each line segment
  let gap = PARAMS.percepGap; // Gap between each line segment

  let maxPrecip = Math.round(Math.max(...perceps));
  let maxPrecipFound = false;

  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += adjustedAngleStep + radians(gap)
  ) {
    percepsGraphic.strokeWeight(lineThickness);
    let angleToTime = map(angle, startAngle, endAngle, 0, 11);

    let percepItem = perceps[Math.round(angleToTime)];
    let amount = Math.round(map(percepItem, 0, 1, 0, 10));
    for (let i = 0; i < amount; i++) {
      let posX = cx + cos(angle) * (radius - i * 5);
      let posY = cy + sin(angle) * (radius - i * 5);
      const percepColor = color("#0057FF");
      percepColor.setAlpha(55 + i * 20);
      percepsGraphic.fill(percepColor);
      percepsGraphic.noStroke();
      percepsGraphic.circle(posX, posY, PARAMS.circleSize);
    }

    if (percepItem === maxPrecip && !maxPrecipFound) {
      rainX = cx + cos(angle) * (radius - amount * 5);
      rainY = cy + sin(angle) * (radius - amount * 5);
      maxPrecipFound = true;
    }
  }
  if (PARAMS.toggleBlur) {
    percepsGraphic.filter(BLUR, graphicBlur); // Apply blur effect
  }
  // Draw the blurred ring onto the main canvas
  image(percepsGraphic, 0, 0);
}

function gradientLine(
  graphic,
  x1,
  y1,
  x2,
  y2,
  color1,
  color2,
  totalLength,
  currentLength
) {
  const ctx = graphic.drawingContext;
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  const white = "#ffffff";
  // Calculate the proportion of the current line length to the total length
  const proportion = currentLength / totalLength;

  //const endColor = lerpColor(color1, color2, proportion);
  let targetColor = lerpColor(color(color2), color(color1), proportion);
  gradient.addColorStop(0, targetColor.toString());
  gradient.addColorStop(1, color2.toString());

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

const drawText = (textGraphic) => {
  if (!dataLoaded) {
    // Draw loading message or return early
    textGraphic.text("Loading...", 700, 430);
    return;
  }
  textGraphic.clear();
  textGraphic.resetMatrix();
  textGraphic.push();
  textGraphic.textAlign(LEFT);
  textGraphic.textSize(32);
  textGraphic.fill("#ff5050");
  textGraphic.textFont(abcOracleGreek);
  textGraphic.text("Taipei", 700, 370);
  textGraphic.textFont(abcOracleLight);
  textGraphic.textSize(60);
  textGraphic.text(`${currentTemp}º`, 700, 430);
  textGraphic.textSize(28);
  textGraphic.textFont(abcOracleGreek);
  textGraphic.text(
    `High: ${Math.round(currentWeather.high_temperature)}º`,
    60,
    690
  );
  textGraphic.text(
    `Low:  ${Math.round(currentWeather.low_temperature)}º`,
    60,
    725
  );
  textGraphic.textSize(22);
  textGraphic.noStroke();
  textGraphic.circle(maxX, maxY, 3);
  textGraphic.circle(minX, minY, 3);
  textGraphic.fill("blue");
  //console.log("rainX", rainX, "rainY", rainY);
  textGraphic.circle(rainX, rainY, 3);
  textGraphic.text(condition, 300, 690);
  textGraphic.pop();

  image(textGraphic, 0, 0);
};

function drawShadow() {
  shadowGraphic.clear();
  shadowGraphic.fill(0, 0, 0, 0);
  shadowGraphic.stroke(255, 40);
  shadowGraphic.strokeWeight(2);
  shadowGraphic.rect(
    PARAMS.window1X * _Width,
    PARAMS.window1Y * _Height,
    PARAMS.window1W * _Width,
    PARAMS.window1H * _Height
  );
  shadow(shadowGraphic);
  image(shadowGraphic, 0, 0);
}

const setupDebugPanel = () => {
  const shaders = pane.addFolder({
    title: "Effects",
    expanded: false,
  });

  const temperature = pane.addFolder({
    title: "Temperature",
    expanded: false,
  });

  const percepitation = pane.addFolder({
    title: "Precipitation",
    expanded: false,
  });

  const misc = pane.addFolder({
    title: "Position / Movement",
    expanded: false,
  });

  // data prep
  console.log("perceps", perceps);
  // Pane
  misc.addInput(PARAMS, "bg", {
    view: "color",
  });
  shaders.addInput(PARAMS, "glassFilter"),
    {
      view: "checkbox",
    };
  misc.addInput(PARAMS, "movement"),
    {
      view: "checkbox",
    };
  misc.addInput(PARAMS, "movementAmp", {
    min: 0,
    max: 1,
  });
  shaders.addInput(PARAMS, "toggleBlur", {
    view: "checkbox",
  });
  shaders.addInput(PARAMS, "ringBlur1", {
    min: 0,
    max: 20,
  });
  shaders.addInput(PARAMS, "ringBlur2", {
    min: 0,
    max: 20,
  });
  shaders.addInput(PARAMS, "ringBlur3", {
    min: 0,
    max: 20,
  });
  shaders.addInput(PARAMS, "bands", {
    min: 0,
    max: 500,
    step: 1,
  });
  shaders.addInput(PARAMS, "distortion", {
    min: 0,
    max: 100,
  });
  shaders.addInput(PARAMS, "window1X", {
    min: 0,
    max: 1,
  });
  shaders.addInput(PARAMS, "window1Y", {
    min: 0,
    max: 1,
  });
  shaders.addInput(PARAMS, "window1W", {
    min: 0,
    max: 1,
  });
  shaders.addInput(PARAMS, "window1H", {
    min: 0,
    max: 1,
  });

  temperature.addInput(PARAMS, "angleStep", {
    min: 0,
    max: 0.5,
  });
  temperature.addInput(PARAMS, "lineThickness", {
    min: 0,
    max: 20,
  });
  temperature.addInput(PARAMS, "gap", {
    min: 0,
    max: 1,
  });
  percepitation.addInput(PARAMS, "circleSize", {
    min: 0,
    max: 10,
  });
  temperature.addInput(PARAMS, "tempRingSize1", {
    min: 0,
    max: 8,
  });
  temperature.addInput(PARAMS, "tempRingSize2", {
    min: 0,
    max: 8,
  });
  temperature.addInput(PARAMS, "tempRingSize3", {
    min: 0,
    max: 8,
  });
  temperature.addInput(PARAMS, "tempRingInnerSize", {
    min: 0,
    max: 200,
  });
  temperature.addInput(PARAMS, "tempRingPow", {
    min: 0,
    max: 3,
  });
  percepitation.addInput(PARAMS, "percepGap", {
    min: 0.01,
    max: 5,
  });
  percepitation.addInput(PARAMS, "percepsAngleStep", {
    min: 0.001,
    max: 0.4,
  });
  misc.addInput(PARAMS, "ringGap", {
    min: 0,
    max: 50,
  });
  misc.addInput(PARAMS, "pos1X", {
    min: 0,
    max: _Width,
  });
  misc.addInput(PARAMS, "pos1Y", {
    min: 0,
    max: _Height,
  });
  misc.addInput(PARAMS, "pos2X", {
    min: 0,
    max: _Width,
  });
  misc.addInput(PARAMS, "pos2Y", {
    min: 0,
    max: _Height,
  });
  misc.addInput(PARAMS, "pos3X", {
    min: 0,
    max: _Width,
  });
  misc.addInput(PARAMS, "pos3Y", {
    min: 0,
    max: _Height,
  });
};

function typeWriter(string) {
  let currentString = string.substring(0, currentCharacter);
  push();
  fill(255);
  noStroke();
  pop();

  push();
  textAlign(LEFT, TOP);
  fill(30);

  textFont(spectralElLt);
  textSize(82);
  text("26ºc ~ 35ºc", 60, 40);

  //text(currentString, 10, 10, width, height);
  pop();
  currentCharacter += 5;
}

function shadow(graphic) {
  graphic.drawingContext.shadowOffsetX = 4;
  graphic.drawingContext.shadowOffsetY = 4;
  graphic.drawingContext.shadowBlur = 10;
  graphic.drawingContext.shadowColor = color(0, 27, 200, 100);
}
