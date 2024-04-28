const pane = new Tweakpane.Pane();
const PARAMS = {
  Time: 0,
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
const weatherData = [];

function setup() {
  createCanvas(800, 800);
  colorMode(RGB);
  background(129, 180, 202);
  frameCount = 1;
  frameRate(1000);
}

function draw() {
  fill(129, 180, 202);
  rect(0, 0, width, height);
  cloud(0, 0);
  cloud(100, 200);
  cloud(300, 350);
  cloud(200, 250);
  cloud(150, 450);
  cloud(235, 550);
  cloud(700, 423);
  cloud(760, 100);
  cloud(570, 345);
  cloud(400, 780);
  cloud(312, 700);
  cloud(637, 37);
  cloud(470, 53);
  cloud(220, 695);
}

function cloud(x, y) {
  noStroke();

  fill("white");
  ellipse((frameCount + 50 + x) % width, 50 + y, 60, 50);
  ellipse((frameCount + 80 + x) % width, 40 + y, 60, 50);
  ellipse((frameCount + 130 + x) % width, 50 + y, 60, 50);
  ellipse((frameCount + 70 + x) % width, 70 + y, 60, 50);
  ellipse((frameCount + 110 + x) % width, 65 + y, 60, 50);
}
