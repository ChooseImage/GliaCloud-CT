// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.js

//  Go start the video before anything...
//  https://www.youtube.com/watch?v=7vUDCZ6NePg


//  I've found a thread on Processing's forum 
//  with people discussing how to recreate the effect from Joy Division's album
//  https://discourse.processing.org/t/recreating-that-joy-division-album-cover/16444/5

//  Since I was having difficulty in understanding noise, 
//  I decided to play a bit myself


let x;
let f = 0;

function setup() {
  createCanvas(500, 500);
  fill(0, 17, 25);
  stroke(255);
  strokeWeight(1.8);
  noiseDetail(2, 0.5);
}

function draw() {
  background(0, 17, 25);
  f++; //this controlls wave velocity (frequency?)
  
  // I had to tweak the for loops to make it like the album cover
  // And limit the lines to the center
  for (let y = 150; y < height - 150; y +=4) {
    beginShape();
    for (x = 160 ; x < height - 160; x++) {
      
      // this was the original code
      // let joyDivision = y - 80 / (1 + pow(x - 150, 4) / 8e6) * noise(x / 30 + f / 50 + y);
      
      // but I needed the waves to be more contained
      let joyDivision = y - 40 / (1 + pow(x - 250, 4) / 5e5) * noise(x / 25  + f / 100+ y, f/20 * 0.01);
      
      // pow is a p5 function that facilitates exponential expressions
      // this first part is basically centralizing the wave between the straight lines
      // y - 40 / (1 + pow(x - 250, 4) / 5e5)
      
      // second part is the noise, which is controlling the wav
      // noise(x / 25  + f / 100+ y, f/20 * 0.01)
      // im using x and y coordinates since i figure it would make the waves look more "spaced"
      
      // I'm trying to figure out how to make the wave more spiky and distant
      // Not working
      
      vertex(x, joyDivision);
    }
    vertex(x, 1e4);
    endShape();
    
    // ok, you pretend you didn't see this.
    push();
    noStroke();
    rect(width - 170, height - 152, 25, 150);
    pop();
  }
}