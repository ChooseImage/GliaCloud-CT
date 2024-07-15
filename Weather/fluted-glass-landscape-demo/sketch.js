const apiUrl =
  "https://data3p-al23s7k26q-de.a.run.app/weather/current?area=taipei";
let dataLoaded = false;
let cloudIcon;
let currentWeather;
let fadeLength = 100;
let f = 0;
let currentTemp;
let tempGraphic, clockGraphic;
let condition;
let tempGraphic1, tempGraphic2, tempGraphic3;
let percepsGraphic1, percepsGraphic2, percepsGraphic3;

const _Range = 11;

let textGraphic;
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
const [_Width, _Height] = [860, 480];

const pane = new Tweakpane.Pane();
const PARAMS = {
  movement: false,
  bg: "#FFF5F5",
  //bg: "#000000",
  theme: "",
  toggleBlur: false,
  toggleTempBlur: false,
  togglePercepBlur: false,
  pos1X: 271,
  pos1Y: 240,
  pos2X: 373,
  pos2Y: 161,
  pos3X: 614,
  pos3Y: 365,
  tempBlur: 0,
  ringBlur1: 0,
  ringBlur2: 3.7,
  ringBlur3: 1.74,
  glassFilter: false,
  bands: 86,
  distortion: 4.42,
  angleStep: 0.25,
  lineThickness: 0.87,
  gap: 0.16,
  circleSize: 2.74,
  tempRingSize1: 3,
  tempRingSize2: 3.6,
  tempRingSize3: 6,
  tempRingInnerSize: 100,
  tempRingPow: 1.14,
  percepGap: 0.1,
  percepsAngleStep: 0.07,
  ringGap: 16,
};
var cloud;
let forecast = [21, 25, 0.7]; // time, temp, humidity;
const sunlighColor = ["#1B0034", "e0c31d"]; // sunny, cloudy
let tempColor;
let temp = [
  27, 27, 26, 26, 26, 26, 26, 28, 30, 32, 33, 34, 35, 35, 36, 35, 34, 33, 32,
  30, 29, 29, 28, 28,
];
temp = temp.splice(12, 23);

let perceps = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.01, 0.01, 0.03, 0.07, 0.07, 0.11, 0.44, 0.44,
  0.51, 0, 0, 0, 1, 0,
];
console.log(perceps.length);
perceps = perceps.splice(12, 23);

const weatherData = [];
let ys = [];
let amount = 30;
let fontMono, fontSerif, abcOracleLight, abcOracleGreek;
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
  setupDebugPanel();

  // Temperature gradient colors
  coldColor = color("#BCD9D7"); // blueish teal
  hotColor = color("#ff5050"); // red-orange
  coldColor1 = color("#C2E0F8");
  hotColor1 = color("#FF817A");
  //coldColor = color(188, 217, 215, 0);

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

  for (let i = 0; i < amount; i++) {
    const y = (height / amount) * i;
    ys.push(y);
  }

  tempGraphic = createGraphics(width, height);
  tempGraphic1 = createGraphics(width, height);
  tempGraphic2 = createGraphics(width, height);
  tempGraphic3 = createGraphics(width, height);
  percepsGraphic = createGraphics(width, height);
  percepsGraphic1 = createGraphics(width, height);
  percepsGraphic2 = createGraphics(width, height);
  percepsGraphic3 = createGraphics(width, height);
  clockGraphic = createGraphics(width, height);
  setGradation();
  ellipse(100, 100, 100, 100);
}

function draw() {
  clear();
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

  let xMovement1 = PARAMS.movement ? (noise(xOffset1) - 0.5) * width : 0;
  let yMovement1 = PARAMS.movement ? (noise(yOffset1) - 0.5) * height : 0;

  let xMovement2 = PARAMS.movement ? (noise(xOffset2) - 0.5) * width : 0;
  let yMovement2 = PARAMS.movement ? (noise(yOffset2) - 0.5) * height : 0;

  let xMovement3 = PARAMS.movement ? (noise(xOffset3) - 0.5) * width : 0;
  let yMovement3 = PARAMS.movement ? (noise(yOffset3) - 0.5) * height : 0;

  // First climate ring
  push();
  drawClimateRing(
    PARAMS.pos1X + xMovement1,
    PARAMS.pos1Y + yMovement1,
    240,
    tempGraphic1,
    percepsGraphic1,
    PARAMS.ringBlur1,
    PARAMS.tempRingSize1,
    hotColor,
    coldColor
  );
  pop();

  if (PARAMS.glassFilter) {
    filter(glassShader);
  }
  setGradation();
  ellipse(100, 100, 100, 100);
  // drawText(textGraphic);
  //image(cloudIcon, 500, 270, 90, 56);
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
  tempGraphic,
  percepsGraphic,
  graphicBlur = 0,
  tempRingSize,
  colorHot,
  colorCold
) {
  let outerRadius = radius;
  let innerRadiusTemp = radius - PARAMS.tempRingInnerSize; // Adjusted to remove gap
  drawGradientRing(
    cx,
    cy,
    outerRadius,
    innerRadiusTemp,
    -PI / 2,
    1.5 * PI - 0.01,
    colorHot,
    colorCold,
    tempGraphic,
    graphicBlur,
    tempRingSize
  );

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

  drawClock();
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

  const maxTemp = Math.max(...temp);
  const minTemp = Math.min(...temp);
  const R = size * Math.pow(maxTemp, PARAMS.tempRingPow);
  let totalLength = R - innerRadius;

  for (let angle = startAngle; angle <= endAngle; angle += adjustedAngleStep) {
    tempGraphic.strokeWeight(lineThickness);
    let angleToTime = map(angle, startAngle, endAngle, 0, _Range);

    let tempItem = temp[Math.round(angleToTime)];
    //let tempIndex = map(tempItem, 20, 40, 0, 1);
    //let col = lerpColor(startColor, endColor, tempIndex);
    //tempGraphic.stroke(col);

    let startX = cx + cos(angle) * innerRadius;
    let startY = cy + sin(angle) * innerRadius;

    const interval = PI / 6;
    const tolerance = interval * 0.05;
    if (
      Math.abs((angle % interval) - interval) > tolerance ||
      Math.abs(angle % interval) > tolerance
    ) {
      //totalLength *= 0.8;
    }

    let endX = startX + cos(angle) * totalLength;
    let endY = startY + sin(angle) * totalLength;

    let tempX = map(tempItem, minTemp, maxTemp, startX, endX);
    let tempY = map(tempItem, minTemp, maxTemp, startY, endY);
    let currentLength = dist(tempX, tempY, startX, startY);

    drawUnit(
      tempGraphic,
      tempX,
      tempY,
      startX,
      startY,
      startColor,
      endColor,
      totalLength,
      currentLength,
      angle,
      tempItem,
      endX,
      endY
    );
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

  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += adjustedAngleStep + radians(gap)
  ) {
    percepsGraphic.strokeWeight(lineThickness);
    let angleToTime = map(angle, startAngle, endAngle, 0, _Range);

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
  }
  if (PARAMS.toggleBlur) {
    percepsGraphic.filter(BLUR, graphicBlur); // Apply blur effect
  }
  // Draw the blurred ring onto the main canvas
  image(percepsGraphic, 0, 0);
}

function drawClock(x, y) {
  push();
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
  strokeWeight(50);
  //setGradation();
  ellipse(x, y, 400, 400);
  shadow();

  angleMode(RADIANS);
  translate(700, 200);
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute(), 0, 60, 0, TWO_PI) - HALF_PI;
  let h =
    map(hour() % 12, 0, 11, 0, TWO_PI) -
    HALF_PI +
    map(minute(), 0, 60, 0, TWO_PI) / 12;
  let hFrom = map(hour() % 12, 0, 11, 0, TWO_PI) - HALF_PI;
  let hTo = map((hour() + 1) % 12, 0, 11, 0, TWO_PI) - HALF_PI;

  strokeWeight(2);
  stroke(255);
  noFill();
  ellipse(0, 0, 100, 100);
  stroke(255, 0, 0);
  line(0, 0, cos(s) * 50, sin(s) * 50);
  stroke(0, 255, 0);
  line(0, 0, cos(m) * 40, sin(m) * 40);
  stroke(0, 0, 255);
  line(0, 0, cos(h) * 30, sin(h) * 30);
  pop();
}

function drawUnit(
  graphic,
  tempX,
  tempY,
  startX,
  startY,
  color1,
  color2,
  totalLength,
  currentLength,
  angle,
  tempItem,
  endX,
  endY
) {
  const step = 5;
  //text(currentLength.toString(), x1, y1);
  //beginShape();
  graphic.strokeWeight(0.5);
  graphic.stroke(color1);

  gradientLine(
    graphic,
    startX,
    startY,
    endX,
    endY,
    color2,
    color1,
    totalLength,
    currentLength
  );
  // graphic.line(
  //   startX,
  //   startY,
  //   startX + cos(angle) * totalLength,
  //   startY + sin(angle) * totalLength
  // );
  const fillColor = lerpColor(color2, color1, currentLength / totalLength);
  graphic.fill(fillColor);
  graphic.circle(tempX, tempY, 5);
  const textOffset = 30;
  graphic.noStroke();
  graphic.textAlign(CENTER, CENTER);
  graphic.fill(color1);
  graphic.textFont(abcOracleGreek);
  graphic.textSize(8);
  // Define the interval (e.g., PI / 6 for every 30 degrees)
  const interval = PI / 6;
  const tolerance = interval * 0.05;

  // Check if the angle is close to a multiple of the interval within the full circle
  if (
    Math.abs((angle % interval) - interval) < tolerance ||
    Math.abs(angle % interval) < tolerance
  ) {
    graphic.text(
      tempItem.toString(),
      endX + cos(angle) * textOffset,
      endY + sin(angle) * textOffset
    );
  }
  graphic.noStroke();
  for (let stop = 0; stop < currentLength; stop += step) {
    let posX = lerp(tempX, startX, stop / currentLength);
    let posY = lerp(tempY, startY, stop / currentLength);
    //circle(posX, posY, 3);
  }
  // endShape();
  /*
    beginShape();
    for (x = offset; x < width - offset; x +=xStep) {
      a = noise(x_offset + x / width, y, noise(t)) * a_amp;
      b = noise(x_offset + x / width + y - t) * b_amp;
      let vx = x + sin(a | b) * (cos(a) - sin(x | y)) * 0;
      let vy = (constrain(tan(a % b), -1, 1) * yStep) / 4;
      let vn = map(vy - y, -yStep / 3, yStep / 3, 0, 1);
      let i = map(sin(vy / 5 + frameCount / 10 + vx / 50 + vn),-1,1,0,1)*colors.length/3;
      let n = int(i);
      let m = (n+1)%colors.length;
      let f = i%1;
      let c = lerpColor(colors[n],colors[m],f);
      strokeWeight(xStep);
      stroke(c);
      line(vx, y + vy, vx, y - vy);
    }
    endShape();
  */
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
  gradient.addColorStop(0, color1.toString());
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
  textGraphic.text(condition, 300, 690);
  textGraphic.pop();

  image(textGraphic, 0, 0);
};

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
    max: 100,
    step: 1,
  });
  shaders.addInput(PARAMS, "distortion", {
    min: 0,
    max: 10,
  });
  temperature.addInput(PARAMS, "angleStep", {
    min: 0.00001,
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

class Easing {
  static easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x) {
    return x * x * x * x;
  }

  static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x) {
    return x * x * x * x * x;
  }

  static easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  }

  static easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
  static easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }

  static easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  static easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }

  static easeInBounce(x) {
    return 1 - Easing.easeOutBounce(1 - x);
  }

  static easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

  static easeInOutBounce(x) {
    return x < 0.5
      ? (1 - Easing.easeOutBounce(1 - 2 * x)) / 2
      : (1 + Easing.easeOutBounce(2 * x - 1)) / 2;
  }
}

// ref https://github.com/Creativeguru97/YouTube_tutorial/blob/master/p5_hacks/Gradient_effect/conical_gradient/sketch.js
function conicGradient(sA, sX, sY, colors) {
  let gradient = drawingContext.createConicGradient(sA, sX, sY);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.25, colors[1]);
  gradient.addColorStop(0.5, colors[2]);
  gradient.addColorStop(0.75, colors[3]);
  gradient.addColorStop(1, colors[0]);

  drawingContext.strokeStyle = gradient;
}

function shadow() {
  drawingContext.shadowOffsetX = 10;
  drawingContext.shadowOffsetY = 10;
  drawingContext.shadowBlur = 16;
  drawingContext.shadowColor = color(230, 30, 18, 100);
}

const temp1 = [
  27, 27, 26, 26, 26, 26, 26, 28, 30, 32, 33, 34, 35, 35, 36, 35, 34, 33, 32,
  30, 29, 29, 28, 28,
];

const precipitation1 = [
  0.01, 0.01, 0.03, 0.07, 0.07, 0.11, 0.44, 0.44, 0.51, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];

//function draw() {

//}

function setGradation() {
  const ctx = drawingContext;

  // Start angle for the gradient
  let startAngle = 0;

  try {
    const browserbrands = navigator.userAgentData.brands;
    if (
      browserbrands.find(
        (elm) => elm.brand.includes("Firefox") || elm.brand.includes("Safari")
      )
    ) {
      startAngle = HALF_PI;
    }
  } catch (e) {
    startAngle = HALF_PI;
  }

  // Create a conic gradient
  const gradient = ctx.createConicGradient(startAngle, width / 2, height / 2);
  gradient.addColorStop(0, "red");
  gradient.addColorStop(0.25, "orange");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(0.75, "green");
  gradient.addColorStop(1, "blue");

  // Set the fill style to the gradient
  ctx.fillStyle = gradient;

  // Fill the canvas with the gradient
  ctx.fillRect(0, 0, width, height);
}
