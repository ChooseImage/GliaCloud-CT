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
let hourColor, minuteColor, secondColor;

let cloudImage;

let timeLine;

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
  clockSize: 100,
  clockFade: 1,
  minute: 0,
  animate: true,
  clockSpeed: 18,
  easingStrength: 4,
  translate: { x: 200, y: 0 },
  unitScale: 1,
  alphaScale: 1,
  gradientScale: 1,
  summary: true,
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
  0.51, 0, 0, 0, 0, 0,
];
console.log(perceps.length);
perceps = perceps.splice(12, 23);

const weatherData = [];
let ys = [];
let amount = 30;
let fontMono, fontSerif, abcOracleLight, abcOracleGreek, kazimirLI;
let date = new Date();
let accentColor = "#001BC8";
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
  kazimirLI = loadFont("assets/fonts/Kazimir-Light-Italic.ttf");
  cloudImage = loadImage(
    "https://www.aopa.org/-/media/Images/AOPA-Main/News-and-Media/Publications/Flight-Training-Magazine/2010f/2010f_pf_wx/2010f_pf_wx_16x9.jpg"
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
  coldColor1 = color(242, 154, 154, 0);
  hotColor1 = color("#FF817A");
  hourColor = color(148, 126, 176, 72);
  minuteColor = color(148, 126, 176, 72);
  //hourColor = color(180, 70);
  //minuteColor = color(210);
  //coldColor = color(188, 217, 215, 0);

  PARAMS.minute = minute();
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
}

function draw() {
  clear();
  push(); // ring translation
  translate(PARAMS.translate.x, PARAMS.translate.y);
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
  if (PARAMS.movement) {
    xOffset += 0.0005 * motion;
    yOffset += 0.0005 * motion;
  }

  push(); // unit scaling
  translate(_Width / 2, _Height / 2);
  scale(PARAMS.unitScale);
  translate(-(_Width / 2), -(_Height / 2));

  drawClock(_Width / 2, _Height / 2);
  drawClimateRing(
    _Width / 2,
    _Height / 2,
    240,
    tempGraphic1,
    percepsGraphic1,
    PARAMS.ringBlur1,
    PARAMS.tempRingSize1,
    hotColor,
    coldColor
  );
  pop(); // unit scaling

  if (PARAMS.glassFilter) {
    filter(glassShader);
  }

  pop(); // ring translation
  drawText(textGraphic);

  if (PARAMS.animate) {
    animate();
  }
  if (PARAMS.summary) {
    typeWriter();
  }
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

  push();
  translate(cx, cy);
  const easeInOutProgressGradient = animateGradientScale(
    timeLine,
    PARAMS.clockSpeed
  );
  const scaleGradient = map(easeInOutProgressGradient, 0, 1, 2, 1);
  scale(scaleGradient);
  translate(-cx, -cy);
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
    tempRingSize,
    timeLine
  );
  pop();

  push();
  translate(cx, cy);
  const easeInOutProgressAlpha = animateAlphaScale(timeLine, PARAMS.clockSpeed);
  scale(easeInOutProgressAlpha);
  translate(-cx, -cy);
  // drawAlphaRing(
  //   cx,
  //   cy,
  //   outerRadius,
  //   innerRadiusTemp,
  //   -PI / 2,
  //   1.5 * PI,
  //   hotColor,
  //   coldColor,
  //   percepsGraphic,
  //   graphicBlur,
  //   tempRingSize,
  //   timeLine
  // );
  pop();
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

    const easeInOutProgress = animateGradientRing(timeLine, PARAMS.clockSpeed);
    const animatedEndAngle = map(easeInOutProgress, 0, 1, startAngle, endAngle);
    if (angle <= animatedEndAngle) {
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
  size,
  timeLine
) {
  percepsGraphic.clear();
  percepsGraphic.angleMode(RADIANS);
  const radius = innerRadius - PARAMS.ringGap;
  console.log("drawing alpha ring");
  let totalAngle = endAngle - startAngle;
  let numberOfSteps = Math.floor(
    totalAngle / (PARAMS.percepsAngleStep + radians(PARAMS.percepGap))
  );
  let adjustedAngleStep = totalAngle / numberOfSteps;

  const easeInOutProgress = animateAlphaRing(timeLine, PARAMS.clockSpeed);
  const animatedEndAngle = map(easeInOutProgress, 0, 1, startAngle, endAngle);

  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += adjustedAngleStep + radians(PARAMS.percepGap)
  ) {
    let angleToTime = map(angle, startAngle, endAngle, 0, _Range);
    let percepItem = perceps[Math.round(angleToTime)];
    let amount = Math.round(map(percepItem, 0, 1, 0, 10));

    if (angle <= animatedEndAngle) {
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
  }

  if (PARAMS.toggleBlur) {
    percepsGraphic.filter(BLUR, graphicBlur);
  }
  image(percepsGraphic, 0, 0);
}

function drawClock(x, y) {
  let m = map(PARAMS.minute, 0, 60, 0, TWO_PI) - HALF_PI;
  let h =
    map(hour(), 0, 12, 0, TWO_PI) -
    HALF_PI +
    map(PARAMS.minute, 0, 60, 0, TWO_PI) / 12;

  conicCircle(x, y, PARAMS.clockSize + 30, [minuteColor, coldColor], m);
  conicCircle(x, y, PARAMS.clockSize, [hourColor, coldColor], h);
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
  graphic.textSize(14);
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
    max: 600,
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
  misc.addInput(PARAMS, "clockSize", {
    min: 0,
    max: 4000,
  });
  misc.addInput(PARAMS, "clockFade", {
    min: 0.0001,
    max: 1,
  });
  misc.addInput(PARAMS, "minute", {
    min: 0,
    max: 60,
  });
  misc.addInput(PARAMS, "animate", {
    view: "checkbox",
  });
  misc.addInput(PARAMS, "clockSpeed", {
    min: 0,
    max: 60,
  });
  misc.addInput(PARAMS, "easingStrength", {
    min: 0,
    max: 10,
  });
  misc.addInput(PARAMS, "unitScale", {
    min: 0.001,
    max: 5,
  });
  misc.addInput(PARAMS, "alphaScale", {
    min: 0.001,
    max: 5,
  });
  misc.addInput(PARAMS, "gradientScale", {
    min: 0.001,
    max: 5,
  });
  misc.addInput(PARAMS, "translate", {
    x: { min: -_Width, max: _Width },
    y: { min: -_Height, max: _Height },
  });
  misc.addInput(PARAMS, "summary", {
    view: "checkbox",
  });
};

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

function conicCircle(x, y, r, colors, angle) {
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
      startAngle = angle;
    }
  } catch (e) {
    console.error(e);
    startAngle = angle;
  }

  // Create a conic gradient
  const gradient = ctx.createConicGradient(angle, x, y);

  function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const easedT = easeOutCirc(t);
    const color1 = lerpColor(color(colors[0]), color(148, 126, 176, 0), easedT);
    gradient.addColorStop(1 - t * PARAMS.clockFade, color1.toString());
  }

  // gradient.addColorStop(1, colors[0]);
  // gradient.addColorStop(0, color(PARAMS.bg));
  ctx.fillStyle = gradient;
  ellipse(x, y, r, r);
  blendMode(BLEND);
}

function animate() {
  timeLine = millis();
  animateClock(timeLine, PARAMS.clockSpeed);
}

function animateClock(timeLine, speed = 1) {
  const loopDuration = 60000; // 60 seconds in milliseconds
  const totalProgress = (timeLine * speed) / loopDuration;
  const currentLoop = Math.floor(totalProgress);
  const loopProgress = totalProgress - currentLoop;
  const easeInOutProgress = easeInOutQuad(loopProgress, PARAMS.easingStrength);
  PARAMS.minute = map(easeInOutProgress, 0, 1, 0, 60);
  PARAMS.clockFade = easeInOutProgress;
}

function animateAlphaRing(timeLine, speed = 1) {
  const loopDuration = 60000;
  const totalProgress = (timeLine * speed) / loopDuration;
  const currentLoop = Math.floor(totalProgress);
  const loopProgress = totalProgress - currentLoop;
  const easeInOutProgress = easeInOutQuad(loopProgress, PARAMS.easingStrength);
  return easeInOutProgress;
}

function animateGradientRing(timeLine, speed = 1) {
  const loopDuration = 60000;
  const totalProgress = (timeLine * speed) / loopDuration;
  const currentLoop = Math.floor(totalProgress);
  const loopProgress = totalProgress - currentLoop;
  const easeInOutProgress = easeInOutQuad(loopProgress, PARAMS.easingStrength);
  return easeInOutProgress;
}

function animateAlphaScale(timeLine, speed = 1) {
  const loopDuration = 60000;
  const totalProgress = (timeLine * speed) / loopDuration;
  const currentLoop = Math.floor(totalProgress);
  const loopProgress = totalProgress - currentLoop;
  const easeInOutProgress = easeInOutQuad(loopProgress, PARAMS.easingStrength);
  return easeInOutProgress;
}

function animateGradientScale(timeLine, speed = 1) {
  const loopDuration = 60000;
  const totalProgress = (timeLine * speed) / loopDuration;
  const currentLoop = Math.floor(totalProgress);
  const loopProgress = totalProgress - currentLoop;
  const easeInOutProgress = easeOutBack(loopProgress, 1.2);
  return easeInOutProgress;
}

function easeInOutQuad(t, strength = 2) {
  return t < 0.5
    ? Math.pow(2 * t, strength) / 2
    : 1 - Math.pow(2 * (1 - t), strength) / 2;
}

function easeInOutBack(t, strength = 1.70158) {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
}

function easeOutBack(t, intensity = 1) {
  const c1 = 1.70158 * intensity;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function typeWriter() {
  push();
  fill(255);
  noStroke();
  pop();

  push();
  textAlign(LEFT, TOP);
  fill(30);
  textSize(32);

  textFont(abcOracleLight);
  text("Expect", 60, 60);
  text("today with temperatures", 140, 100);
  text("peeking at", 60, 140);
  text("and", 345, 140);
  text("dipping to", 60, 183);
  text("tonight", 310, 183);
  text("with a", 60, 340);
  text("chance of", 230, 340);
  textFont(kazimirLI);
  text("BROKEN CLOUDS", 185, 67);
  text("RAIN", 70, 390);
  text("IN THE", 158, 390);
  text("AFTERNOON", 275, 390);
  noFill();
  stroke(color(accentColor));
  rect(173, 62, 280, 35, 20); // broken cloud
  rect(60, 387, 95, 35, 20); // rain
  rect(265, 387, 200, 35, 20); // afternoon
  strokeWeight(2);
  image(cloudImage, 60, 100, 70, 42);

  if (PARAMS.annotation1) {
    drawAnno1();
  }

  if (PARAMS.annotation2) {
    drawAnno2();
  }

  textFont(kazimirLI);
  noStroke();
  fill(accentColor);
  rect(224, 142, 115, 40, 10); // 35
  rect(224, 185, 75, 40, 10); // 25
  rect(150, 342, 75, 40, 10); // 50
  fill(240);
  text("35ºC", 233, 149);
  text("25ºC", 230, 193);
  text("50%", 160, 347);

  textFont("Verdana");
  text("🔥", 300, 149);

  //text(currentString, 10, 10, width, height);
  pop();
  //currentCharacter += 5;
}
