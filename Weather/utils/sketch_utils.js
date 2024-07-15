class Easing {
  static easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
  }

  static easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
  }

  static easeInOutSine(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }

  static easeInQuad(x) {
    return x * x;
  }

  static easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  static easeInOutQuad(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }

  static easeInCubic(x) {
    return x * x * x;
  }

  static easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  static easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  static easeInQuart(x) {
    return x * x * x * x;
  }

  static easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
  }

  static easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
  }

  static easeInQuint(x) {
    return x * x * x * x * x;
  }

  static easeOutQuint(x) {
    return 1 - Math.pow(1 - x, 5);
  }

  static easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  static easeInExpo(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  }

  static easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  static easeInOutExpo(x) {
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? Math.pow(2, 20 * x - 10) / 2
      : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }

  static easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  }

  static easeOutCirc(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  }

  static easeInOutCirc(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  static easeInBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * x * x * x - c1 * x * x;
  }

  static easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  }

  static easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }
  static easeInElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }

  static easeOutElastic(x) {
    const c4 = (2 * Math.PI) / 3;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  static easeInOutElastic(x) {
    const c5 = (2 * Math.PI) / 4.5;
    return x === 0
      ? 0
      : x === 1
      ? 1
      : x < 0.5
      ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
  }

  static easeInBounce(x) {
    return 1 - Easing.easeOutBounce(1 - x);
  }

  static easeOutBounce(x) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) {
      return n1 * x * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  }

  static easeInOutBounce(x) {
    return x < 0.5
      ? (1 - Easing.easeOutBounce(1 - 2 * x)) / 2
      : (1 + Easing.easeOutBounce(2 * x - 1)) / 2;
  }
}
const chromotome = {
  palettes: [
    { colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FAD02E", "#5D5D5A"] },
    { colors: ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"] },
    { colors: ["#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#EF476F"] },
    { colors: ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"] },
    { colors: ["#588B8B", "#FFFFFF", "#FFD5C2", "#F28F3B", "#C8553D"] },
  ],
  get: function () {
    return this.palettes[Math.floor(Math.random() * this.palettes.length)];
  },
};

function drawArm() {
  push();
  translate(width / 2, height / 2);
  rotate(-PI / 2);
  translate(-width / 2, -height / 2);
  randomSeed(frameCount / 200);
  let n = int(random(8, 13));
  t += 1 / 100;
  let offset = width / 10;
  let yStep = int((height - offset * 2) / n);
  let xStep = map(n, 5, 12, 1, 4);
  noFill();
  //for (y = offset + yStep / 2; y <= height - offset - yStep / 2; y += yStep) {
  let x = 0;
  let y = 0;
  let colors = shuffle(palette.concat());
  let x_offset = random(width, width * 5);
  let a_amp = random(10, 150);
  let b_amp = random(10, 150);
  let dir = random() > 0.5 ? -1 : 1;
  beginShape();
  for (x = offset; x < width - offset; x += xStep) {
    a = noise(x_offset + x / width, y, noise(t)) * a_amp;
    b = noise(x_offset + x / width + y - t) * b_amp;
    let vx = x + sin(a | b) * (cos(a) - sin(x | y)) * 0;
    let vy = (constrain(tan(a % b), -1, 1) * yStep) / 4;
    let vn = map(vy - y, -yStep / 3, yStep / 3, 0, 1);
    let i =
      (map(sin(vy / 5 + frameCount / 100 + vx / 50 + vn), -1, 1, 0, 1) *
        colors.length) /
      3;
    let n = int(i);
    let m = (n + 1) % colors.length;
    let f = i % 1;
    let c = lerpColor(colors[n], colors[m], f);
    strokeWeight(xStep);
    stroke(c);
    line(vx, y + vy, vx, y - vy);
  }
  endShape();
  //}
  pop();
}

function showFPS() {
  currentFPS = round(frameRate(), 2);
  fill(255);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text("FPS: " + currentFPS, 10, 10);
}
