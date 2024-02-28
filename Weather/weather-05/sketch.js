let one = [];
let two = [];
let three = [];
let four = [];
let five = [];
let colors = ["#d4e09b", "#9cb380", "#94a89a", "#c7ac92", "#a44a3f"];
ones = 1.6;
twos = 1.2;
threes = 0.8;
fours = 0.4;
fives = 0.2;

function setup() {
  createCanvas(400, 400);
  for (let x = 50; x < 350; x++) {
    let y = 75 + sin(x / 20) * 8 + sin(x / 10) * 8;
    var point = {
      xer: x,
      yer: y,
    };
    one.push(point);
  }

  for (let x = 50; x < 350; x++) {
    let y = 135 + sin(x / 20) * 5 + sin(x / 12) * 9;
    var point = {
      xer: x,
      yer: y,
    };
    two.push(point);
  }

  for (let x = 50; x < 350; x++) {
    let y = 195 + sin(x / 6) * 5 + sin(x / 20) * 10;
    var point = {
      xer: x,
      yer: y,
    };
    three.push(point);
  }

  for (let x = 50; x < 350; x++) {
    let y = 255 + sin(x / 17) * 5 + sin(x / 10) * 10;
    var point = {
      xer: x,
      yer: y,
    };
    four.push(point);
  }

  for (let x = 50; x < 350; x++) {
    let y = 315 + sin(x / 5) * 3 + sin(x / 6) * 6;
    var point = {
      xer: x,
      yer: y,
    };
    five.push(point);
  }
}

function draw() {
  background("#f4f1de");

  //one
  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < one.length; i++) {
    vertex(one[i].xer, one[i].yer);
  }
  endShape();
  noStroke();
  fill(colors[0]);

  ellipse(
    one[150 + round(sin(ones) * 140)].xer,
    one[150 + round(sin(ones) * 140)].yer,
    25
  );
  ones += 0.01;

  //two
  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < two.length; i++) {
    vertex(two[i].xer, two[i].yer);
  }
  endShape();
  noStroke();
  fill(colors[1]);

  ellipse(
    two[150 + round(sin(twos) * 140)].xer,
    two[150 + round(sin(twos) * 140)].yer,
    25
  );
  twos += 0.01;

  //three

  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < three.length; i++) {
    vertex(three[i].xer, three[i].yer);
  }
  endShape();
  noStroke();
  fill(colors[2]);

  ellipse(
    three[150 + round(sin(threes) * 140)].xer,
    three[150 + round(sin(threes) * 140)].yer,
    25
  );
  threes += 0.01;

  //four
  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < four.length; i++) {
    vertex(four[i].xer, four[i].yer);
  }
  endShape();
  noStroke();
  fill(colors[3]);

  ellipse(
    four[150 + round(sin(fours) * 140)].xer,
    four[150 + round(sin(fours) * 140)].yer,
    25
  );
  fours += 0.01;

  //five
  stroke(100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (let i = 0; i < five.length; i++) {
    vertex(five[i].xer, five[i].yer);
  }
  endShape();
  noStroke();
  fill(colors[4]);

  ellipse(
    five[150 + round(sin(fives) * 140)].xer,
    five[150 + round(sin(fives) * 140)].yer,
    25
  );
  fives += 0.01;

  stroke(100);
  line(50, 73, 50, 317);
  line(350, 65, 350, 325);
  noStroke();
  fill(100);
  text("fig. 1.2", 20, 380);
}
