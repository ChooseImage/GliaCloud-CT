let url = "https://coolors.co/fe9920-1e91d6-d87cac-f9b9c3-341b74";
let pallete;
let graphics;
let angles;
let xNum = 3;
let yNum = 1;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  print("url: ", url);
  angles = generate2DArray(xNum, yNum);

  graphics = createGraphics(width, height);
  graphics.colorMode(HSB, 360, 100, 100, 100);
  for (let i = 0; i < (width * height * 10) / 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(3);
    let h = random(3);
    graphics.fill(0, 0, 100, 1);
    graphics.noStroke();
    graphics.ellipse(x, y, w, h);
  }
}

function draw() {
  frameRate(0);
  background(0, 0, 90);
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
      push();
      translate(x, y);
      rotate(angles[j][i]);
      drawGradientArc(-d / 2, -d / 2, d * 2, 0, 90, pallete.concat(), i, j);
      pop();
    }
  }
  image(graphics, 0, 0);
}

function drawGradientArc(_x, _y, _d, angleA, angleB, colors, i, j) {
  console.log(colors);
  push();
  translate(_x, _y);
  let angleMin = min(angleA, angleA);
  let angleMax = max(angleA, angleB);
  let cNum = int(random(colors.length));
  let c = colors[cNum];
  colorMode(RGB);
  colors.splice(cNum, 1);

  let cANum = int(noise(colors.length));
  console.log("cANum:", cANum);
  let Red = noise(millis()) * 0.002 * 255;
  let cA = (Red, 40, 30);
  console.log("cA:", cA);
  colors.splice(cANum, 1);

  let cBNum = int(random(colors.length));
  let cB = colors[cBNum];
  colors.splice(cBNum, 1);
  for (let angle = angleMin; angle <= angleMax; angle += 0.3) {
    let x = (cos(angle) * _d) / 2;
    let y = (sin(angle) * _d) / 2;
    colorMode(HSB);
    let cc = lerpColor(
      color(120 + noise(millis() * 0.0001) * 360, 30, 80),
      color(-60 + noise(i, millis() * 0.0001) * 360, 90, 30),
      angle / abs(angleMax - angleMin)
    );
    stroke(cc);
    strokeWeight(2);
    line(x, y, 0, 0);
  }
  pop();
}

function createPallete(_url) {
  let slash_index = _url.lastIndexOf("/");
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split("-");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = "#" + arr[i];
  }
  console.log(arr);
  return arr;
}

function generate2DArray(x, y) {
  const possibleValues = [0, 90, 180, 270]; // Possible values for the array elements
  const outerArray = [];
  const numRows = y; // Number of sub-arrays
  const numCols = x; // Number of items in each sub-array

  for (let i = 0; i < numRows; i++) {
    const innerArray = [];
    for (let j = 0; j < numCols; j++) {
      const randomIndex = Math.floor(Math.random() * possibleValues.length); // Get a random index
      innerArray.push(possibleValues[randomIndex]); // Add the value at the random index to the sub-array
    }
    outerArray.push(innerArray); // Add the sub-array to the outer array
  }

  return outerArray;
}
