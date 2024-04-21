let url = "https://coolors.co/fe9920-1e91d6-d87cac-f9b9c3-341b74";
const pane = new Tweakpane.Pane();
let pallete;
let graphics;
let angles, visibility;
let xNum = 3;
let yNum = 1;
[xNum, yNum] = [10, 7];
let forecast = [21, 25, 0.7]; // time, temp, humidity;
let forecastColors;
const warmIrridescence = [
  "#82127e",
  "#1e396c",
  "#d51d67",
  "#ed8e07",
  "#d73a2a",
  "#291a2c",
];

const tempColor = ["#C62B01", "#3DD6D0"]; // hot, cold
const sunlighColor = ["#FFFB84", "#1B0034"]; // sunny, cloudy
const humidityColor = ["#DCA100", "#1000C6"]; // dry, humid

const PARAMS = {
  Time: 0,
};

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  angleMode(DEGREES);
  angles = generate2DArray(xNum, yNum, [0, 90, 180, 270], "selection");
  visibility = generate2DArray(xNum, yNum, [true, false], "noise");

  graphics = createGraphics(width, height);
  for (let i = 0; i < (width * height * 10) / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 1);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }

  // Pane
  pane.addInput(PARAMS, "Time", {
    min: 0,
    max: 23,
  });
}

function draw() {
  frameRate(24);
  background(0, 0, 90);
  forecast = [PARAMS.Time, 25, 0.7]; // time, temp, humidity
  forecastColors = setColors(forecast);
  pallete = createPallete(url);

  let offset = 20;
  let margin = 0;

  let cellsX = int(random(4, 12));
  let cellsY = int(cellsX * 0.75);
  cellsX = xNum;
  cellsY = yNum;
  let d = (width - offset * 2 - margin * (cellsX - 1)) / cellsX;

  for (let j = 0; j < cellsY; j++) {
    for (let i = 0; i < cellsX; i++) {
      let x = offset + i * (d + margin) + d / 2;
      let y = offset + j * (d + margin) + d / 2;
      if (visibility[j][i] === false) continue;
      push();
      translate(x, y);
      rotate(angles[j][i]);
      drawGradientArc(-d / 2, -d / 2, d * 2, 0, 90, forecastColors, i, j);
      pop();
    }
  }
  image(graphics, 0, 0);
}

function drawGradientArc(_x, _y, _d, angleA, angleB, colors, i, j) {
  push();
  translate(_x, _y);
  let angleMin = min(angleA, angleA);
  let angleMax = max(angleA, angleB);

  for (let angle = angleMin; angle <= angleMax; angle += 0.3) {
    let x = (cos(angle) * _d) / 2;
    let y = (sin(angle) * _d) / 2;
    colorMode(HSB);
    let cc = lerpColor(
      color(colors[0]),
      color(colors[1]),
      angle / abs(angleMax - angleMin)
    );
    cc = colors[0];
    stroke(cc);
    strokeWeight(2);
    line(x, y, 0, 0);
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
    map(abs((colors[0] - 14) % 24), 0, 23, 1, 0)
  );
  const HumidityColor = lerpColor(
    color(humidityColor[0]),
    color(humidityColor[1]),
    map(colors[2], 0, 1, 0, 1)
  );
  return [TempColor, SunlighColor, HumidityColor];
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = "#" + arr[i];
  }
  return arr;
}

function generate2DArray(x, y, possibleValues, type) {
  const outerArray = [];
  const numRows = y; // Number of sub-arrays
  const numCols = x; // Number of items in each sub-array

  if (type === "selection") {
    for (let i = 0; i < numRows; i++) {
      const innerArray = [];
      for (let j = 0; j < numCols; j++) {
        const randomIndex = Math.floor(Math.random() * possibleValues.length); // Get a random index
        innerArray.push(possibleValues[randomIndex]); // Add the value at the random index to the sub-array
      }
      outerArray.push(innerArray); // Add the sub-array to the outer array
    }
  } else if (type === "noise") {
    for (let i = 0; i < numRows; i++) {
      const innerArray = [];
      for (let j = 0; j < numCols; j++) {
        const visibility = noise(i, j) > 0.4;
        innerArray.push(visibility ? true : false);
      }
      outerArray.push(innerArray);
    }
  }

  return outerArray;
}
