
// updated map() function for p5.js that supports all 
// kinds of easing!

// be sure to import this file in your index.html file
// for this to work

// via Manohar Vanga with a slight mod by Jeff Thompson
// https://sighack.com/post/easing-functions-in-processing
// https://github.com/sighack/easing-functions

// map2() function supports the following easing types
let Linear =      0;
let Quadratic =   1;
let Cubic =       2;
let Quartic =     3;
let Quintic =     4;
let Sinusoidal =  5;
let Exponential = 6;
let Circular =    7;
let Sqrt =        8;

// when the easing is applied (start, end, or both)
let IN =   0;
let OUT =  1;
let BOTH = 2;

// a map() replacement that allows for specifying easing curves
// with arbitrary exponents
function map2(value, start1, stop1, start2, stop2, type, when) {
  let b = start2;
  let c = stop2 - start2;
  let t = value - start1;
  let d = stop1 - start1;
  let p = 0.5;
  
  switch (type) {
  case 'Linear':
    return c*t/d + b;
  
  case 'Sqrt':
    if (when === IN) {
      t /= d;
      return c*pow(t, p) + b;
    } 
    else if (when === OUT) {
      t /= d;
      return c * (1 - pow(1 - t, p)) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2*pow(t, p) + b;
      return c/2 * (2 - pow(2 - t, p)) + b;
    }
    break;
  
  case 'Quadratic':
    if (when === IN) {
      t /= d;
      return c*t*t + b;
    } 
    else if (when === OUT) {
      t /= d;
      return -c * t*(t-2) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    }
    break;
  
  case 'Cubic':
    if (when === IN) {
      t /= d;
      return c*t*t*t + b;
    } 
    else if (when === OUT) {
      t /= d;
      t--;
      return c*(t*t*t + 1) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t + 2) + b;
    }
    break;
  
  case 'Quartic':
    if (when === IN) {
      t /= d;
      return c*t*t*t*t + b;
    } 
    else if (when === OUT) {
      t /= d;
      t--;
      return -c * (t*t*t*t - 1) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t*t + b;
      t -= 2;
      return -c/2 * (t*t*t*t - 2) + b;
    }
    break;
  
  case 'Quintic':
    if (when === IN) {
      t /= d;
      return c*t*t*t*t*t + b;
    } 
    else if (when === OUT) {
      t /= d;
      t--;
      return c*(t*t*t*t*t + 1) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2*t*t*t*t*t + b;
      t -= 2;
      return c/2*(t*t*t*t*t + 2) + b;
    }
    break;
  
  case 'Sinusoidal':
    if (when === IN) {
      return -c * cos(t/d * (PI/2)) + c + b;
    } 
    else if (when === OUT) {
      return c * sin(t/d * (PI/2)) + b;
    } 
    else if (when === BOTH) {
      return -c/2 * (cos(PI*t/d) - 1) + b;
    }
    break;
  
  case 'Exponential':
    if (when === IN) {
      return c * pow( 2, 10 * (t/d - 1) ) + b;
    } 
    else if (when === OUT) {
      return c * ( -pow( 2, -10 * t/d ) + 1 ) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return c/2 * pow( 2, 10 * (t - 1) ) + b;
      t--;
      return c/2 * ( -pow( 2, -10 * t) + 2 ) + b;
    }
    break;
  
  case 'Circular':
    if (when === IN) {
      t /= d;
      return -c * (sqrt(1 - t*t) - 1) + b;
    } 
    else if (when === OUT) {
      t /= d;
      t--;
      return c * sqrt(1 - t*t) + b;
    } 
    else if (when === BOTH) {
      t /= d/2;
      if (t < 1) return -c/2 * (sqrt(1 - t*t) - 1) + b;
      t -= 2;
      return c/2 * (sqrt(1 - t*t) + 1) + b;
    }
    break;
  }
  
  return 0;
}
