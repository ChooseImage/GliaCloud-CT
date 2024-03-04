// require https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js
// require https://cdn.jsdelivr.net/npm/p5@1.4.0/lib/p5.min.js
const warmIrridescence = [
  "#82127e",
  "#1e396c",
  "#d51d67",
  "#ed8e07",
  "#d73a2a",
  "#291a2c",
];
const warmAndFelty = ["#1587b3", "#51cee7", "#f889b9", "#ee390c", "#2c0505"];
const pane = new Tweakpane.Pane();
let img;
let buildingX, buildingY, buildingW, buildingD, Building;

function preload() {
  img = loadImage(
    "https://raw.githubusercontent.com/ChooseImage/CompForm22/main/Featured/brut_gen/grain3.jpg"
  );
}

let w = 800;
let h = 800;
let woff = w * 0.1;
let hoff = h * 0.06;
let off = 0.24;

// front building
let x1 = 400;
let y1 = 400;
let w1 = 120;
let d1 = 100;

// rear building
let x2 = 400;
let y2 = 400;
let w2 = 120;
let d2 = 100;

let xGap = 10;
let yGap = 10;
let sizeX = 200;
let sizeY = 30;
let sizeZ = 80;

let numCols;
let numRows;

let winSize = 8;

// Tweakpane params

const PARAMS = {
  Grain: 152,
  backGroundColor: "#7878cf",
  squareColor: "#485b58",
  BuildingColor: "#1e396c",
  BridgeColor: "#939a81",
  WindowColor: "#698ae3",
  Shadow: 80,

  Perspective: 0.33,

  AposX: 145,
  AHeight: 18,
  Awidth: 127,
  Adepth: 85.36,

  BposX: 350.0,
  BHeight: 362.08,
  Bwidth: 231.04,
  Bdepth: 214.24,

  Bridges: 2,
  BridgeGap: 45,

  AWindowSize: 21.76,
  AWindowRows: 20,
  AWindowColumns: 3,
  AWindowsPosX: 1,
  AWindowsPosY: 19.9,

  BWindowSize: 13.07,
  BWindowRows: 27,
  BWindowColumns: 15,
  BWindowsPosX: 7,
  BWindowsPosY: 104.66,
};

const color = pane.addFolder({
  title: "Colors",
  expanded: false,
});

const buildA = pane.addFolder({
  title: "Building A",
  expanded: false,
});

const buildB = pane.addFolder({
  title: "Building B",
  expanded: false,
});

const bridges = pane.addFolder({
  title: "Bridges",
  expanded: false,
});

function setup() {
  createCanvas(w, h);

  buildingX = map(random(), 0, 1, 100, 600);
  buildingY = map(random(), 0, 1, 150, 550);
  buildingW = map(random(), 0, 1, 130, 200);
  buildingD = buildingW * random(0.8, 1.2);
  Building = {
    x: buildingX,
    y: buildingY,
    w: buildingW,
    d: buildingD,
    windowType: "test",
    windowW: 40,
    windowH: 126,
  };

  color.addInput(PARAMS, "Grain", {
    min: 0,
    max: 255,
  });

  color.addInput(PARAMS, "backGroundColor", {
    view: "color",
  });

  color.addInput(PARAMS, "squareColor", {
    view: "color",
  });

  color.addInput(PARAMS, "BuildingColor", {
    view: "color",
  });

  color.addInput(PARAMS, "BridgeColor", {
    view: "color",
  });

  color.addInput(PARAMS, "WindowColor", {
    view: "color",
  });

  color.addInput(PARAMS, "Shadow", {
    min: 0,
    max: 100,
  });

  pane.addInput(PARAMS, "Perspective", {
    min: 0,
    max: 0.85,
  });

  const btn = pane.addButton({
    title: "Save Image",
  });

  btn.on("click", () => {
    save("Bru-gen" + hour() + minute() + second() + ".jpg");
  });

  buildA.addInput(PARAMS, "AposX", {
    min: 100,
    max: 210,
  });

  buildA.addInput(PARAMS, "AHeight", {
    min: 5,
    max: 300,
  });
  buildA.addInput(PARAMS, "Awidth", {
    min: 70,
    max: 150,
  });
  buildA.addInput(PARAMS, "Adepth", {
    min: 80,
    max: 150,
  });

  buildB.addInput(PARAMS, "BposX", {
    min: 350,
    max: 450,
  });
  buildB.addInput(PARAMS, "BHeight", {
    min: 50,
    max: 400,
  });
  buildB.addInput(PARAMS, "Bwidth", {
    min: 90,
    max: 450,
  });
  buildB.addInput(PARAMS, "Bdepth", {
    min: 100,
    max: 350,
  });

  bridges.addInput(PARAMS, "Bridges", {
    step: 1,
    min: 0,
    max: 6,
  });

  bridges.addInput(PARAMS, "BridgeGap", {
    min: 45,
    max: 180,
  });

  buildA.addInput(PARAMS, "AWindowSize", {
    min: 0,
    max: 50,
  });

  buildA.addInput(PARAMS, "AWindowRows", {
    step: 1,
    min: 0,
    max: 200,
  });

  buildA.addInput(PARAMS, "AWindowColumns", {
    step: 1,
    min: 0,
    max: 9,
  });

  buildA.addInput(PARAMS, "AWindowsPosX", {
    step: 1,
    min: 1,
    max: 60,
  });
  buildA.addInput(PARAMS, "AWindowsPosY", {
    min: 0,
    max: 600,
  });

  buildB.addInput(PARAMS, "BWindowSize", {
    min: 0,
    max: 50,
  });

  buildB.addInput(PARAMS, "BWindowRows", {
    step: 1,
    min: 0,
    max: 80,
  });

  buildB.addInput(PARAMS, "BWindowColumns", {
    step: 1,
    min: 0,
    max: 200,
  });

  buildB.addInput(PARAMS, "BWindowsPosX", {
    step: 1,
    min: 1,
    max: 60,
  });
  buildB.addInput(PARAMS, "BWindowsPosY", {
    min: 0,
    max: 600,
  });
}

function draw() {
  //rect(0,0,w,h);

  translate(100, 100);

  push();
  off = PARAMS.Perspective;
  background(PARAMS.backGroundColor);
  //drawUnit(buildingX, buildingY, buildingW, buildingD);
  drawUnit(Building);
  // Building = {
  //   x: buildingX,
  //   y: buildingY,
  //   w: buildingW,
  //   d: buildingD,
  //   windowW: 40,
  //   windowH: 30,
  // };
  drawWindows(Building);
  //drawStuff();
  blendMode(SOFT_LIGHT);
  tint(255, PARAMS.Grain);
  image(img, -200, -200); //Load grain img with 50% opacity
  pop();
}

function drawStuff() {
  let outofBoundsA = PARAMS.Awidth < PARAMS.AWindowSize * PARAMS.AWindowColumns;
  let outofBoundsB = PARAMS.Bwidth < PARAMS.BWindowSize * PARAMS.BWindowColumns;

  fill(PARAMS.squareColor);
  noStroke();
  rect(0, 0, 600);

  off = PARAMS.Perspective;

  //Rear
  drawUnit(PARAMS.BposX, PARAMS.BHeight, PARAMS.Bwidth, PARAMS.Bdepth);

  // BRIDGES
  howManyBridge(PARAMS.Bridges, PARAMS.BridgeGap);

  //Front
  drawUnit(PARAMS.AposX, PARAMS.AHeight, PARAMS.Awidth, PARAMS.Adepth);

  numCols = 100;
  numRows = 200;
  winSize = 20;

  if (!outofBoundsB) {
    makeWindow(
      PARAMS.BposX,
      PARAMS.BHeight,
      PARAMS.BWindowColumns,
      PARAMS.BWindowRows,
      PARAMS.BWindowSize,
      1,
      PARAMS.BWindowsPosX,
      PARAMS.BWindowsPosY
    );
  } else return;

  if (!outofBoundsA) {
    makeWindow(
      PARAMS.AposX,
      PARAMS.AHeight,
      PARAMS.AWindowColumns,
      PARAMS.AWindowRows,
      PARAMS.AWindowSize,
      1,
      PARAMS.AWindowsPosX,
      PARAMS.AWindowsPosY
    );
  } else return;
}

function howManyBridge(n, d) {
  if (n === 0) {
    return;
  } else if (n === 1) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
  } else if (n === 2) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d, sizeX, sizeY, sizeZ);
  } else if (n === 3) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 2, sizeX, sizeY, sizeZ);
  } else if (n === 4) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 2, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 3, sizeX, sizeY, sizeZ);
  } else if (n === 5) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 2, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 3, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 4, sizeX, sizeY, sizeZ);
  } else if (n === 6) {
    drawLink(x1, y1, xGap, yGap, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 2, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 3, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 4, sizeX, sizeY, sizeZ);
    drawLink(x1, y1, xGap, yGap + d * 5, sizeX, sizeY, sizeZ);
  }
}

function drawUnit(building) {
  let h1 = h;
  noStroke();
  let X1, X2, Y1, Y2, Y3, Y4;
  X1 = building.x;
  X2 = building.x + building.w;
  Y1 = building.y;
  Y2 = height;
  Y3 = height;
  Y4 = building.y + building.w * off;

  // RIGHT FACING SIDE

  fill(PARAMS.BuildingColor);

  beginShape();
  vertex(X1, Y1); // TOP LEFT
  vertex(X1, Y2); // BOT LEFT
  vertex(X2, Y3); // BOT RIGHT
  vertex(X2, Y4); // TOP RIGHT
  endShape();

  // LEFT FACING SIDE

  let I1, I2, J1, J2, J3, J4;
  //console.log(Y3);
  I1 = building.x;
  I2 = building.x - building.d;
  J1 = building.y;
  J2 = height;
  J3 = height;
  J4 = building.y + building.d * off;

  //push();
  fill(PARAMS.BuildingColor);

  beginShape();
  vertex(I1, J1);
  vertex(I1, J2);
  vertex(I2, J3);
  vertex(I2, J4);
  endShape();
  //pop();

  push();
  fill(0, PARAMS.Shadow);

  beginShape();
  vertex(I1, J1);
  vertex(I1, J2);
  vertex(I2, J3);
  vertex(I2, J4);
  endShape();
  pop();
}

function drawLink(x, y, xGap, yGap, sizeX, sizeY, sizeZ) {
  fill(PARAMS.BridgeColor);
  x = PARAMS.BposX;

  // RIGHT FACING SIDE

  let newX = x - xGap;
  let newY = y + yGap + sizeY;

  let U1, U2, V1, V2, V3, V4;

  U1 = x - xGap;
  U2 = U1 - sizeX;
  V1 = y + yGap + sizeY;
  V2 = y + yGap;
  V3 = y + yGap - sizeX * off;
  V4 = y + yGap + sizeY - sizeX * off;

  beginShape();
  vertex(U1, V1); // BOT RIGHT
  vertex(U1, V2); // TOP RIGHT
  vertex(U2, V3); // TOP LEFT
  vertex(U2, V4); // BOT LEFT
  endShape();

  // DOWN FACING SIDE

  let N1, N2, N3, N4, M1, M2, M3, M4;

  fill(PARAMS.BridgeColor);

  N1 = x - xGap;
  N2 = x - xGap - sizeZ;
  N3 = x - xGap - sizeX - sizeZ;
  N4 = x - xGap - sizeX;
  M1 = y + yGap + sizeY;
  M2 = y + yGap + sizeY + sizeZ * off;
  M3 = y + yGap + sizeY - sizeX * off + sizeZ * off;
  M4 = y + yGap + sizeY - sizeX * off;

  beginShape();
  vertex(N1, M1); // TOP RIGHT
  vertex(N2, M2); // BOT RIGHT
  vertex(N3, M3); // BOT LEFT
  vertex(N4, M4); // TOP LEFT
  endShape();

  push();
  fill(0, PARAMS.Shadow);
  beginShape();
  vertex(N1, M1); // TOP RIGHT
  vertex(N2, M2); // BOT RIGHT
  vertex(N3, M3); // BOT LEFT
  vertex(N4, M4); // TOP LEFT

  endShape();
  pop();
}

function makeWindow(x, y, numCols, numRows, winSize, margin, firstCol, offY) {
  let winEdgeX = margin;
  let winEdgeY = offY;

  //print(outofBounds);

  push();
  fill(PARAMS.WindowColor);
  noStroke();
  //stroke(200);
  for (let col = firstCol; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      let u1, o1, u2, o2, o3, o4;

      u1 = x + winEdgeX + winSize * col;
      o1 = y + winEdgeY + winSize * row + winSize * col * off;
      u2 = u1 + winSize;
      o2 = o1 + winSize;
      o4 = o1 + winSize * off;
      o3 = o4 + winSize;

      beginShape();
      vertex(u1, o1);
      vertex(u1, o2 - margin);
      vertex(u2 - margin, o3 - margin);
      vertex(u2 - margin, o4);
      endShape();
    }
  }
  pop();
}

function drawWindows(building) {
  let margin = building.windowW * 0.2;
  let winEdgeX = margin;
  let winEdgeY = margin;

  const left = building.windowType === "both" || building.windowType === "left";
  const right =
    building.windowType === "both" || building.windowType === "right";
  const test = building.windowType === "test";

  fill(PARAMS.WindowColor);
  noStroke();
  stroke(200);
  const numColsR = building.w / building.windowW;
  const numColsL = building.d / building.windowW;
  const windowRwidth = building.windowW;
  const windowLwidth = (building.windowW * building.d) / building.w;

  // test
  // beginShape();
  // vertex(u1, o1);
  // vertex(u1, o2 - margin);
  // vertex(u2 - margin, o3 - margin);
  // vertex(u2 - margin, o4);
  // endShape();

  // HERE FUCKO
  // u1 = x+winEdgeX+winSize*col;
  // u2 = u1+winSize;

  // o1 = y+winEdgeY+winSize*row+winSize*col*off;
  // o2 = o1+winSize;
  // o4 = o1+winSize*off;
  // o3 = o4+winSize;

  // beginShape();
  // vertex(u1,o1);
  // vertex(u1,o2-margin);
  // vertex(u2-margin,o3-margin);
  // vertex(u2-margin,o4);
  // endShape();
  const testA = 50;
  const testW = 50;
  const testH = 100;
  margin = 10;
  if (test) {
    push();
    for (let col = 0; col < 2; col++) {
      for (let row = 0; row < 2; row++) {
        //let u1, o1, u2, o2, o3, o4;
        const u1 = building.x + winEdgeX + testA * col;
        const u2 = u1 + testA;

        const o1 = building.y + winEdgeY + testA * row + testA * col * off;
        const o2 = o1 + testA;
        const o4 = o1 + testA * off;
        const o3 = o4 + testA;

        beginShape();
        vertex(u1, o1);
        vertex(u1, o2 - margin);
        vertex(u2 - margin, o3 - margin);
        vertex(u2, o4);
        endShape();
      }
    }
    pop();
  }

  // RIGHT FACING SIDE
  if (right) {
    push();
    for (let col = 0; col < numColsR - 1; col++) {
      for (let row = 0; row < 40; row++) {
        let u1, o1, u2, o2, o3, o4;
        u1 = building.x + winEdgeX + windowRwidth * col;
        o1 =
          building.y + winEdgeY + windowRwidth * row + windowRwidth * col * off;
        u2 = u1 + windowRwidth;
        o2 = o1 + building.windowH;
        o4 = o1 + windowRwidth * off;
        o3 = o4 + building.windowH;
        beginShape();
        vertex(u1, o1);
        vertex(u1, o2);
        vertex(u2 - margin * off, o3);
        vertex(u2 - margin * off, o4);
        endShape();
      }
    }
    pop();
  }

  // LEFT FACING SIDE
  if (left) {
    push();
    for (let col = 0; col < numColsL - 1; col++) {
      for (let row = 0; row < 40; row++) {
        let u1, o1, u2, o2, o3, o4;

        u1 = building.x - winEdgeX - windowLwidth * col;
        o1 =
          building.y + winEdgeY + windowLwidth * row + windowLwidth * col * off;
        u2 = u1 - windowLwidth;
        o2 = o1 + building.windowH;
        o4 = o1 + windowLwidth * off;
        o3 = o4 + building.windowH;

        beginShape();
        vertex(u1, o1);
        vertex(u1, o2);
        vertex(u2 + margin * off, o3);
        vertex(u2 + margin * off, o4);
        endShape();
      }
    }
    pop();
  }
}

// function mouseReleased() {
//   save('Brut_gen' + hour() + minute() + second() + '.jpg')
// }

/*
        const x1 = winW * col + windowMargin;
        const x2 = x1 + winW - windowMargin;
              
        const yOffset = isRight ? lerp( 0, shift, x1/wallWidth ) : lerp( shift, 0, x1/wallWidth );
        const yOffset2 = isRight ? lerp( 0, shift, x2/wallWidth ) : lerp( shift, 0, x2/wallWidth );
    
        const y1 = -buildingH + yOffset + winH * row + windowMargin;
        const y2 = y1 + winH - windowMargin;
        const y4 = -buildingH + yOffset2 + winH * row + windowMargin;
        const y3 = y4 + winH - windowMargin;
*/
