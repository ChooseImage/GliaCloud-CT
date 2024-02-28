//for weekly Creative Coding Challenge-- https://openprocessing.org/curation/78544 on theme of "Single Hue"
//Don't have a lot of commentary on the artistic process this time so
//decided to add lots of comments in the code to try to make it more legible.

//colors array is array of hues and saturations- 'theColor' variable below chooses from array,
//weighted towards the blues of my favorite coffee mug
colors = [
  [198, 64],
  [198, 64],
  [198, 64],
  [193, 100],
  [193, 100],
  [193, 100],
  [88, 19],
  [33, 93],
  [355, 32],
];
let theColor;
let texture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  theColor = random(colors);
  colorMode(HSB);
  noStroke();

  //texture-- noise with a bit randomness thrown in, pixel array of buffer,
  //which is rendered once in setup and drawn over canvas every frame at the end of draw
  texture = createGraphics(windowWidth, windowHeight);
  texture.pixelDensity(1);
  texture.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y += floor(random(0, 3))) {
      var index = (x + y * width) * 4;
      let avalue = map(noise(x / 100, y / 100), -1, 1, 0, 60);
      texture.pixels[index + 0] = 0;
      texture.pixels[index + 1] = 0;
      texture.pixels[index + 2] = 0;
      texture.pixels[index + 3] = avalue;
    }
  }
  texture.updatePixels();
}

function draw() {
  background(theColor[0], theColor[1], 10);

  //thetaOff variable adds an offset so that the different shapes (drawn w 'blib' function  below)
  //are offset from each other in a pleasing way
  thetaOff = 0;
  for (let y = -100; y < height + 100; y += 75) {
    thetaOff += 1;
    for (let x = -150; x < width + 150; x += 350) {
      thetaOff -= 3;
      blib(x, y, thetaOff);
    }
  }
  //drawing the pre-rendered texture
  image(texture, 0, 0);
}

//'blib' function takes an x/y position, and a 'theta' which allows
//the shapes to be in a different place in the sine wave that defines the size of the ellipses
//note: no shapes are actually moving, they are merely changing size
function blib(x, y, theta) {
  push();
  translate(x, y);
  for (let i = 0; i < TAU; i += TAU / 22) {
    //yer moves the shapes up as we iterate through the sine wave
    let yer = map(i, 0, TAU, 0, -200);
    //bright changes the brightness of HSB color as we iterate
    bright = map(i, 0, TAU, 10, 100);

    //setting the saturation of the HSB color, desaturating towards the top, so that we get closer to white
    if (bright > 60) {
      sat = map(bright, 60, 100, theColor[1], 0);
    } else {
      sat = theColor[1];
    }

    //'size' sets the size of the ellipses according to it's place in the sine wave
    // as defined by it's thetaOffset, plus iteration plus slowed down frameCount
    //Also, sizeScaler scales the changes up and down, you can uncomment line 80 to see what sizeScaler does
    let size = map(sin(theta + i - frameCount / 30), -1, 1, 10, 200);
    let sizeScaler = map(i, 0, TAU, 2, 0.1);
    //	sizeScaler=1
    //fill is Hue- defined by 'theColor' variable, Saturation by the adjusted saturation
    //in sat variable and brightness from dark to light by iteration
    fill(theColor[0], sat, bright);

    //ellipse sized by the above variables
    ellipse(0, yer, size * sizeScaler, (size / 2) * sizeScaler);
  }
  pop();
}
