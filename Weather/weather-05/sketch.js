const pane = new Tweakpane.Pane();
const PARAMS = {
  Time: 0,
  TempColor: "#C62B01",
  bgColor: { r: 0, g: 255, b: 214, a: 0.5 },
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
  background(bgClr);
  fill(PARAMS.TempColor);

  forecast = [PARAMS.Time, temp[PARAMS.Time], humidity[PARAMS.Time]]; // time, temp, humidity
  forecastColors = setColors(forecast);

  let condition = "Sunny";
  let temperture = forecast[1].toString().slice(0, 2);
  let wCon = textWidth(condition);
  let wTemp = textWidth(temperture);
  textSize(50);
  text(temperture, width / 2 - wTemp / 2, height / 1.4);
  text(condition, width / 2 - wCon / 2, height / 1.2);

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
