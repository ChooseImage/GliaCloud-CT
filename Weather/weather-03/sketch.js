// require https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js
let w = 800;
let h = 800;
let r = 270;
let n = 0;
let a = 0.1;
let d = 150;

function setup() {
  createCanvas(w, w);
  rectMode(CENTER);
  angleMode(DEGREES);
  background(0);
  translate(w / 2, w / 2);
  drawRects(a);
}

function drawRects(a) {
  while (n < 1000) {
    rotate(a);
    stroke(20, 13 * pow(n, 1.1), 255);
    strokeWeight(0.035 * sqrt(n));
    rect(0, 0, (w - d) / n);
    n += 0.03;
    noFill();
  }
}

function mouseReleased() {
  saveCanvas("myCanvas", "jpg");
}
