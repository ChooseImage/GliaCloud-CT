/*

__/\\\\\\\\\\\\\____/\\\_________________/\\\\\\\\\_____/\\\\\\\\\\\__/\\\\\_____/\\\_        
 _\/\\\/////////\\\_\/\\\_______________/\\\\\\\\\\\\\__\/////\\\///__\/\\\\\\___\/\\\_       
  _\/\\\_______\/\\\_\/\\\______________/\\\/////////\\\_____\/\\\_____\/\\\/\\\__\/\\\_      
   _\/\\\\\\\\\\\\\/__\/\\\_____________\/\\\_______\/\\\_____\/\\\_____\/\\\//\\\_\/\\\_     
    _\/\\\/////////____\/\\\_____________\/\\\\\\\\\\\\\\\_____\/\\\_____\/\\\\//\\\\/\\\_    
     _\/\\\_____________\/\\\_____________\/\\\/////////\\\_____\/\\\_____\/\\\_\//\\\/\\\_   
      _\/\\\_____________\/\\\_____________\/\\\_______\/\\\_____\/\\\_____\/\\\__\//\\\\\\_  
       _\/\\\_____________\/\\\\\\\\\\\\\\\_\/\\\_______\/\\\__/\\\\\\\\\\\_\/\\\___\//\\\\\_ 
        _\///______________\///////////////__\///________\///__\///////////__\///_____\/////__
                                                                                                                     
Made by Anatolii Babii
https://antlii.work

PLAIN Generator is an interactive web-based tool,
that utilizes 3D space environment and Simplex noise algorithms
to generate various abstract graphics animations with the possibility
to capture and save graphics as animation loops and image stills
directly from the program.

Instruction:

Use a mouse/touchpad to navigate and interact with the 3D canvas.

To quickly get a feel for the program's capabilities,
you can choose ready-made templates in the Presets section.

The program is optimized only for the Chrome browser. 

*/

let img; // Texturing with image
let checkAgent, preset, g, cam, canvas, simplex, simplex2, cols, rows, falloff;

let capture = P5Capture.getInstance();
let captureBool = false;
let presetBool = false;
let defaultDensity = 2;
let frame = 0;
let yStepFlow = 0;
let xStepFlow = 0;
let planeArray = [];
let randomArray = [];
let colorArray = [];

const radioScales = [0, 25, 50, 75];
const radioValues = [0, 90, 180, 270];

function preload() {
	preset = loadJSON('default.json');
	menuFont = loadFont('OpenSans-Variable.ttf');
	bookFont = loadFont('PPMori-Book.ttf');
	boldFont = loadFont('PPMori-ExtraBold.ttf');
	iboldFont = loadFont('PPMori-ExtraBoldItalic.ttf');
}


const System = {
	windowColor: 27,
}

const Main = {
	Preset: 'Default',
	canvasWidth: Math.min(window.innerWidth, 800),
	canvasHeight: Math.min(window.innerHeight, 560),
		
	minWidth: 360,
	minHeight: 320,
	maxWidth: Math.min(window.innerWidth, 1080),
	maxHeight: Math.min(window.innerHeight, 720),
	zMax: 1440,
	frameRate: 30,
};

const BG = {
	Type: 'Solid',
	firstColor: {r: 255, g: 255, b: 255},
	secondColor: {r: 255, g: 80, b: 0},
	thirdColor: {r: 150, g: 0, b: 255},
	gradientPosition: 0.5,
}

const Plane = {
	Width: 800,
	Height: 800,
	xCell: 20,
	yCell: 20,	
	xAxis: 0,
	yAxis: 0,
	zAxis: 0,
	xTilt: 0,
	yTilt: 0,
	zTilt: 0,
	xLocal: true,
	yLocal: true,
	zLocal: true,
	
	minCell: 2,
	maxCell: 100,
	minWidth: 200,
	maxWidth: 3200,
	minHeight: 200,
	maxHeight: 3200,
};

const Noise = {
	seedNum: Math.floor(Math.random() * 10000),
	Type: 'Wave',
	Amplitude: 250,
	xFreq: 0.04,
	yFreq: 0.04,
	Detail: 30,
	detailScale: 2.5,
	Elevation: 0.25,
	
	minAmp: 1,
	maxAmp: 2000,
	minFreq: 0,
	maxFreq: 0.2,
};

const Ease = {
	Type: 'None',
	rowMode: 'Center',
	roundMode: 'Center',
	Width: 1,
	Relief: 0.01,
	
	minWidth: 0,
	maxWidth: 5,
}

const Flow = {
	Force: 0,
	Angle: 90,
	
	minForce: 0,
	maxForce: 0.125,
};

const Fill = {
	Type: 'Plane (2D)',
	size3DType: 'Unified',
	sizeXOBJ: Plane.xCell,
	sizeYOBJ: Plane.yCell,
	sizeZOBJ: (Plane.xCell + Plane.yCell) / 2,
	sizeOBJ: (Plane.xCell + Plane.yCell) / 2,
	noiseSizeMin: 5,
	noiseSizeMax: 20,
	randomOBJ: 0,
	multiplyOBJ: 1,
	colorType: 'Gradient',
	gradDirection: 'Vertical',
	mapDirection: 'Top/Bottom',
	firstColor: {r: 255, g: 80, b: 0},
	secondColor: {r: 150, g: 0, b: 255},
	colorNoise: 0,
	Contrast: 0,
	
	maxSizeOBJ: 300,
	sphereDetail: 48,
}

const Stroke = {
	Type: 'Rectangle',
	colorType: 'Solid',
	firstColor: {r: 0, g: 0, b: 0},
	secondColor: {r: 255, g: 80, b: 0},
	Weight: 2,
	Position: 0,
	Contrast: 0,
	
	Direction: 'Vertical',
	
	minWeight: 2,
	maxWeight: 5,
}

const Camera = {
	Type: 'Perspective',
	perspPreset: 'Front',
	orthoPreset: 'Front',
	FOV: 75,
	xValue: 0,
	yValue: 0,
	Zoom: 500,
	Scale: 1,
	
	zValue: 50, // Not used
	Coordinates: '',
	rotateScale: 75,
	zoomScale: 150,
	zoomSens: 0.05,
	xSens: 0.5,
	ySens: 0.2,
	
	minFOV: 15,
	maxFOV: 120,
	minZoom: -200,
	maxZoom: 2000,
	minScale: 0.5,
	maxScale: 5,
};

const Loop = {
	Speed: 0.25,
	Length: 4,
	
	State: 'SEAMLESS',
	stepFactor: 0.1,
	maxFactor: 10,
	
	minLength: 1,
	maxLength: 60,
	minSpeed: 0,
	maxSpeed: 5,
}

const Export = {
	Size: 2,
	Type: 'webm',
	startCheck: false,
	Poster: false,
}

const Motion = {
	
	bgOneCheck: false,
	bgOneType: 'Blend Color',
	bgOneStart: {r: 0, g: 0, b: 0},
	bgOneEnd: {r: 255, g: 255, b: 0},
	bgOneFrame: 0,
	bgOneFactor: 1,
	bgOnePoint: 0,
	
	bgTwoCheck: false,
	bgTwoType: 'Blend Color',
	bgTwoStart: {r: 0, g: 0, b: 0},
	bgTwoEnd: {r: 255, g: 0, b: 255},
	bgTwoFrame: 0,
	bgTwoFactor: 1,
	bgTwoPoint: 0,
	
	bgThreeCheck: false,
	bgThreeType: 'Blend Color',
	bgThreeStart: {r: 0, g: 0, b: 0},
	bgThreeEnd: {r: 255, g: 0, b: 0},
	bgThreeFrame: 0,
	bgThreeFactor: 1,
	bgThreePoint: 0,
	
	ampCheck: false,
	ampInterval: { min: 1, max: 500},
	ampFrame: 0,
	ampFactor: 1,
	ampPoint: 0,
	
	xfreqCheck: false,
	xfreqInterval: { min: 0, max: 0.1},
	xfreqFrame: 0,
	xfreqFactor: 1,
	xfreqPoint: 0,
	
	yfreqCheck: false,
	yfreqInterval: { min: 0, max: 0.1},
	yfreqFrame: 0,
	yfreqFactor: 1,
	yfreqPoint: 0,
	
	detailCheck: false,
	detailInterval: { min: 0, max: 100},
	detailFrame: 0,
	detailFactor: 1,
	detailPoint: 0,
	
	easeCheck: false,
	easeInterval: { min: 0, max: 5},
	easeFrame: 0,
	easeFactor: 1,
	easePoint: 0,
	
	flowCheck: false,
	flowType: 'Seamless',
	flowStart: 0,
	flowAddition: 0.05,
	flowSeamless: 0.05,
	flowFrame: 0,
	flowFactor: 1,
	flowPoint: 0,
	
	fOneCheck: false,
	fOneType: 'Blend Color',
	fOneStart: {r: 255, g: 80, b: 0},
	fOneEnd: {r: 150, g: 150, b: 255},
	fOneFrame: 0,
	fOneFactor: 1,
	fOnePoint: 0,
	
	fTwoCheck: false,
	fTwoType: 'Blend Color',
	fTwoStart: {r: 255, g: 80, b: 0},
	fTwoEnd: {r: 255, g: 0, b: 80},
	fTwoFrame: 0,
	fTwoFactor: 1,
	fTwoPoint: 0,
	
	sOneCheck: false,
	sOneType: 'Blend Color',
	sOneStart: {r: 0, g: 0, b: 0},
	sOneEnd: {r: 255, g: 80, b: 0},
	sOneFrame: 0,
	sOneFactor: 1,
	sOnePoint: 0,
	
	sTwoCheck: false,
	sTwoType: 'Blend Color',
	sTwoStart: {r: 0, g: 0, b: 0},
	sTwoEnd: {r: 150, g: 0, b: 255},
	sTwoFrame: 0,
	sTwoFactor: 1,
	sTwoPoint: 0,
	
	FOVCheck: false,
	FOVInterval: { min: 75, max: 100 },
	FOVFrame: 0,
	FOVFactor: 1,
	FOVPoint: 0,
	
	scaleCheck: false,
	scaleInterval: { min: 1, max: 3 },
	scaleFrame: 0,
	scaleFactor: 1,
	scalePoint: 0,
	
	xAxisCheck: false,
	xAxisInterval: { min: 0, max: 25 },
	xAxisFrame: 0,
	xAxisFactor: 1,
	xAxisPoint: 0, 
	
	yAxisCheck: false,
	yAxisInterval: { min: 0, max: 25 },
	yAxisFrame: 0,
	yAxisFactor: 1,
	yAxisPoint: 0, 
	
	zAxisCheck: false,
	zAxisInterval: { min: 0, max: 25 },
	zAxisFrame: 0,
	zAxisFactor: 1,
	zAxisPoint: 0, 
	
	xTiltCheck: false,
	xTiltType: 'Swing',
	xTiltStart: 0,
	xTiltInterval: { min: 0, max: 25 },
	xTiltFrame: 0,
	xTiltFactor: 1,
	xTiltPoint: 0,
	
	yTiltCheck: false,
	yTiltType: 'Swing',
	yTiltStart: 0,
	yTiltInterval: { min: 0, max: 25 },
	yTiltFrame: 0,
	yTiltFactor: 1,
	yTiltPoint: 0,
	
	zTiltCheck: false,
	zTiltType: 'Swing',
	zTiltStart: 0,
	zTiltInterval: { min: 0, max: 25 },
	zTiltFrame: 0,
	zTiltFactor: 1,
	zTiltPoint: 0,

};