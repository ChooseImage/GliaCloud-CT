var cloud;

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
