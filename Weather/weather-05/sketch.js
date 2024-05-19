const apiUrl =
  "https://data3p-al23s7k26q-de.a.run.app/weather/current?area=taipei";

let currentWeather;
let fadeLength = 100;
let f = 0;

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
  bg: "#c2d2c6",
  lineColor: { r: 0, g: 255, b: 214, a: 0.5 },
  lineBrightness: 100,
  tempColorAngle: 30,
  percepsColorAngle: 50,
  dotSize: 4,
  cloudDotX: 5,
  cloudDotY: 5,
  theme: "",
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
}

function setup() {
  textFont(fontSerif);
  blendMode(SCREEN);
  requestJsonData();
  mappedTemps = mapData(temp, 40);
  mappedPerceps = mapData(perceps, 40);
  tempColor = [color("#C62B01"), color("#3DD6D0")]; // hot, cold
  // data prep

  // Pane
  pane.addInput(PARAMS, "bg", {
    view: "color",
  });
  pane.addInput(PARAMS, "Time", {
    min: 0,
    max: 23,
    step: 1,
  });
  pane.addInput(PARAMS, "TempColor", {
    view: "color",
  });
  pane.addInput(PARAMS, "lineColor", {
    view: "color",
  });
  pane.addInput(PARAMS, "lineBrightness", {
    min: 0,
    max: 100,
  });
  pane.addInput(PARAMS, "tempColorAngle", {
    min: 0,
    max: 360,
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
  createCanvas(_Width, _Height);
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
}

function draw() {
  clear();
  image(noiseGra, 0, 0);
  const bgClr = color("#000");
  background(PARAMS.bg);
  background("#000");

  // Draw Cloud
  drawCloud(width / 4, height / 4, "circle", cloudMask2);
  drawCloud(width / 4 + 4, height / 4 + 4, "rect", cloudMask1);
  drawSun(width / 4 + width / 10, height / 4 + width / 10, width / 5);
  // drawSun();

  fill(PARAMS.TempColor);

  // --------------------------------------------

  forecast = [PARAMS.Time, temp[PARAMS.Time], humidity[PARAMS.Time]]; // time, temp, humidity
  forecastColors = setColors(forecast);

  let condition = "Sunny";
  let temperture = forecast[1].toString().slice(0, 2);
  let wTemp = textWidth(temperture);
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

  //text(temperture, width / 2 - wTemp / 2, height / 1.4);

  //text(condition, width / 2 - wCon / 2, height / 1.2);

  // createLine(mappedTemps, PARAMS.tempColorAngle, -140, 10);
  // createLine(
  //   mappedPerceps,
  //   PARAMS.percepsColorAngle,
  //   -70,
  //   10 + height / 24 / 2
  // );
  //createLine(mappedTemps, PARAMS.tempColorAngle, -140, 10);
  //createLine(mappedPerceps, PARAMS.percepsColorAngle, 0, 10 + height / 24 / 2);

  createLineVert(mappedTemps, PARAMS.tempColorAngle, 0, -50);
  createLineVert(
    mappedPerceps,
    PARAMS.percepsColorAngle,
    50,
    10 + height / 24 / 2
  );
  createLineVert(mappedTemps, PARAMS.tempColorAngle, 10, -50);
  createLineVert(mappedPerceps, PARAMS.percepsColorAngle, 10, -100);

  // 	noStroke()
  // 	fill('#ffd500')

  // 	circle(width / 2, height / 2,200)
  // 		push()
  // 	for(let i = 0; i< 20; i++) {
  // 		const x =  randomGaussian(-100,100)
  // 		fill('#fff')
  // 		ellipse(width / 2 + x, height / 2, 5)

  // 	}
  // 	pop()
  // 		image(noiseGra, 0, 0)

  // const a = map(y, 0, height, 0, 255)
  // const weight = map(y, 0, height, 0, 10)
  // stroke(0, a)
  // strokeWeight(weight)
  // for (let i = 0; i < amount; i++) {
  // 	line(0, (height / 10) * i + y, width, (height / 10) * i + y)
  // }
  // // line(0,y,width, y)
  // if (y > height) {
  // 	y = 0
  // }
  // y += 1
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

function setColors(colors) {
  const TempColor = lerpColor(
    color(tempColor[1]),
    color(tempColor[0]),
    map(colors[1], 5, 38, 0, 1)
  );
  const SunlighColor = lerpColor(
    color(sunlighColor[1]),
    color(sunlighColor[0]),
    map(abs(colors[0] % 24), 0, 23, 1, 0)
  );
  const HumidityColor = lerpColor(
    color(humidityColor[0]),
    color(humidityColor[1]),
    map(colors[2], 0, 1, 0, 1)
  );
  return [
    TempColor,
    SunlighColor,
    HumidityColor,
    color(sunlighColor[0]),
    color(sunlighColor[1]),
  ];
}

function createLine(data, colorIndex, offX = 0, offY = 0) {
  push();
  colorMode(HSL, 100);
  translate(offX, offY);
  for (let y = 0; y < 24; y++) {
    const fillColor = color(colorIndex, data[y] * 2, PARAMS.lineBrightness);
    //fill(colorIndex, data[y] * 2, 70);
    noStroke();
    for (let i = 0; i < fadeLength; i++) {
      const focus = 100 - map(pow(Math.abs(y - 24 / 2), 1.3), 0, 24 / 2, 0, 60);
      const fade = 100 - map(i, 0, fadeLength, 0, 300);
      fillColor.setAlpha(getWeightedAverage([focus, fade], [0.7, 0.3]));
      fill(fillColor);
      circle(
        width - data[y] + i * 3,
        y * (height / 24),
        3 + 2 * noise(f * y * 0.0003, f * data[y] * 0.0001, f * i * 0.0001)
      );
    }
  }
  pop();
}

function createLineVert(data, colorIndex, offX = 0, offY = 0) {
  push();
  colorMode(HSL, 100);
  translate(offX, offY);
  for (let x = 0; x < 24; x++) {
    const fillColor = color(colorIndex, data[x] * 2, PARAMS.lineBrightness);
    //fill(colorIndex, data[y] * 2, 70);
    noStroke();
    for (let i = 0; i < fadeLength; i++) {
      const focus = 100 - map(pow(Math.abs(x - 24 / 2), 1.3), 0, 24 / 2, 0, 60);
      const fade = 100 - map(i, 0, fadeLength, 0, 300);
      fillColor.setAlpha(getWeightedAverage([focus, fade], [0.7, 0.3]));
      fill(fillColor);
      circle(
        x * (width / 24),
        height - data[x] + i * 3,
        3 + 2 * noise(f * x * 0.0003, f * data[x] * 0.0001, f * i * 0.0001)
      );
    }
  }
  pop();
}

// Draw Cloud
function drawCloud(x, y, type, mask) {
  push();
  translate(x, y);
  noStroke();
  clip(mask);
  fill(255);
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 40; j++) {
      if (type === "circle") {
        fill(100 + 155 * abs(noise(i * 4, j * 10, millis() * 0.0001)));
        circle(
          (i * 40) / PARAMS.cloudDotX,
          (j * 40) / PARAMS.cloudDotY,
          PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001)
        );
      } else if (type === "circle") {
        fill(40, 40, 0);
        rectMode(CENTER);
        rect(
          (i * 40) / PARAMS.cloudDotX,
          (j * 40) / PARAMS.cloudDotY,
          PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001)
        );
      }
    }
  }
  pop();
}

/*
var pathPoints = []

function setup() {
  createCanvas(1024, 768); 
  background(0);
} 

function draw() {
  //create the path
  pathPoints = circlePoints();
  
  for(var j=0;j<6;j++){
	pathPoints = complexifyPath(pathPoints);
  }

  //draw the path
  stroke(252,192,44,35);
  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    line(v1.x,v1.y,v2.x,v2.y);
  }
}

function complexifyPath(pathPoints){
  //create a new path array from the old one by adding new points inbetween the old points
  var newPath = [];
  
  for(var i=0;i<pathPoints.length -1;i++){
    var v1 = pathPoints[i];
    var v2 = pathPoints[i+1];
    var midPoint = p5.Vector.add(v1, v2).mult(0.5);
    var distance =  v1.dist(v2);
    
    //the new point is halfway between the old points, with some gaussian variation
    var standardDeviation = 0.125*distance;
    var v = createVector(randomGaussian(midPoint.x,standardDeviation),randomGaussian(midPoint.y,standardDeviation))
   	append(newPath,v1);
    append(newPath,v);
  }
  
  //don't forget the last point!
  append(newPath,pathPoints[pathPoints.length-1]);
  return newPath;  
}

function circlePoints() {
  //two points somewhere on a circle
  var r = height/2.4;
  //var theta1 = random(TWO_PI);
  var theta1 = randomGaussian(0,PI/2);
  var theta2 = theta1 + randomGaussian(0,PI/3);
  var v1 = createVector(width/2 + r*cos(theta1),height/2 + r*sin(theta1));
  var v2 = createVector(width/2 + r*cos(theta2),height/2 + r*sin(theta2));
  
  return [v1,v2];
}
*/

/*
function setup() {
	createCanvas(1112, 834)
}
function draw() {
	background('navy');
	translate(width/2, height/2);
	for (let i = 0; i < 300; i ++) {
		stroke(i, i, 255,i);
		strokeWeight(6);
		line(100, 50, 600, 100);
		rotate(PI / 2 + frameCount * 0.00001);
	}
}
*/

/*
int rs, num=100;
float szS, szB, angle, theta;

void setup() {
  size(500, 500);
  colorMode(HSB, 360, 100, 100);
  rs = int(random(1000));
  szS = width*.8;
  strokeCap(SQUARE);
}

void draw() {
  randomSeed(rs);
  background(0, 0, 90);

  noFill();
  stroke(#290350);
  strokeWeight(100);
  ellipse(width/2, height/2, szS, szS);

  angle=0;
  for (int i=0; i<num; i++) {
    szB = width/2;
    float xo = width/2;
    float yo = height/2;
    float x = xo+sin(angle)*szB;
    float y = yo+cos(angle)*szB;
    strokeWeight(random(10, 15));
    stroke(0, 0, 90);
    point(x, y);
    PVector loc = new PVector(x, y);
    PVector center = new PVector(xo, yo);
    PVector dir = PVector.sub(center, loc);
    dir.normalize();
    float m = random(100, 150);
    float offSet = TWO_PI/num*i;
    float mu = map(sin(theta+offSet*3),-1,1,m,m/2);
    dir.mult(mu);
    line(loc.x, loc.y, loc.x+dir.x, loc.y+dir.y);
    strokeWeight(30);
    ellipse(xo, yo, width, height);   
    angle += (TWO_PI/num);
  } 
  theta += 0.0523;
  //if (frameCount%2==0 && frameCount<121) saveFrame("image-###.jpg");
}
*/

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

function cloudMask1() {
  beginShape();
  vertex(60.4429, 6.24134);
  bezierVertex(54.3785, 7.76171, 55.6838, 17.6367, 54.0468, 18.5943);
  bezierVertex(51.2041, 20.2573, 37.7013, 20.7799, 35.8062, 29.5221);
  bezierVertex(33.9111, 38.2643, 21.3558, 37.0448, 15.6704, 36.4112);
  bezierVertex(12.8277, 35.461, -5.17602, 44.2506, 1.45694, 64.443);
  bezierVertex(8.0899, 84.6354, 20.4082, 83.9227, 34.8586, 78.934);
  bezierVertex(56.6594, 71.4077, 76.3146, 82.4974, 87.9223, 77.9838);
  bezierVertex(99.53, 73.4702, 99.7669, 76.796, 114.217, 81.5471);
  bezierVertex(125.778, 85.348, 138.301, 80.7553, 143.118, 77.9838);
  bezierVertex(154.678, 84.0652, 163.254, 83.3684, 166.097, 82.2598);
  bezierVertex(173.203, 78.934, 185.759, 67.8638, 179.126, 50.1896);
  bezierVertex(172.493, 32.5153, 155.515, 33.6397, 147.856, 36.4112);
  bezierVertex(145.582, 14.3659, 127.167, 16.1396, 118.244, 19.782);
  bezierVertex(105.689, -11.8131, 80.8156, 3.1531, 77.2622, 6.24134);
  bezierVertex(73.7088, 9.32959, 68.0234, 4.34089, 60.4429, 6.24134);
  endShape();
}

function cloudMask2() {
  beginShape();
  vertex(22.7496, 45.868);
  bezierVertex(23.4439, 44.0494, 24.1053, 42.4512, 24.6784, 40.8199);
  bezierVertex(26.8828, 34.5429, 31.8427, 31.8756, 37.9048, 30.8285);
  bezierVertex(39.7454, 30.5089, 41.6798, 30.7073, 43.5756, 30.6852);
  bezierVertex(44.6447, 30.6852, 45.7138, 30.6852, 47.0916, 30.6852);
  bezierVertex(47.2294, 28.2383, 47.4829, 26.078, 47.4388, 23.9177);
  bezierVertex(47.3726, 20.8812, 48.5961, 18.5059, 50.4533, 16.2023);
  bezierVertex(58.8024, 5.80862, 69.9016, 0.821178, 82.8854, 0.0441286);
  bezierVertex(89.449, -0.347151, 95.6048, 1.90133, 101.276, 5.29059);
  bezierVertex(106.599, 8.47594, 110.325, 13.0501, 112.959, 18.5941);
  bezierVertex(113.356, 19.4318, 113.841, 20.2474, 114.414, 21.2835);
  bezierVertex(120.349, 20.0655, 126.031, 20.1813, 130.947, 24.3696);
  bezierVertex(135.549, 28.1779, 138.588, 33.5473, 139.483, 39.4532);
  bezierVertex(140.767, 39.4532, 141.831, 39.4532, 142.889, 39.4532);
  bezierVertex(146.03, 39.4863, 149.161, 39.332, 152.258, 40.1917);
  bezierVertex(156.881, 41.4592, 160.557, 43.862, 163.12, 47.9566);
  bezierVertex(166.796, 53.8148, 169.182, 60.0478, 168.989, 67.0963);
  bezierVertex(168.818, 73.5552, 166.234, 78.5812, 160.723, 82.1964);
  bezierVertex(156.51, 84.997, 151.772, 86.9131, 146.796, 87.8286);
  bezierVertex(142.479, 88.571, 138.124, 89.077, 133.752, 89.3442);
  bezierVertex(131.859, 89.3822, 129.97, 89.1634, 128.136, 88.6939);
  bezierVertex(125.524, 88.1428, 123.176, 88.6939, 120.773, 89.7244);
  bezierVertex(116.596, 91.532, 112.435, 93.3947, 108.164, 94.9543);
  bezierVertex(105.513, 95.9294, 102.763, 96.6131, 99.964, 96.9934);
  bezierVertex(93.8732, 97.8613, 87.6913, 97.878, 81.5959, 97.043);
  bezierVertex(76.0353, 96.2274, 71.1636, 93.6041, 66.5454, 90.507);
  bezierVertex(65.6361, 89.8953, 64.7157, 89.3001, 63.6356, 88.5781);
  bezierVertex(62.0208, 89.504, 60.4502, 90.507, 58.7914, 91.3336);
  bezierVertex(57.2373, 92.1052, 55.6116, 92.7224, 53.9913, 93.3396);
  bezierVertex(50.7369, 94.5629, 47.304, 95.2443, 43.8291, 95.3566);
  bezierVertex(38.6212, 95.5661, 33.4464, 95.77, 28.3046, 94.4418);
  bezierVertex(15.7451, 91.2124, 6.56379, 83.9269, 1.48266, 71.9294);
  bezierVertex(-0.688668, 66.8097, -0.319432, 61.4255, 1.58186, 56.2176);
  bezierVertex(2.04432, 55.0481, 2.72932, 53.9794, 3.59888, 53.0708);
  bezierVertex(7.86989, 48.4967, 13.0612, 45.8074, 19.4705, 45.868);
  vertex(22.7496, 45.868);
  endShape();
  vertex(63.9993, 81.1989);
  bezierVertex(67.1406, 84.8307, 71.1636, 86.9855, 75.4732, 88.5285);
  bezierVertex(81.8494, 90.7935, 88.4901, 90.9754, 95.1253, 90.3141);
  bezierVertex(100.791, 89.763, 106.373, 88.6608, 111.405, 85.7289);
  bezierVertex(113.174, 84.6984, 115.026, 83.8001, 116.795, 82.7695);
  bezierVertex(117.468, 82.3597, 118.217, 82.0882, 118.996, 81.9709);
  bezierVertex(119.776, 81.8536, 120.571, 81.8928, 121.336, 82.0862);
  bezierVertex(129.9, 84.0536, 138.32, 82.7144, 146.626, 80.6588);
  bezierVertex(150.417, 79.7165, 154.253, 78.6198, 157.532, 76.2501);
  bezierVertex(160.183, 74.3267, 162.337, 71.9735, 162.916, 68.7386);
  bezierVertex(163.638, 64.6935, 163.952, 60.5823, 161.682, 56.7687);
  bezierVertex(161.065, 55.6659, 160.545, 54.5116, 160.127, 53.3188);
  bezierVertex(158.717, 49.5989, 155.774, 47.615, 152.285, 46.2923);
  bezierVertex(150.801, 45.7538, 149.261, 45.3841, 147.695, 45.1901);
  bezierVertex(143.754, 44.639, 139.819, 44.5068, 136.044, 46.1325);
  bezierVertex(134.854, 46.645, 133.884, 46.2593, 133.096, 45.3334);
  bezierVertex(132.308, 44.4076, 132.115, 43.3495, 133.096, 42.3961);
  bezierVertex(134.077, 41.4427, 133.934, 40.4121, 133.823, 39.3099);
  bezierVertex(133.272, 33.8816, 130.517, 29.8971, 125.849, 27.1857);
  bezierVertex(124.449, 26.3701, 123.066, 25.819, 121.385, 26.0395);
  bezierVertex(119.837, 26.2434, 118.189, 25.9623, 116.706, 26.3481);
  bezierVertex(115.092, 26.7724, 113.609, 27.7203, 112.165, 28.3982);
  bezierVertex(110.297, 27.814, 109.531, 26.6401, 109.3, 24.8821);
  bezierVertex(109.107, 23.3501, 108.941, 21.6747, 108.197, 20.3576);
  bezierVertex(104.973, 14.5215, 100.427, 10.2064, 93.957, 7.9028);
  bezierVertex(88.4444, 5.90118, 82.4568, 5.60545, 76.7738, 7.0541);
  bezierVertex(68.7326, 8.92168, 61.5049, 13.3248, 56.1572, 19.6136);
  bezierVertex(54.4554, 21.5073, 53.3461, 23.8582, 52.9663, 26.3756);
  bezierVertex(52.6742, 28.58, 52.575, 30.7844, 52.316, 32.9888);
  bezierVertex(51.9798, 35.8159, 50.6627, 36.8465, 47.9072, 36.6371);
  bezierVertex(45.8681, 36.4883, 43.796, 36.086, 41.779, 36.2899);
  bezierVertex(34.3337, 36.9788, 30.5421, 40.0429, 28.9549, 46.7167);
  bezierVertex(28.7731, 47.4772, 28.6849, 48.2653, 28.5141, 49.0313);
  bezierVertex(28.3848, 49.7893, 28.0984, 50.5118, 27.6732, 51.1525);
  bezierVertex(27.248, 51.7931, 26.6934, 52.3377, 26.0451, 52.7512);
  bezierVertex(25.0697, 52.5418, 23.8407, 52.3048, 22.6614, 52.0238);
  bezierVertex(16.6324, 50.624, 8.50917, 54.9997, 6.49215, 60.7697);
  bezierVertex(6.29347, 61.368, 6.15501, 61.9846, 6.07882, 62.6104);
  bezierVertex(5.64498, 65.1864, 5.81755, 67.8282, 6.58285, 70.3259);
  bezierVertex(7.34815, 72.8237, 8.68511, 75.1087, 10.4876, 76.9995);
  bezierVertex(15.6514, 82.7089, 22.1103, 85.9714, 29.5501, 87.5751);
  bezierVertex(35.0611, 88.782, 40.5225, 88.2971, 46.0335, 87.746);
  bezierVertex(50.5194, 87.2996, 54.6967, 86.1202, 58.4222, 83.519);
  bezierVertex(60.0758, 82.323, 61.9853, 81.5286, 63.9993, 81.1989);
  endShape();
}
