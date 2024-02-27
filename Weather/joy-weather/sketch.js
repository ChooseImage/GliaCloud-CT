// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

//  Go start the video before anything...
//  https://www.youtube.com/watch?v=7vUDCZ6NePg

//  I've found a thread on Processing's forum
//  with people discussing how to recreate the effect from Joy Division's album
//  https://discourse.processing.org/t/recreating-that-joy-division-album-cover/16444/5

//  Since I was having difficulty in understanding noise,
//  I decided to play a bit myself

let fontOracle, fontMaxiRound;
let x;
let f = 0;
let fadeLength = 30;
let data,
  temps,
  mappedTemps,
  perceps,
  mappedPerceps,
  wind,
  mappedWind,
  humidity;

function preload() {
  data = loadJSON("assets/data/weather-forecast-data.json");
  fontOracle = loadFont("assets/fonts/ABCOracleTripleVariable-Trial.ttf");
  fontMaxiRound = loadFont("assets/fonts/ABCMaxiRoundVariable-Trial.ttf");
  console.log(data);
}

function setup() {
  createCanvas(840, 500);
  stroke(255);
  strokeWeight(1.8);
  noiseDetail(2, 0.5);
  setupData();
  colorMode(HSL, 100);
  blendMode(BLEND);
  textFont(fontOracle);
}

function draw() {
  background(201, 0, 5);
  f++;

  createLine(mappedTemps, 4, 0, 10);
  createLine(mappedPerceps, 50, 0, 30);
  createLine(mappedWind, 75, 0, 90);
  createRuler();

  noStroke();
  fill("white");
  textSize(12);
  textFont(fontMaxiRound);
  text("°C", 680, 180);
  text("%", 680, 255);
  text("km/h", 680, 340);

  text("Feb 24", 160, 80);
  text("Feb 25", width / 2 - 10, 80);
  text("Feb 26", 640, 80);
}

function createRuler() {
  let length = 10;

  strokeWeight(1);
  stroke(0, 0, 40);
  for (let x = 0; x < 48; x++) {
    stroke(0, 0, 60 - pow(x % 12, 1.6));
    if (x % 12 === 0) {
      stroke(0, 0, 60);
      line(x * 10 + width / 4.6, 60, x * 10 + width / 4.6, 30 + length);
    }
    line(x * 10 + width / 4.6, 50, x * 10 + width / 4.6, 30 + length);
  }
}

function createLine(data, colorIndex, offX = 0, offY = 0) {
  push();
  translate(offX, offY);
  for (let x = 0; x < 48; x++) {
    const fillColor = color(colorIndex, data[x] * 2, 70);
    fill(colorIndex, data[x] * 2, 70);
    noStroke();
    for (let i = 0; i < fadeLength; i++) {
      fillColor.setAlpha(255 - map(i, 0, fadeLength, 0, 300));
      fill(fillColor);
      circle(
        x * 10 + width / 4.6,
        height * 0.45 - data[x] + i * 3,
        1 + 5 * noise(f * x * 0.0003, f * data[x] * 0.0001, f * i * 0.0001)
      );
    }
  }
  pop();
}

function setupData() {
  temps = loadHourlyTemp();
  temps = [
    17.59, 18.82, 17.69, 15.42, 19.05, 16.51, 21.67, 22.9, 23.29, 25.28, 26.19,
    25.17, 25.55, 27.92, 26.83, 27.75, 28.55, 27.29, 25.38, 20.38, 18.19, 16.72,
    17.76, 18.64, 18.09, 19.27, 17.82, 17.41, 18.33, 20.12, 21.12, 22.24, 20.31,
    22.88, 22.1, 21.08, 22.06, 23.69, 27.93, 26.69, 28.89, 20.82, 24.84, 15.81,
    15.16, 16.53, 15.65, 18.39,
  ];
  mappedTemps = mapData(temps, 0.2);
  perceps = [
    0.15, 0.14, 0.12, 0.29, 0.14, 0.12, 0.17, 0.18, 0.26, 0.15, 0.51, 0.78, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.58, 0.34, 0.16, 0.13, 0.15, 0.27, 0.14,
    0.28, 0.1, 0.17, 0.2, 0.26, 0.27, 0.21, 0.18, 0.43, 0.74, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 0.21, 0.14, 0.25, 0.11, 0.28,
  ];
  mappedPerceps = mapPerceps(perceps, 0.1);
  wind = [
    5.18, 4.68, 5.09, 0.64, 7.52, 2.46, 1.28, 8.91, 2.62, 0.79, 2.76, 3.32, 4.5,
    1.63, 7.05, 5.11, 8.23, 3.87, 6.61, 1.39, 4.3, 2.56, 3.53, 7.26, 3.82, 6.93,
    1.85, 4.67, 6.76, 4.03, 0.58, 2.94, 3.18, 1.18, 4.48, 2.83, 2.28, 3.51,
    2.39, 3.91, 2.42, 2.35, 0.99, 3.9, 5.08, 2.15, 4.25, 5.17,
  ];
  mappedWind = mapData(wind, 0.05);
}

function loadHourlyTemp() {
  let hourlyTemp = data.Forecast.map((hour) => hour.temp);
  return hourlyTemp;
}

function loadHourlyTemp() {
  let hourlyTemp = data.Forecast.map((hour) => hour.temp);
  return hourlyTemp;
}

function loadHourlyWind() {
  let hourlyWind = data.Forecast.map((hour) => hour.wind);
  return hourlyWind;
}

function mapData(data, i) {
  // return a new array with the temps mapped to the canvasheight
  let maxData = max(data);
  let minData = min(data);
  let mappedData = data.map((dataI) =>
    map(dataI, minData, maxData, 0, height * i)
  );
  return mappedData;
}

function mapPerceps(perceps, i) {
  // return a new array with the temps mapped to the canvasheight
  let maxPercep = max(perceps);
  let minPercep = min(perceps);
  let mappedPerceps = perceps.map((percep) =>
    map(percep, minPercep, maxPercep, 0, height * i)
  );
  return mappedPerceps;
}
