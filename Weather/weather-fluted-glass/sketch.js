let glassShader;
let font;
let txt = "sliced glass";
let motion = 1;
let txtColor = "#000000";
let bands = 45;
let distortion = 1.5;
// OPC.text({ name: "txt", label: "Text", value: "sliced glass" });
// OPC.slider({
//   name: "bands",
//   label: "Bands",
//   value: 45,
//   min: 5,
//   max: 120,
//   step: 1,
// });
// OPC.slider({
//   name: "distortion",
//   label: "Distortion",
//   value: 1.5,
//   min: 1,
//   max: 2,
//   step: 0.001,
// });
// OPC.color({ name: "txtColor", label: "Text Color", value: "#000000" });
// OPC.slider({
//   name: "motion",
//   label: "Motion",
//   value: 1,
//   min: 0,
//   max: 2,
//   step: 0.001,
// });

function preload() {
  // Prompt 700 Italic
  font = loadFont(
    "https://fonts.gstatic.com/s/prompt/v10/-W_6XJnvUD7dzB2KZeKka2MrUZEtdzow.ttf"
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  glassShader = createFilterShader(`
		precision highp float;
		
		varying vec2 vTexCoord;
  	uniform sampler2D tex0;
		
		uniform float bands;
		uniform float distortion;
		
		void main() {
			vec2 coord = vTexCoord;
			float cellCenter = (floor(coord.x * bands) + 0.5) / bands;
			coord.x = (coord.x - cellCenter) * distortion + cellCenter;
			gl_FragColor = texture2D(tex0, coord);
		}
	`);
}

function draw() {
  background(255);
  textSize(50);
  textFont(font);
  const w = (textWidth(txt) || 20) * 1.1;
  const h = textLeading();
  translate(sin(millis() * 0.001 * motion) * width * 0.05, 0);
  scale(min((width / w) * 0.8, height / h));
  noStroke();
  fill(txtColor);
  textAlign(CENTER, CENTER);
  text(txt, width / 2, height / 2);
  glassShader.setUniform("bands", bands);
  glassShader.setUniform("distortion", distortion);
  filter(glassShader);
}
