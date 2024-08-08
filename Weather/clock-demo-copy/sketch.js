let _TEMPS = [
  27, 27, 26, 26, 26, 26, 26, 28, 30, 32, 33, 34, 35, 35, 36, 35, 34, 33, 32,
  30, 29, 29, 28, 28,
];
let _PRECIPS = [
  0.01, 0.01, 0.03, 0.07, 0.07, 0.11, 0.44, 0.44, 0.51, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
];
let animationStartTime = null;
let animationDelayStart = null;
let _TEMPLATE = 1;
let _BGCOLOR = "#FFF5F5";
let _MINUTE = 0;
let _CLOCKSIZE = 140;
let _CLOCKFADE = 1;
let _TEMPINNERSIZE = 20;
let _CLOCKSPEED = 18;
let _ANGLESTEP = 0.25;
let _GAP = 0.16;
let _EASINGSTRENGTH = 4;
let _TEMPRINGPOW = 1.14;
let _WIDTH = 400;
let _HEIGHT = 400;
let tempGraphic1, percepsGraphic1;
let timeLine;
const _Range = 11;

let temp = _TEMPS;

let perceps = _PRECIPS;

temp = temp.splice(12, 23);

//perceps = perceps.splice(12, 23);

let hourColor, minuteColor, secondColor;
let tempGraphic, clockGraphic;
let coldColor, hotColor;

function setup() {
  createCanvas(_WIDTH, _HEIGHT);

  minuteColor = color(148, 126, 176, 72);
  hourColor = color(148, 126, 176, 72);
  coldColor = color("#BCD9D7"); // blueish teal
  hotColor = color("#ff5050"); // red-orange
  tempGraphic1 = createGraphics(width, height);
  percepsGraphic1 = createGraphics(width, height);
  _TEMPLATE = 1;
}

function draw() {
  background(_BGCOLOR);
  noStroke();
  if (_TEMPLATE === 1) {
    drawClock(_WIDTH / 2, _HEIGHT / 2);
  }
  drawClimateRing(
    _WIDTH / 2,
    _HEIGHT / 2,
    140,
    tempGraphic1,
    percepsGraphic1,
    0,
    0,
    hotColor,
    coldColor
  );
  textAlign(CENTER, CENTER);
  animate();
}

function drawClock(x, y) {
  let m = map(_MINUTE, 0, 60, 0, TWO_PI) - HALF_PI;
  let h =
    map(hour(), 0, 12, 0, TWO_PI) -
    HALF_PI +
    map(_MINUTE, 0, 60, 0, TWO_PI) / 12;

  conicCircle(x, y, _CLOCKSIZE + 30, [minuteColor, coldColor], m);
  conicCircle(x, y, _CLOCKSIZE, [hourColor, coldColor], h);
}

function drawAlphaRing(
  cx,
  cy,
  innerRadius,
  startAngle,
  endAngle,
  percepsGraphic,
  timeLine
) {
  percepsGraphic.clear();
  percepsGraphic.angleMode(RADIANS);
  const radius = innerRadius - 16;
  let totalAngle = endAngle - startAngle;
  let numberOfSteps = Math.floor(totalAngle / (0.07 + radians(0.1)));
  let adjustedAngleStep = totalAngle / numberOfSteps;
  let easeInOutProgress = 1;
  if (_TEMPLATE === 1) {
    easeInOutProgress = animateAlphaRing(timeLine, _CLOCKSPEED);
  }
  const animatedEndAngle = map(easeInOutProgress, 0, 1, startAngle, endAngle);

  for (
    let angle = startAngle;
    angle <= endAngle;
    angle += adjustedAngleStep + radians(0.1)
  ) {
    let angleToTime = map(angle, startAngle, endAngle, 0, _Range);
    let percepItem = perceps[Math.round(angleToTime)];
    let amount = Math.round(map(percepItem, 0, 1, 0, 10));

    if (angle <= animatedEndAngle) {
      for (let i = 0; i < amount; i++) {
        let posX = cx + cos(angle) * (radius - i * 5);
        let posY = cy + sin(angle) * (radius - i * 5);
        const percepColor = color("#0057FF");
        percepColor.setAlpha(55 + i * 20);
        percepsGraphic.fill(percepColor);
        percepsGraphic.noStroke();
        percepsGraphic.circle(posX, posY, 2.74);
      }
    }
  }
  image(percepsGraphic, 0, 0);
}

function conicCircle(x, y, r, colors, angle) {
  const ctx = drawingContext;

  // Start angle for the gradient
  let startAngle = 0;

  try {
    const browserbrands = navigator.userAgentData.brands;
    if (
      browserbrands.find(
        (elm) => elm.brand.includes("Firefox") || elm.brand.includes("Safari")
      )
    ) {
      startAngle = angle;
    }
  } catch (e) {
    startAngle = angle;
  }

  // Create a conic gradient
  const gradient = ctx.createConicGradient(angle, x, y);

  function easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const easedT = easeOutCirc(t);
    const color1 = lerpColor(color(colors[0]), color(148, 126, 176, 0), easedT);
    gradient.addColorStop(1 - t * _CLOCKFADE, color1.toString());
  }

  ctx.fillStyle = gradient;
  ellipse(x, y, r, r);
  blendMode(BLEND);
}

function drawClimateRing(
  cx,
  cy,
  radius,
  tempGraphic,
  percepsGraphic,
  graphicBlur = 0,
  tempRingSize,
  colorHot,
  colorCold
) {
  let outerRadius = radius;
  let innerRadiusTemp = radius - _TEMPINNERSIZE; // Adjusted to remove gap

  push();
  translate(cx, cy);
  let easeInOutProgressGradient = 1;
  if (_TEMPLATE === 1) {
    easeInOutProgressGradient = animateGradientScale(timeLine, _CLOCKSPEED);
  }
  const scaleGradient = map(easeInOutProgressGradient, 0, 1, 2, 1);
  scale(scaleGradient);
  translate(-cx, -cy);
  drawGradientRing(
    cx,
    cy,
    innerRadiusTemp,
    -PI / 2,
    1.5 * PI - 0.01,
    colorHot,
    colorCold,
    tempGraphic,
    tempRingSize
  );
  pop();

  push();
  translate(cx, cy);
  let easeInOutProgressAlpha = 1;
  if (_TEMPLATE === 1) {
    easeInOutProgressAlpha = animateAlphaScale(timeLine, _CLOCKSPEED);
  }
  scale(easeInOutProgressAlpha);
  translate(-cx, -cy);
  drawAlphaRing(
    cx,
    cy,
    innerRadiusTemp,
    -PI / 2,
    1.5 * PI,
    percepsGraphic,
    timeLine
  );
  pop();
}

function drawGradientRing(
  cx,
  cy,
  innerRadius,
  startAngle,
  endAngle,
  startColor,
  endColor,
  tempGraphic,
  size
) {
  // Create a graphics buffer for the ring
  tempGraphic.clear();
  tempGraphic.angleMode(RADIANS);

  let totalAngle = endAngle - startAngle;
  let numberOfSteps = Math.floor(totalAngle / (_ANGLESTEP + radians(_GAP)));
  let adjustedAngleStep = totalAngle / numberOfSteps;

  const maxTemp = Math.max(...temp);
  const minTemp = Math.min(...temp);
  const R = size * Math.pow(maxTemp, _TEMPRINGPOW);
  let totalLength = R - innerRadius;
  totalLength = 50;

  for (let angle = startAngle; angle <= endAngle; angle += adjustedAngleStep) {
    let angleToTime = map(angle, startAngle, endAngle, 0, _Range);

    let tempItem = temp[Math.round(angleToTime)];

    let startX = cx + cos(angle) * innerRadius;
    let startY = cy + sin(angle) * innerRadius;

    const interval = PI / 6;
    const tolerance = interval * 0.05;
    if (
      Math.abs((angle % interval) - interval) > tolerance ||
      Math.abs(angle % interval) > tolerance
    ) {
      //totalLength *= 0.8;
    }

    let endX = startX + cos(angle) * totalLength;
    let endY = startY + sin(angle) * totalLength;

    let tempX = map(tempItem, minTemp, maxTemp, startX, endX);
    let tempY = map(tempItem, minTemp, maxTemp, startY, endY);
    let currentLength = dist(tempX, tempY, startX, startY);
    let easeInOutProgress = 1;
    if (_TEMPLATE === 1) {
      easeInOutProgress = animateGradientRing(timeLine, _CLOCKSPEED);
    }
    const animatedEndAngle = map(easeInOutProgress, 0, 1, startAngle, endAngle);
    if (angle <= animatedEndAngle) {
      drawUnit(
        tempGraphic,
        tempX,
        tempY,
        startX,
        startY,
        startColor,
        endColor,
        totalLength,
        currentLength,
        angle,
        tempItem,
        endX,
        endY
      );
    }
  }

  // Draw the blurred ring onto the main canvas
  image(tempGraphic, 0, 0);
}

function drawUnit(
  graphic,
  tempX,
  tempY,
  startX,
  startY,
  color1,
  color2,
  totalLength,
  currentLength,
  angle,
  tempItem,
  endX,
  endY
) {
  const step = 5;
  //text(currentLength.toString(), x1, y1);
  //beginShape();
  graphic.strokeWeight(0.5);
  graphic.stroke(color1);

  gradientLine(
    graphic,
    startX,
    startY,
    endX,
    endY,
    color2,
    color1,
    totalLength,
    currentLength
  );
  // graphic.line(
  //   startX,
  //   startY,
  //   startX + cos(angle) * totalLength,
  //   startY + sin(angle) * totalLength
  // );
  const fillColor = lerpColor(color2, color1, currentLength / totalLength);
  graphic.fill(fillColor);
  graphic.circle(tempX, tempY, 5);
  const textOffset = 30;
  graphic.noStroke();
  graphic.textAlign(CENTER, CENTER);
  graphic.fill(color1);
  graphic.textSize(14);
  // Define the interval (e.g., PI / 6 for every 30 degrees)
  const interval = PI / 6;
  const tolerance = interval * 0.05;

  // Check if the angle is close to a multiple of the interval within the full circle
  if (
    Math.abs((angle % interval) - interval) < tolerance ||
    Math.abs(angle % interval) < tolerance
  ) {
    graphic.fill(color("#B591E4"));
    graphic.text(
      tempItem.toString(),
      endX + cos(angle) * textOffset,
      endY + sin(angle) * textOffset
    );
  }
  graphic.noStroke();
  for (let stop = 0; stop < currentLength; stop += step) {
    let posX = lerp(tempX, startX, stop / currentLength);
    let posY = lerp(tempY, startY, stop / currentLength);
    //circle(posX, posY, 3);
  }
  // endShape();
  /*
      beginShape();
      for (x = offset; x < width - offset; x +=xStep) {
        a = noise(x_offset + x / width, y, noise(t)) * a_amp;
        b = noise(x_offset + x / width + y - t) * b_amp;
        let vx = x + sin(a | b) * (cos(a) - sin(x | y)) * 0;
        let vy = (constrain(tan(a % b), -1, 1) * yStep) / 4;
        let vn = map(vy - y, -yStep / 3, yStep / 3, 0, 1);
        let i = map(sin(vy / 5 + frameCount / 10 + vx / 50 + vn),-1,1,0,1)*colors.length/3;
        let n = int(i);
        let m = (n+1)%colors.length;
        let f = i%1;
        let c = lerpColor(colors[n],colors[m],f);
        strokeWeight(xStep);
        stroke(c);
        line(vx, y + vy, vx, y - vy);
      }
      endShape();
    */
}

function gradientLine(
  graphic,
  x1,
  y1,
  x2,
  y2,
  color1,
  color2,
  totalLength,
  currentLength
) {
  const ctx = graphic.drawingContext;
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  const white = "#ffffff";
  // Calculate the proportion of the current line length to the total length
  const proportion = currentLength / totalLength;

  //const endColor = lerpColor(color1, color2, proportion);
  let targetColor = lerpColor(color(color2), color(color1), proportion);
  gradient.addColorStop(0, color1.toString());
  gradient.addColorStop(1, color2.toString());

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x1, y1);
  ctx.stroke();
}

function animateGradientRing(timeLine, speed = 1, delay = 0) {
  if (!animationDelayStart) {
    animationDelayStart = timeLine;
  }

  if (timeLine - animationDelayStart < delay) {
    return 0; // Still in delay period, return initial state
  }

  if (!animationStartTime) {
    animationStartTime = timeLine - delay;
  }

  const animationDuration = 60000 / speed; // Duration in milliseconds
  const elapsedTime = timeLine - animationStartTime - delay;

  if (elapsedTime >= animationDuration) {
    return 1; // Animation complete, stay at the end
  }

  const progress = elapsedTime / animationDuration;
  return easeInOutQuad(progress, 1.2);
}

function animateGradientScale(timeLine, speed = 1, delay = 0) {
  if (!animationDelayStart) {
    animationDelayStart = timeLine;
  }

  if (timeLine - animationDelayStart < delay) {
    return 0; // Still in delay period, return initial state
  }

  if (!animationStartTime) {
    animationStartTime = timeLine - delay;
  }

  const animationDuration = 60000 / speed; // Duration in milliseconds
  const elapsedTime = timeLine - animationStartTime - delay;

  if (elapsedTime >= animationDuration) {
    return 1; // Animation complete, stay at the end
  }

  const progress = elapsedTime / animationDuration;
  return easeOutBack(progress, 1.2);
}

function animate() {
  timeLine = millis();
  if (_TEMPLATE === 1) {
    animateClock(timeLine, _CLOCKSPEED);
  }
}

function animateClock(timeLine, speed = 1, delay = 2000) {
  if (!animationDelayStart) {
    animationDelayStart = timeLine;
  }

  if (timeLine - animationDelayStart < delay) {
    _MINUTE = 0;
    _CLOCKFADE = 0;
    return; // Still in delay period, keep initial state
  }

  if (!animationStartTime) {
    animationStartTime = timeLine - delay;
  }

  const animationDuration = 60000 / speed; // Duration in milliseconds
  const elapsedTime = timeLine - animationStartTime - delay;

  if (elapsedTime >= animationDuration) {
    // Animation complete, stay at the end
    _MINUTE = 60;
    _CLOCKFADE = 1;
    return;
  }

  const progress = elapsedTime / animationDuration;
  const easeInOutProgress = easeInOutQuad(progress, _EASINGSTRENGTH);

  _MINUTE = map(easeInOutProgress, 0, 1, 0, 60);
  _CLOCKFADE = easeInOutProgress;
}

function easeOutBack(t, intensity = 1) {
  const c1 = 1.70158 * intensity;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function easeInOutQuad(t, strength = 2) {
  return t < 0.5
    ? Math.pow(2 * t, strength) / 2
    : 1 - Math.pow(2 * (1 - t), strength) / 2;
}

function animateAlphaScale(timeLine, speed = 1, delay = 0) {
  if (!animationDelayStart) {
    animationDelayStart = timeLine;
  }
  if (timeLine - animationDelayStart < delay) {
    return 0; // Still in delay period, return initial state
  }
  if (!animationStartTime) {
    animationStartTime = timeLine - delay;
  }
  const animationDuration = 60000 / speed; // Duration in milliseconds
  const elapsedTime = timeLine - animationStartTime - delay;
  if (elapsedTime >= animationDuration) {
    return 1; // Animation complete, stay at the end
  }
  const progress = elapsedTime / animationDuration;
  return easeOutBack(progress, 1.2);
}

function animateAlphaRing(timeLine, speed = 1, delay = 0) {
  if (!animationDelayStart) {
    animationDelayStart = timeLine;
  }
  if (timeLine - animationDelayStart < delay) {
    return 0; // Still in delay period, return initial state
  }
  if (!animationStartTime) {
    animationStartTime = timeLine - delay;
  }
  const animationDuration = 60000 / speed; // Duration in milliseconds
  const elapsedTime = timeLine - animationStartTime - delay;
  if (elapsedTime >= animationDuration) {
    return 1; // Animation complete, stay at the end
  }
  const progress = elapsedTime / animationDuration;
  return easeInOutQuad(progress, 1.2);
}

function keyPressed() {
  if (key === "k" || key === "K") {
    saveCanvas("myCanvas", "png");
    console.log("Canvas saved as PNG");
  }
}
