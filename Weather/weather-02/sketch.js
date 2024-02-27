/*
Mod from
kusakari,
Nina Lutz
*/

let aryObjects_ = [];
let aryXY_ = [];
let aryNoiseXY_ = [];
let xyStep_;
let noiseStep_;
let noiseXStart_;
let noiseX_;
let noiseYStart_;
let noiseY_;
let noiseT_;
let deg_;
let divideNum_;
let scale_;
let x;
let f = 0;
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
  console.log(data);
}

function setup() {
  let canvas;

  canvas = createCanvas(840, 500);
  fill(0, 17, 25);
  noFill();
  stroke(255);
  strokeWeight(1.8);
  noiseDetail(2, 0.5);
  setupData();

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);

  background(0);
  noStroke();
  fill(255);
  // frameRate(30);
  rectMode(CENTER);
  divideNum_ = 80;
  xyStep_ = width / divideNum_;
  noiseStep_ = 0.04 * 1;
  noiseXStart_ = random(40);
  noiseX_ = noiseXStart_;
  noiseYStart_ = random(10);
  noiseY_ = noiseYStart_;
  noiseT_ = random(10);
  deg_ = 2;
  scale_ = (width / 691) * 30;
  aryNoiseXY_ = set_noise(aryNoiseXY_);
  aryXY_ = set_xy(aryXY_);
}

var t = 0;
function draw() {
  noiseT_ += noiseStep_ * 0.2;
  aryNoiseXY_ = update_noise(aryNoiseXY_);
  aryXY_ = set_xy(aryXY_);
  background(0, 10);
  for (let iY = 1; iY < aryXY_.length; iY++) {
    for (let iX = 1; iX < aryXY_[iY].length; iX++) {
      let wx = aryXY_[iY][iX][0] - aryXY_[iY - 1][iX - 1][0];
      let wy = aryXY_[iY][iX][1] - aryXY_[iY - 1][iX - 1][1];
      ellipse(
        aryXY_[iY - 1][iX - 1][0] + wx / 2,
        aryXY_[iY - 1][iX - 1][1] + wy / 2,
        wx * 0.3 + wy * 0.3
      );
    }
  }
}
function set_noise(aryNoiseXY) {
  aryNoiseXY = [];
  let iY = 0;
  let iX;
  for (let y = 0; y < height; y += xyStep_) {
    aryNoiseXY[iY] = [];
    noiseX_ = noiseXStart_;
    iX = 0;
    for (let x = 0; x < height; x += xyStep_) {
      aryNoiseXY[iY][iX] = [];
      aryNoiseXY[iY][iX].push(noiseX_, noiseY_, noiseT_);
      noiseX_ += noiseStep_ * 2;
      iX++;
    }
    noiseY_ += noiseStep_ * 2;
    iY++;
  }
  return aryNoiseXY;
}

function update_noise(aryNoiseXY) {
  for (let iY = 0; iY < aryNoiseXY.length; iY++) {
    for (let iX = 0; iX < aryNoiseXY[iY].length; iX++) {
      aryNoiseXY[iY][iX][2] = noiseT_;
    }
  }
  return aryNoiseXY;
}

function calc_sumNoiseX(ary, selectY) {
  let sum = 0;
  for (let i = 0; i < ary[selectY].length; i++) {
    sum += pow(
      noise(ary[selectY][i][0], ary[selectY][i][1], ary[selectY][i][2]),
      deg_
    );
  }
  return sum;
}

function calc_sumNoiseY(ary, selectX) {
  let sum = 0;
  for (let i = 0; i < ary.length; i++) {
    sum += pow(
      noise(ary[i][selectX][0], ary[i][selectX][1], ary[i][selectX][2]),
      deg_
    );
  }
  return sum;
}

function set_xy(aryXY) {
  aryXY = [];
  let noiseVal;
  for (let i = 0; i < aryNoiseXY_.length; i++) {
    aryXY[i] = [];
    let sumNoiseX = calc_sumNoiseX(aryNoiseXY_, i);
    let currentSumNoiseX = 0;
    for (let j = 0; j < aryNoiseXY_[i].length; j++) {
      noiseVal = pow(
        noise(aryNoiseXY_[i][j][0], aryNoiseXY_[i][j][1], aryNoiseXY_[i][j][2]),
        deg_
      );
      aryXY[i][j] = [];
      currentSumNoiseX += noiseVal * scale_;
      aryXY[i][j][0] = width / 2 - (sumNoiseX / 2) * scale_ + currentSumNoiseX;
    }
  }
  for (let j = 0; j < aryNoiseXY_[0].length; j++) {
    let sumNoiseY = calc_sumNoiseY(aryNoiseXY_, j);
    let currentSumNoiseY = 0;
    for (let i = 0; i < aryNoiseXY_.length; i++) {
      noiseVal = pow(
        noise(aryNoiseXY_[i][j][0], aryNoiseXY_[i][j][1], aryNoiseXY_[i][j][2]),
        deg_
      );
      currentSumNoiseY += noiseVal * scale_;
      aryXY[i][j][1] = height / 2 - (sumNoiseY / 2) * scale_ + currentSumNoiseY;
    }
  }
  return aryXY;
}

function setupData() {
  temps = loadHourlyTemp();
  temps = [
    15.57, 19.57, 21.49, 21.11, 23.39, 24.05, 23.34, 23.62, 23.45, 22.34, 22.12,
    20.23, 16.23, 16.06, 14.86, 11.82, 11.71, 12.15, 9.55, 11.99, 10.99, 15.15,
    14.96, 14.79, 17.12, 19.37, 19.21, 22.82, 24.43, 25.02, 22.16, 25.44, 21.21,
    20.96, 20.07, 21.4, 18.98, 17.3, 15.28, 17.09, 11.51, 12.6, 11.47, 11.01,
    13.1, 13.11, 17.79, 16.58,
  ];
  mappedTemps = mapData(temps, 0.2);
  perceps = [
    0.26, 0.31, 0.14, 0.36, 0.44, 0.58, 0.21, 0.09, 0.09, 0.48, 0.1, 0.14, 0.14,
    0.2, 0.46, 0.14, 0.16, 0.16, 0.32, 0.27, 0.25, 0.49, 0.61, 0.05, 0.22, 0.28,
    0.13, 0.38, 0.25, 0.23, 0.36, 0.12, 0.27, 0.24, 0.52, 0.06, 0.24, 0.53,
    0.69, 0.04, 0.51, 0.56, 0.41, 0.36, 0.27, 0.31, 0.61, 0.4,
  ];
  mappedPerceps = mapPerceps(perceps, 0.06);
  wind = [
    5.18, 4.68, 5.09, 0.64, 7.52, 2.46, 1.28, 8.91, 2.62, 0.79, 2.76, 3.32, 4.5,
    1.63, 7.05, 5.11, 8.23, 3.87, 6.61, 1.39, 4.3, 2.56, 3.53, 7.26, 3.82, 6.93,
    1.85, 4.67, 6.76, 4.03, 0.58, 2.94, 3.18, 1.18, 4.48, 2.83, 2.28, 3.51,
    2.39, 3.91, 2.42, 2.35, 0.99, 3.9, 5.08, 2.15, 4.25, 5.17,
  ];
  mappedWind = mapData(wind, 0.1);
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
