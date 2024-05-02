let url = "https://coolors.co/fe9920-1e91d6-d87cac-f9b9c3-341b74";
const pane = new Tweakpane.Pane();
let pallete;
let graphics;
let angles, visibility;
let xNum = 3;
let yNum = 1;
[xNum, yNum] = [20, 14];
let forecast = [21, 25, 0.7]; // time, temp, humidity;
let forecastColors;
let warmIrridescence = [];

const tempColor = ["#C62B01", "#3DD6D0"]; // hot, cold
const sunlighColor = ["#1B0034", "e0c31d"]; // sunny, cloudy
const humidityColor = ["#DCA100", "#1000C6"]; // dry, humid
const windDirs = [
  198, 129, 359, 213, 314, 360, 344, 347, 57, 197, 165, 175, 25, 320, 243, 22,
  355, 306, 225, 101, 341, 294, 14, 158,
];
console.log(windDirs.length);
const weatherData = [];
const PARAMS = {
  Time: 0,
  Length: 40,
};

function setup() {
  createCanvas(800, 600);
  // Pane
  pane.addInput(PARAMS, "Time", {
    min: 0,
    max: 23,
    step: 1,
  });

  pane.addInput(PARAMS, "Length", {
    mid: 0,
    max: 100,
  });
}

function draw() {
  frameRate(60);
  background(10, 10);

  for (let i = 0; i < xNum; i++) {
    for (let j = 0; j < yNum; j++) {
      if (yNum / 2 + 2 >= j && j >= yNum / 2 - 2)
        drawWind(
          (i * width) / xNum,
          (j * height) / yNum,
          PARAMS.Length,
          windDirs[PARAMS.Time] +
            noise(i * 0.05, j * 0.4) +
            noise(millis() * 0.001) * 40,
          color(255, 40 * noise(i * 0.5, j * 0.4, millis() * 0.0005))
        );
    }
  }
}

function drawWind(x, y, d, ang, color) {
  angleMode(DEGREES);
  stroke(color);
  strokeWeight(2);
  push();
  translate(x, y);
  let x1Pos = (cos(ang) * d) / 2;
  let y1Pos = (sin(ang) * d) / 2;
  let x2Pos = (cos(ang + 180) * d) / 2;
  let y2Pos = (sin(ang + 180) * d) / 2;
  line(x1Pos, y1Pos, x2Pos, y2Pos);
  pop();
}
