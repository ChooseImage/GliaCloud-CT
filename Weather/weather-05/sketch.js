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
  bgColor: "#bfbfef",
  lineColor: { r: 0, g: 255, b: 214, a: 0.5 },
  lineBrightness: 100,
  tempColorAngle: 30,
  percepsColorAngle: 50,
  dotSize: 14,
  cloudDotX: 1,
  cloudDotY: 1,
};
var cloud;
let forecast = [21, 25, 0.7]; // time, temp, humidity;
const sunlighColor = ["#1B0034", "e0c31d"]; // sunny, cloudy
const tempColor = ["#C62B01", "#3DD6D0"]; // hot, cold
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
const [_Width, _Height] = [800, 540];
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
  // data prep

  // Pane
  pane.addInput(PARAMS, "Time", {
    min: 0,
    max: 23,
    step: 1,
  });
  pane.addInput(PARAMS, "bgColor", {
    view: "color",
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

  //image(noiseGra, 0, 0);
  const bgClr = color("#000");
  background(20, 255);

  // CLOUD MASKING
  push();
  noStroke();
  clip(cloudMask);
  fill(255);
  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 40; j++) {
      fill(100 + 155 * abs(noise(i * 4, j * 10, millis() * 0.0001)));
      circle(
        (i * 40) / PARAMS.cloudDotX,
        (j * 40) / PARAMS.cloudDotY,
        PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001)
      );
      /*
      rectMode(CENTER);
      rect(
        i * 20,
        j * 20,
        PARAMS.dotSize * noise(i * 4, j * 0.3, millis() * 0.001)
      );
      */
    }
  }
  pop();
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

  createLine(mappedTemps, PARAMS.tempColorAngle, -140, 10);
  createLine(
    mappedPerceps,
    PARAMS.percepsColorAngle,
    -70,
    10 + height / 24 / 2
  );

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

function drawSun() {
  push();

  // Mask setting
  //Mask
  beginClip();
  circle(width / 2, height / 2 - 70, width / 4);
  endClip();
  for (let i = 0; i < ys.length; i++) {
    const weight = map(ys[i], 0, height, height / amount, 1);
    const alpha = map(ys[i], 0, height, 255, 200);
    const clr1 = forecastColors[1];
    const clr2 = forecastColors[0];
    const ratio = map(ys[i], 0, height, 0, 1);
    const mixedClr = lerpColor(clr1, clr2, ratio);
    const strokeClr = color(mixedClr);
    strokeClr.setAlpha(alpha);
    strokeWeight(weight);
    stroke(strokeClr);
    line(0, ys[i], width, ys[i]);
    if (ys[i] > height) {
      ys[i] = 0;
    }
    ys[i] += 0.3; // Speed
  }
  pop();
}

function cloudMask() {
  beginShape();
  vertex(62.5001, 81.4998);
  vertex(30.0001, 81.4998);
  bezierVertex(13.7501, 81.4998, 7.0001, 102.5, 2.0001, 125.5);
  bezierVertex(-1.9999, 143.9, 14.6668, 165.167, 23.5001, 173.5);
  vertex(348.5, 173.5);
  bezierVertex(394.5, 148, 384.5, 107.5, 365, 87.5);
  bezierVertex(349.4, 71.5, 322.5, 74.8333, 311, 78.5);
  bezierVertex(307, 41.5, 285.5, 40, 276.5, 38.5);
  bezierVertex(269.3, 37.3, 254.5, 40.6667, 248, 42.5);
  bezierVertex(242.5, 30.4999, 227.4, 5.6998, 211, 2.4998);
  bezierVertex(194.6, -0.700204, 177.167, 1.16646, 170.5, 2.4998);
  bezierVertex(167, 3.33313, 159.5, 5.4998, 157.5, 7.4998);
  bezierVertex(155.5, 9.4998, 151, 10.3331, 149, 10.4998);
  vertex(131.5, 10.4998);
  bezierVertex(128.7, 10.4998, 125.333, 13.4998, 124, 14.9998);
  bezierVertex(121.5, 17.9998, 116.1, 24.3998, 114.5, 25.9998);
  bezierVertex(112.9, 27.5998, 112.5, 28.9998, 112.5, 29.4998);
  vertex(112.5, 45.9998);
  bezierVertex(104.5, 45.9998, 87.7001, 46.2998, 84.5001, 47.4998);
  bezierVertex(81.3001, 48.6998, 68.5001, 70.6665, 62.5001, 81.4998);
  endShape();
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
