//Code by Aaron Reuland.
//for the #WccChallenge on the theme of 'obscure'
//Set off to make an abstracted stained glass window, because what is a stained glass window but an *obscured* window?
//When researching the last theme I had came across the painting 'The Cathedral' (Katedrála) by František Kupka.
//Taking that as inspiration I started making vaguely isometric shapes and built a palette based on a stained glass
//window I remembered from St. Giles cathedral in Edinburgh. Gradually, it has grown glitchier looking
//with a little recursion and blendmode mixing and happily gone a little further from the original inspiration.

let colors = [
  "#896026",
  "#896026",
  "#3789a5",
  "#c2b49b",
  "#ebe8e1",
  "#b3131e",
  "#313538",
  "#313538",
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  blendMode(MULTIPLY);
  background(255);
  noStroke();
  stroke(colors[3]);
  for (let i = 0; i < 3; i++) {
    let xadd = random(20, 180);
    for (let x = 0; x < width; x += xadd) {
      let facetChanger = floor(map(noise(x / 10 + i), 0, 1, 0, 2));
      let yadd = random(10, 350);
      for (let y = -100; y < height; y += yadd) {
        winFacet(x, y, xadd * 1.1, yadd, facetChanger, 0);
        yadd = random(10, 350);
      }
      xadd = random(20, 180);
    }
  }
}

function winFacet(x, y, w, h, uD, depth) {
  push();
  let filler = floor(
    map(noise(x / 300, y / 300, depth / 10), 0, 1, 0, colors.length)
  );
  fill(colors[filler]);
  strokeWeight((w + h) / 150);
  translate(x, y);
  if (uD == 0) {
    quad(
      0,
      0,
      cos(PI / 6) * w,
      sin(PI / 6) * w,
      cos(PI / 6) * w,
      sin(PI / 6) * w + h,
      0,
      h
    );
  } else {
    translate(0, w / 2);
    quad(
      0,
      0,
      cos(-PI / 6) * w,
      sin(-PI / 6) * w,
      cos(-PI / 6) * w,
      sin(-PI / 6) * w + h,
      0,
      h
    );
  }
  pop();

  let reflect = random();
  if (reflect < 0.6 && depth < 4) {
    push();
    blendMode(SOFT_LIGHT);
    for (let i = 0; i < 4; i++) {
      let sc = noise(x / 100, y / 100, i);
      let xer = noise(x / 100, i / 2);
      let yer = noise(y / 100, i / 2);
      winFacet(x + xer * w, y + yer * h, w * sc, h * sc, uD, depth + 1);
    }
    pop();
  }
}
