// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

//  Go start the video before anything...
//  https://www.youtube.com/watch?v=7vUDCZ6NePg

//  I've found a thread on Processing's forum
//  with people discussing how to recreate the effect from Joy Division's album
//  https://discourse.processing.org/t/recreating-that-joy-division-album-cover/16444/5

//  Since I was having difficulty in understanding noise,
//  I decided to play a bit myself

let fontOracle, fontMaxiRound;
let minuteForecast;
let precipitationArr = [];
let tempArr = [];
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
  const url =
    "https://api.tomorrow.io/v4/weather/forecast?location=25.6,123&apikey=32dZsndgMx4yjh9Qxy5TkcywRbYSHs9F";
  //minuteForecast = loadJSON(url);

  //data = loadJSON("assets/data/weather-forecast-data.json");
  fontOracle = loadFont("assets/fonts/ABCOracleTripleVariable-Trial.ttf");
  fontMaxiRound = loadFont("assets/fonts/ABCMaxiRoundVariable-Trial.ttf");
}

function setup() {
  createCanvas(840, 500);
  stroke(255);
  strokeWeight(1.8);
  noiseDetail(2, 0.5);
  //setupData();
  colorMode(HSB, 100);
  blendMode(BLEND);
  textFont(fontMaxiRound);
  // for (let i = 0; i < 24; i++) {
  //   tempArr.push(minuteForecast.timelines.hourly[i].values.temperature);
  //   precipitationArr.push(
  //     minuteForecast.timelines.hourly[i].values.precipitationProbability
  //   );
  // }
  // console.log(tempArr);
  // console.log(precipitationArr);
  tempArr = [
    19.19, 19.59, 20, 20.39, 20.69, 21.06, 21.25, 21.47, 21.45, 21.6, 21.92,
    22.08, 22.1, 22.07, 22, 21.99, 21.96, 22.13, 22.72, 22.58, 22.37, 21.72,
    21.69, 21.96,
  ];
  precipitationArr = [
    0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0,
  ];
}

function draw() {
  background(201, 0, 90);
  f++;

  createTemp(tempArr, 80, 0, 0);
  createPrec(precipitationArr, 60, 0, 400);
  noStroke();
  fill("white");
  textSize(12);
  textFont(fontOracle);
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

function createGradient(c1, c2, x1, y1, x2, y2) {
  rectMode(CORNERS);
  let gradient = drawingContext.createLinearGradient(x1, y1, x1, y2);
  gradient.addColorStop(0, c1);
  gradient.addColorStop(0.7, lerpColor(c1, c2, 0.3));
  gradient.addColorStop(1, c2);

  drawingContext.fillStyle = gradient;

  rect(x1, y1, x2, y2, 3);
  rectMode(CORNER);
}

function caliborateTemp(data, top, btm) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  let calibedData = [];
  for (d in data) {
    calibedData.push(map(data[d], min, max, btm, top));
  }
  return calibedData;
}

function caliboratePrec(data, btm, top) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  let calibedData = [];
  for (d in data) {
    calibedData.push(map(data[d], min, max, btm, top));
  }
  return calibedData;
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

function createTemp(data, colorIndex, offX = 0, offY = 0) {
  const calibedTemp = caliborateTemp(data, 130, 250);
  push();
  translate(offX, offY);
  for (let x = 0; x < 12; x++) {
    const fillColor = color(colorIndex, calibedTemp[x] * 2, 70);
    fill(colorIndex, calibedTemp[x] * 2, 70);
    noStroke();
    text(round(data[x]), x * 46 + width / 4.8 - 6, calibedTemp[x] - 10);
    circle(x * 46 + width / 4.8, calibedTemp[x], 10);
  }
  pop();
}

function createPrec(data, colorIndex, offX = 0, offY = 0) {
  const c1 = color(colorIndex, 100, 100, 0);

  const calibedPrec = caliboratePrec(data, 0, 100);
  const w = 25;
  rectMode(CORNERS);
  push();
  translate(offX, offY);
  for (let x = 0; x < 12; x++) {
    const c2 = color(colorIndex, 100, 100, data[x]); // controlling the opacity of the max value according to the max value
    const fillColor = color(colorIndex, calibedPrec[x] * 2, 70);
    fill(colorIndex, calibedPrec[x] * 2, 70);
    noStroke();
    text(data[x], x * 46 + width / 4.8 - 6, -calibedPrec[x] - 10);
    createGradient(
      c1,
      c2,
      x * 46 + width / 4.8 - 6,
      0,
      x * 46 + width / 4.8 - 6 + w,
      -calibedPrec[x]
    );
  }
  pop();
  rectMode(CORNER);
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
