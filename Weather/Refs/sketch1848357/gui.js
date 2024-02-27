const gui = new Tweakpane.Pane({ title: 'Controls' });
gui.registerPlugin(TweakpaneEssentialsPlugin);


// Preset Tab
const systemTab = gui.addTab({ pages: [ {title: 'Presets'}, {title: 'Settings'} ] });

const mainPreset = systemTab.pages[0].addInput(Main, 'Preset', { label: 'Preset List',
  options: {
    'Default': 'default.json',
		'Make Me RITM': 'make-me-ritm.json',
    'Gradient Flow': 'gradient-flow.json',
    'Joy Division': 'joy-division.json',
		'Lost Pool': 'lost-pool.json',
		'Big Data': 'big-data.json',
		'Neon Stripe': 'neon-stripe.json',
		'Chromatic Dreams': 'chromatic-dreams.json',
		'8Bit Camo': '8bit-camo.json',
		'Vanilla Silk': 'vanilla-silk.json',
		'Quasar': 'quasar.json',
		'Pop Sculpt': 'pop-sculpt.json',
		'Fiber Streaming': 'fiber-streaming.json',
		'Stargazing': 'stargazing.json',
		'Color Spectrum': 'color-spectrum.json',
		'Lowpoly Field': 'lowpoly-field.json',
		'Halftone Clouds': 'halftone-clouds.json',
		'Bubble Snake': 'bubble-snake.json',
		'Acid Drift': 'acid-drift.json',
		'Tranquility': 'tranquility.json',
		'Vector Mountains': 'vector-mountains.json',
		'Outrun 88': 'outrun-88.json',
		'Terraforming': 'terraforming.json',
		'Lava Land': 'lava-land.json',
		'Sound Hill': 'sound-hill.json',
		'User Preset': 'User Preset',
	}, value: 'Default' }).on('change', (ev) => { 
	loadPreset(ev.value);
	//presetChange();
});

const presetFolder = systemTab.pages[0].addFolder({ title: 'Import / Export', expanded: false });
const impPreset = presetFolder.addButton({ title: 'Import Preset' }).on('click', () => { importPreset(); });
const expPreset = presetFolder.addButton({ title: 'Export Preset' }).on('click', () => { exportPreset(); });
const presetSeparatorA = systemTab.pages[0].addSeparator({ });

const resetPreset = systemTab.pages[0].addButton({ title: 'Reset Preset' }).on('click', () => { presetChange(); });

// System Tab
const fullScreen = systemTab.pages[1].addButton({ title: 'Full Screen Mode' }).on('click', () => { fullscreenEvent(); });
const settingsSeparatorA = systemTab.pages[1].addSeparator({ });
const windowColor = systemTab.pages[1].addInput(System, 'windowColor', { label: 'Background', min: 0, max: 100, step: 1 }).on('change', () => { windowColorChange(); settingsSave(); });

const guiSeparatorA = gui.addSeparator();

// Canvas Tab
const canvasTab = gui.addTab({ pages: [ {title: 'Canvas'}, {title: 'Plane'} ] });

const canvasWidth = canvasTab.pages[0].addInput(Main, 'canvasWidth', { label: 'Canvas Width', min: Main.minWidth, max: Main.maxWidth, step: 2 }).on('change', () => { canvasResize(); });
const canvasSeparatorA = canvasTab.pages[0].addSeparator({ });

const canvasHeight = canvasTab.pages[0].addInput(Main, 'canvasHeight', { label: 'Canvas Height', min: Main.minHeight, max: Main.maxHeight, step: 2 }).on('change', () => { canvasResize(); });
const canvasSeparatorB = canvasTab.pages[0].addSeparator({ });

const canvasColor = canvasTab.pages[0].addInput(BG, 'Type', { label: 'Canvas Type', options: { Transparent: 'Transparent', Solid: 'Solid', Gradient: 'Gradient' }}).on('change', () => { bgChange(); });
const canvasSeparatorC = canvasTab.pages[0].addSeparator({ });

const bgColorOne = canvasTab.pages[0].addInput(BG, 'firstColor', { label: 'Color One'});
const bgOneType = canvasTab.pages[0].addInput(Motion, 'bgOneType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.bgOneFrame = 0;
		bgMotionChange(); 
	}
});
const bgOneStart = canvasTab.pages[0].addInput(Motion, 'bgOneStart', { label: 'Color Start'});
const bgOneEnd = canvasTab.pages[0].addInput(Motion, 'bgOneEnd', { label: 'Color End'});
const bgOneFactor = canvasTab.pages[0].addInput(Motion, 'bgOneFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const canvasSeparatorD = canvasTab.pages[0].addSeparator({ });

const bgColorTwo = canvasTab.pages[0].addInput(BG, 'secondColor', { label: 'Color Two'});
const bgTwoType = canvasTab.pages[0].addInput(Motion, 'bgTwoType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.bgTwoFrame = 0;
		bgMotionChange();
	}
});
const bgTwoStart = canvasTab.pages[0].addInput(Motion, 'bgTwoStart', { label: 'Color Start'});
const bgTwoEnd = canvasTab.pages[0].addInput(Motion, 'bgTwoEnd', { label: 'Color End'});
const bgTwoFactor = canvasTab.pages[0].addInput(Motion, 'bgTwoFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const canvasSeparatorE = canvasTab.pages[0].addSeparator({ });

const bgColorThree = canvasTab.pages[0].addInput(BG, 'thirdColor', { label: 'Color Three'});
const bgThreeType = canvasTab.pages[0].addInput(Motion, 'bgThreeType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.bgThreeFrame = 0;
		bgMotionChange(); 
	}
});
const bgThreeStart = canvasTab.pages[0].addInput(Motion, 'bgThreeStart', { label: 'Color Start'});
const bgThreeEnd = canvasTab.pages[0].addInput(Motion, 'bgThreeEnd', { label: 'Color End'});
const bgThreeFactor = canvasTab.pages[0].addInput(Motion, 'bgThreeFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const canvasSeparatorF = canvasTab.pages[0].addSeparator({ });

const bgGradientPosition = canvasTab.pages[0].addInput(BG, 'gradientPosition', { label: 'Middle Point', min: 0, max: 1, step: 0.01 });

const canvasMotionFolder = canvasTab.pages[0].addFolder({ title: 'Motion Control', expanded: false });
const bgOneCheck = canvasMotionFolder.addInput(Motion, 'bgOneCheck', { label: 'Color One' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.bgOneStart = Object.assign({}, BG.firstColor) : BG.firstColor = Object.assign({}, Motion.bgOneStart);
		if(ev.value == true){
			resetFrames();
		}
		bgChange();
	}
});
const bgTwoCheck = canvasMotionFolder.addInput(Motion, 'bgTwoCheck', { label: 'Color Two' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.bgTwoStart = Object.assign({}, BG.secondColor) : BG.secondColor = Object.assign({}, Motion.bgTwoStart);
		if(ev.value == true){
			resetFrames();
		}
		bgChange();
	}
});
const bgThreeCheck = canvasMotionFolder.addInput(Motion, 'bgThreeCheck', { label: 'Color Three' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.bgThreeStart = Object.assign({}, BG.thirdColor) : BG.thirdColor = Object.assign({}, Motion.bgThreeStart);
		if(ev.value == true){
			resetFrames();
		}
		bgChange();
	}
});

// Plane Tab
const planeWidth = canvasTab.pages[1].addInput(Plane, 'Width', { label: 'Plane Width', min: Plane.minWidth, max: Plane.maxWidth, step: 2 }).on('change', () => { updatePlane(); });
const planeSeparatorA = canvasTab.pages[1].addSeparator({ });
const planeHeight = canvasTab.pages[1].addInput(Plane, 'Height', { label: 'Plane Height', min: Plane.minHeight, max: Plane.maxHeight, step: 2 }).on('change', () => { updatePlane(); });
const planeSeparatorB = canvasTab.pages[1].addSeparator({ });
const planeXCell = canvasTab.pages[1].addInput(Plane, 'xCell', { label: 'Cell Size (X)', min: Plane.minCell, max: Plane.maxCell, step: 1 }).on('change', () => { updatePlane(); });
const planeSeparatorC = canvasTab.pages[1].addSeparator({ });
const planeYCell = canvasTab.pages[1].addInput(Plane, 'yCell', { label: 'Cell Size (Y)', min: Plane.minCell, max: Plane.maxCell, step: 1 }).on('change', () => { updatePlane(); });

const guiSeparatorB = gui.addSeparator();

// Noise Tab
const noiseTab = gui.addTab({ pages: [ {title: 'Noise'}, {title: 'Ease'}, {title: 'Flow'} ] });

const noiseSeed = noiseTab.pages[0].addButton({title: 'Seed'}).on('click', () => { seedEvent(); });
const noiseSeparatorA = noiseTab.pages[0].addSeparator({ });

const noiseType = noiseTab.pages[0].addInput(Noise, 'Type', { label: 'Noise Type', options: { Wave: 'Wave', Hill: 'Hill', Scape: 'Scape', Crater: 'Crater' }}).on('change', () => { noiseTypeChange(); });
const noiseSeparatorB = noiseTab.pages[0].addSeparator({ });

const noiseAmplitude = noiseTab.pages[0].addInput(Noise, 'Amplitude', { label: 'Amplitude', min: Noise.minAmp, max: Noise.maxAmp, step: 1 });
const noiseAmpMotion = noiseTab.pages[0].addInput(Motion, 'ampInterval', { label: 'Amplitude', min: Noise.minAmp, max: Noise.maxAmp, step: 1 });
const noiseAmpFactor = noiseTab.pages[0].addInput(Motion, 'ampFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const noiseAmpPoint = noiseTab.pages[0].addInput(Motion, 'ampPoint', { view: 'radiogrid', groupName: 'noiseAmpRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start'}).on('change', (ev) => { resetFrames(); });
const noiseSeparatorC = noiseTab.pages[0].addSeparator({ });

const noiseXFreq = noiseTab.pages[0].addInput(Noise, 'xFreq', { label: 'X Frequency', min: Noise.minFreq, max: Noise.maxFreq, step: 0.001 });
const noiseXFreqMotion = noiseTab.pages[0].addInput(Motion, 'xfreqInterval', { label: 'X Frequency', min: Noise.minFreq, max: Noise.maxFreq, step: 0.001 });
const noiseXFreqFactor = noiseTab.pages[0].addInput(Motion, 'xfreqFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const noiseXFreqPoint = noiseTab.pages[0].addInput(Motion, 'xfreqPoint', { view: 'radiogrid', groupName: 'noiseXFreqRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start'}).on('change', (ev) => { resetFrames(); });
const noiseSeparatorD = noiseTab.pages[0].addSeparator({ });

const noiseYFreq = noiseTab.pages[0].addInput(Noise, 'yFreq', { label: 'Y Frequency', min: Noise.minFreq, max: Noise.maxFreq, step: 0.001 });
const noiseYFreqMotion = noiseTab.pages[0].addInput(Motion, 'yfreqInterval', { label: 'Y Frequency', min: Noise.minFreq, max: Noise.maxFreq, step: 0.001 });
const noiseYFreqFactor = noiseTab.pages[0].addInput(Motion, 'yfreqFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const noiseYFreqPoint = noiseTab.pages[0].addInput(Motion, 'yfreqPoint', { view: 'radiogrid', groupName: 'noiseYFreqRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start'}).on('change', (ev) => { resetFrames(); });
const noiseSeparatorE = noiseTab.pages[0].addSeparator({ });

const noiseDetail = noiseTab.pages[0].addInput(Noise, 'Detail', { label: 'Details', min: 0, max: 100, step: 1 }).on('change', () => { 
	//noiseDetailChange(); 
});
const noiseDetailMotion = noiseTab.pages[0].addInput(Motion, 'detailInterval', { label: 'Details', min: 0, max: 100, step: 1 });
const noiseDetailFactor = noiseTab.pages[0].addInput(Motion, 'detailFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const noiseDetailPoint = noiseTab.pages[0].addInput(Motion, 'detailPoint', { view: 'radiogrid', groupName: 'noiseDetailRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start'}).on('change', (ev) => { resetFrames(); });

const noiseSeparatorF = noiseTab.pages[0].addSeparator({ });

const noiseDetailScale = noiseTab.pages[0].addInput(Noise, 'detailScale', { label: 'Details Scale', min: 0.5, max: 5, step: 0.1 });
const noiseSeparatorG = noiseTab.pages[0].addSeparator({ });
const noiseElevation = noiseTab.pages[0].addInput(Noise, 'Elevation', { label: 'Elevation', min: 0, max: 1, step: 0.01 });

const noiseMotionFolder = noiseTab.pages[0].addFolder({ title: 'Motion Control', expanded: false });
const noiseAmpCheck = noiseMotionFolder.addInput(Motion, 'ampCheck', { label: 'Amplitude' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.ampInterval.min = Noise.Amplitude : Noise.Amplitude = Motion.ampInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		noiseMotionChange();
	}
});
const noiseXFreqCheck = noiseMotionFolder.addInput(Motion, 'xfreqCheck', { label: 'X Frequency' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.xfreqInterval.min = Noise.xFreq : Noise.xFreq = Motion.xfreqInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		noiseMotionChange();
	}
});
const noiseYFreqCheck = noiseMotionFolder.addInput(Motion, 'yfreqCheck', { label: 'Y Frequency' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.yfreqInterval.min = Noise.yFreq : Noise.yFreq = Motion.yfreqInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		noiseMotionChange();
	}
});
const noiseDetailCheck = noiseMotionFolder.addInput(Motion, 'detailCheck', { label: 'Details' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.detailInterval.min = Noise.Detail : Noise.Detail = Motion.detailInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		noiseMotionChange();
	}
});

// Ease Tab
const easeType = noiseTab.pages[1].addInput(Ease, 'Type', { label: 'Easing', options: { None: 'None', Horizontal: 'Horizontal', Vertical: 'Vertical',	Round: 'Round' }}).on('change', () => { easeTypeChange(); });
const easeSeparatorA = noiseTab.pages[1].addSeparator({ });
const easeRowMode = noiseTab.pages[1].addInput(Ease, 'rowMode', { label: 'Direction', options: { In: 'In', Out: 'Out', Center: 'Center', Edges: 'Edges' }});
const easeRoundMode = noiseTab.pages[1].addInput(Ease, 'roundMode', { label: 'Direction', options: { Center: 'Center', Edges: 'Edges', Crater: 'Crater' }});
const easeSeparatorB = noiseTab.pages[1].addSeparator({ });

const easeWidth = noiseTab.pages[1].addInput(Ease, 'Width', { label: 'Width', min: Ease.minWidth, max: Ease.maxWidth, step: 0.01 });
const easeWidthMotion = noiseTab.pages[1].addInput(Motion, 'easeInterval', { label: 'Width', min: Ease.minWidth, max: Ease.maxWidth, step: 0.01 });
const easeWidthFactor = noiseTab.pages[1].addInput(Motion, 'easeFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const easeWidthPoint = noiseTab.pages[1].addInput(Motion, 'easePoint', { view: 'radiogrid', groupName: 'easeWidthRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const easeSeparatorC = noiseTab.pages[1].addSeparator({ });

const easeRelief = noiseTab.pages[1].addInput(Ease, 'Relief', { label: 'Relief', min: 0, max: 0.25, step: 0.001 });

const easeMotionFolder = noiseTab.pages[1].addFolder({ title: 'Motion Control', expanded: false });
const easeWidthCheck = easeMotionFolder.addInput(Motion, 'easeCheck', { label: 'Ease Width' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.easeInterval.min = Ease.Width : Ease.Width = Motion.easeInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		easeMotionChange();
	}
});

// Flow Tab
const flowForce = noiseTab.pages[2].addInput(Flow, 'Force', { label: 'Force', min: 0, max: Flow.maxForce, step: 0.001 });
const flowForceType = noiseTab.pages[2].addInput(Motion, 'flowType', { label: 'Motion Type', options: { Addition: 'Addition', Seamless: 'Seamless' }}).on('change', (ev) => {
	if(presetBool){
		Motion.flowFrame = 0;
		if(ev.value == 'Seamless') {
			Flow.Force = 0;
		} else if (ev.value == 'Addition') {
			Motion.flowPoint = 0;
		}
		flowMotionChange(); 
	}
});
const flowForceStart = noiseTab.pages[2].addInput(Motion, 'flowStart', { label: 'Force', min: 0, max: Flow.maxForce, step: 0.001 });
const flowForceAddition = noiseTab.pages[2].addInput(Motion, 'flowAddition', { label: 'Force Addition', min: -Flow.maxForce, max: Flow.maxForce, step: 0.001 });
const flowForceSeamless = noiseTab.pages[2].addInput(Motion, 'flowSeamless', { label: 'Swing Force', min: 0, max: Flow.maxForce, step: 0.001 });
const flowForceFactor = noiseTab.pages[2].addInput(Motion, 'flowFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const flowForcePoint = noiseTab.pages[2].addInput(Motion, 'flowPoint', { view: 'radiogrid', groupName: 'flowForceRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const flowSeparatorA = noiseTab.pages[2].addSeparator({ });

const flowAngle = noiseTab.pages[2].addInput(Flow, 'Angle', { label: 'Angle', min: 0, max: 360, step: 5 });

const flowMotionFolder = noiseTab.pages[2].addFolder({ title: 'Motion Control', expanded: false });
const flowWidthCheck = flowMotionFolder.addInput(Motion, 'flowCheck', { label: 'Flow Force' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.flowStart = Flow.Force : Flow.Force = Motion.flowStart;
		if(ev.value == true){
			resetFrames();
		}
		flowMotionChange();
	}
});

const guiSeparatorC = gui.addSeparator();

// Fill Mesh Tab
const fillTab = gui.addTab({ pages: [ {title: 'Fill Mesh'}, {title: 'Fill Color'} ] });

const fillType = fillTab.pages[0].addInput(Fill, 'Type', { label: 'Fill Type', options: { None: 'None', 'Plane (2D)': 'Plane (2D)', 'Checker (2D)': 'Checker (2D)', 'Triangle (2D)': 'Triangle (2D)', 'Sphere (3D)': 'Sphere (3D)', 'Box (3D)': 'Box (3D)' }}).on('change', () => { fillTypeChange(); });
const fillMeshSeparatorA = fillTab.pages[0].addSeparator({ });
const size3DType = fillTab.pages[0].addInput(Fill, 'size3DType', { label: '3D Type', options: { Unified: 'Unified', 'Three-axis': 'Three-axis', 'Noise-Based': 'Noise-Based' }}).on('change', () => { fillTypeChange(); });
const fillMeshSeparatorB = fillTab.pages[0].addSeparator({ });
const sizeOBJ = fillTab.pages[0].addInput(Fill, 'sizeOBJ', { label: 'Object Size', min: 2, max: 100, step: 1 });
const sizeXOBJ = fillTab.pages[0].addInput(Fill, 'sizeXOBJ', { label: 'X Size', min: 2, max: 100, step: 1 });
const fillMeshSeparatorC = fillTab.pages[0].addSeparator({ });
const sizeYOBJ = fillTab.pages[0].addInput(Fill, 'sizeYOBJ', { label: 'Y Size', min: 2, max: 100, step: 1 });
const fillMeshSeparatorD = fillTab.pages[0].addSeparator({ });
const sizeZOBJ = fillTab.pages[0].addInput(Fill, 'sizeZOBJ', { label: 'Z Size', min: 2, max: 100, step: 1 });
const noiseSizeMin = fillTab.pages[0].addInput(Fill, 'noiseSizeMin', { label: 'Start Size', min: 0, max: 100, step: 1 });
const fillMeshSeparatorE = fillTab.pages[0].addSeparator({ });
const noiseSizeMax = fillTab.pages[0].addInput(Fill, 'noiseSizeMax', { label: 'End Size', min: 0, max: 100, step: 1 });
const randomOBJ = fillTab.pages[0].addInput(Fill, 'randomOBJ', { label: 'Random Size', min: 0, max: 100, step: 1 });
const fillMeshSeparatorF = fillTab.pages[0].addSeparator({ });
const multiplyOBJ = fillTab.pages[0].addInput(Fill, 'multiplyOBJ', { label: 'Multiplier', min: 1, max: 3, step: 0.1 });

const fMeshMotionFolder = fillTab.pages[0].addFolder({ title: 'Motion Control', expanded: false, hidden: true });

// Fill Color Tab
const fillColorType = fillTab.pages[1].addInput(Fill, 'colorType', { label: 'Color Type', options: { Solid: 'Solid', Gradient: 'Gradient', Heightmap: 'Heightmap' }}).on('change', (ev) => {
	if(Fill.colorType == 'Gradient') {
		fillDirection.dispose();
		fillDirection = fillTab.pages[1].addInput(Fill, 'gradDirection', { label: 'Direction', options: { Vertical: 'Vertical', Horizontal: 'Horizontal' }, index: 2 });
	}
	if (Fill.colorType == 'Heightmap') {
		fillDirection.dispose();
		fillDirection = fillTab.pages[1].addInput(Fill, 'mapDirection', { label: 'Direction', options: { 'Top/Bottom': 'Top/Bottom', 'Bottom/Top': 'Bottom/Top' }, index: 2 });
	}
	fillTypeChange();
});
const fillColorSeparatorA = fillTab.pages[1].addSeparator({ });

let fillDirection = fillTab.pages[1].addInput(Fill, 'gradDirection', { label: 'Direction', options: { Vertical: 'Vertical', Horizontal: 'Horizontal' }});
const fillColorSeparatorB = fillTab.pages[1].addSeparator({ });

const fillFirstColor = fillTab.pages[1].addInput(Fill, 'firstColor', { label: 'Color One'});
const fOneType = fillTab.pages[1].addInput(Motion, 'fOneType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.fOneFrame = 0;
		fillMotionChange(); 
	}
});
const fOneStart = fillTab.pages[1].addInput(Motion, 'fOneStart', { label: 'Color Start'});
const fOneEnd = fillTab.pages[1].addInput(Motion, 'fOneEnd', { label: 'Color End'});
const fOneFactor = fillTab.pages[1].addInput(Motion, 'fOneFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const fillColorSeparatorC = fillTab.pages[1].addSeparator({ });

const fillSecondColor = fillTab.pages[1].addInput(Fill, 'secondColor', { label: 'Color Two'});
const fTwoType = fillTab.pages[1].addInput(Motion, 'fTwoType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.fTwoFrame = 0;
		fillMotionChange(); 
	}
});
const fTwoStart = fillTab.pages[1].addInput(Motion, 'fTwoStart', { label: 'Color Start'});
const fTwoEnd = fillTab.pages[1].addInput(Motion, 'fTwoEnd', { label: 'Color End'});
const fTwoFactor = fillTab.pages[1].addInput(Motion, 'fTwoFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const fillColorSeparatorD = fillTab.pages[1].addSeparator({ });

const fillColorNoise = fillTab.pages[1].addInput(Fill, 'colorNoise', { label: 'Noise', min: 0, max: 100, step: 0.1 });
const fillColorSeparatorE = fillTab.pages[1].addSeparator({ });

const fillContrast = fillTab.pages[1].addInput(Fill, 'Contrast', { label: 'Contrast', min: 0, max: 1, step: 0.01 });

const fColorMotionFolder = fillTab.pages[1].addFolder({ title: 'Motion Control', expanded: false });
const fOneCheck = fColorMotionFolder.addInput(Motion, 'fOneCheck', { label: 'Color One' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.fOneStart = Object.assign({}, Fill.firstColor) : Fill.firstColor = Object.assign({}, Motion.fOneStart);
		if(ev.value == true){
			resetFrames();
		}
		fillMotionChange();
	}
});
const fTwoCheck = fColorMotionFolder.addInput(Motion, 'fTwoCheck', { label: 'Color Two' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.fTwoStart = Object.assign({}, Fill.secondColor) : Fill.secondColor = Object.assign({}, Motion.fTwoStart);
		if(ev.value == true){
			resetFrames();
		}
		fillMotionChange();
	}
});

const guiSeparatorD = gui.addSeparator();

// Stroke Mesh Tab
const strokeTab = gui.addTab({ pages: [ {title: 'Stroke Mesh'}, {title: 'Stroke Color'} ] });

const strokeType = strokeTab.pages[0].addInput(Stroke, 'Type', { label: 'Stroke Type', options: { None: 'None', Dots: 'Dots', Horizontal: 'Horizontal', Vertical: 'Vertical', Rectangle: 'Rectangle', Triangle: 'Triangle' }}).on('change', () => { strokeTypeChange(); });
const strokeMeshSeparatorA = strokeTab.pages[0].addSeparator({ });
const strokeWidth = strokeTab.pages[0].addInput(Stroke, 'Weight', { label: 'Weight', min: Stroke.minWeight, max: Stroke.maxWeight, step: 0.1 });

// Stroke Color Tab
const strokeColorType = strokeTab.pages[1].addInput(Stroke, 'colorType', { label: 'Color Type', options: { Solid: 'Solid', Gradient: 'Gradient' }}).on('change', () => { strokeTypeChange(); });
const strokeColorSeparatorA = strokeTab.pages[1].addSeparator({ });

const strokeFirstColor = strokeTab.pages[1].addInput(Stroke, 'firstColor', { label: 'Color One'});
const sOneType = strokeTab.pages[1].addInput(Motion, 'sOneType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.sOneFrame = 0;
		strokeMotionChange(); 
	}
});
const sOneStart = strokeTab.pages[1].addInput(Motion, 'sOneStart', { label: 'Color Start'});
const sOneEnd = strokeTab.pages[1].addInput(Motion, 'sOneEnd', { label: 'Color End'});
const sOneFactor = strokeTab.pages[1].addInput(Motion, 'sOneFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const strokeColorSeparatorB = strokeTab.pages[1].addSeparator({ });

const strokeSecondColor = strokeTab.pages[1].addInput(Stroke, 'secondColor', { label: 'Color Two'});
const sTwoType = strokeTab.pages[1].addInput(Motion, 'sTwoType', { label: 'Motion Type', options: { 'Blend Color': 'Blend Color', 'Hue Forward': 'Hue Forward', 'Hue Backward': 'Hue Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.sTwoFrame = 0;
		strokeMotionChange(); 
	}
});
const sTwoStart = strokeTab.pages[1].addInput(Motion, 'sTwoStart', { label: 'Color Start'});
const sTwoEnd = strokeTab.pages[1].addInput(Motion, 'sTwoEnd', { label: 'Color End'});
const sTwoFactor = strokeTab.pages[1].addInput(Motion, 'sTwoFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});

const strokeColorSeparatorC = strokeTab.pages[1].addSeparator({ });

const strokeContrast = strokeTab.pages[1].addInput(Stroke, 'Contrast', { label: 'Contrast', min: 0, max: 1, step: 0.01 });
//const strokeDirection = strokeTab.add(Stroke, 'Direction', ['Vertical', 'Horizontal']).name("Direction");
//const strokePosition = strokeTab.add(Stroke, 'Position', 0, 50, 0.1).listen().name("Height Position");

const sColorMotionFolder = strokeTab.pages[1].addFolder({ title: 'Motion Control', expanded: false });
const sOneCheck = sColorMotionFolder.addInput(Motion, 'sOneCheck', { label: 'Color One' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.sOneStart = Object.assign({}, Stroke.firstColor) : Stroke.firstColor = Object.assign({}, Motion.sOneStart);
		if(ev.value == true){
			resetFrames();
		}
		strokeTypeChange();
	}
});
const sTwoCheck = sColorMotionFolder.addInput(Motion, 'sTwoCheck', { label: 'Color Two' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.sTwoStart = Object.assign({}, Stroke.secondColor) : Stroke.secondColor = Object.assign({}, Motion.sTwoStart);
		if(ev.value == true){
			resetFrames();
		}
		strokeTypeChange();
	}
});

const guiSeparatorE = gui.addSeparator();

// Camera Tab
const cameraTab = gui.addTab({ pages: [ {title: 'Camera'}, {title: 'Coordinates'} ] });

const cameraType = cameraTab.pages[0].addInput(Camera, 'Type', { label: 'Camera Type', options: { Perspective: 'Perspective', Ortho: 'Ortho' }}).on('change', (ev) => { 
	if(ev.value == 'Perspective') {
		cameraPreset.dispose();
		cameraPreset = cameraTab.pages[0].addInput(Camera, 'perspPreset', { label: 'Presets', options: { Top: 'Top', Front: 'Front', Perspective: 'Perspective' }, index: 2 }).on('change', () => { cameraPresetChange(); });
	} else if (ev.value == 'Ortho'){
		cameraPreset.dispose();
		cameraPreset = cameraTab.pages[0].addInput(Camera, 'orthoPreset', { label: 'Presets', options: { Top: 'Top', Front: 'Front', 'Front 45°': 'Front 45°', Diagonal: 'Diagonal' }, index: 2 }).on('change', () => { cameraPresetChange(); });
	}
	cameraTypeChange();
	cameraPresetChange(); 
});
const cameraSeparatorA = cameraTab.pages[0].addSeparator({ });
let cameraPreset = cameraTab.pages[0].addInput(Camera, 'perspPreset', { label: 'Presets', options: { Top: 'Top', Front: 'Front', Perspective: 'Perspective' }}).on('change', () => { cameraPresetChange(); });
const cameraSeparatorB = cameraTab.pages[0].addSeparator({ });

const cameraFOV = cameraTab.pages[0].addInput(Camera, 'FOV', { label: 'Field of View', min: Camera.minFOV, max: Camera.maxFOV, step: 1 }).on('change', () => { cameraFOVChange(); });
const cameraFOVMotion = cameraTab.pages[0].addInput(Motion, 'FOVInterval', { label: 'Field of View', min: Camera.minFOV, max: Camera.maxFOV, step: 1 });
const cameraFOVFactor = cameraTab.pages[0].addInput(Motion, 'FOVFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const cameraFOVPoint = cameraTab.pages[0].addInput(Motion, 'FOVPoint', { view: 'radiogrid', groupName: 'cameraFOVRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const cameraSeparatorC = cameraTab.pages[0].addSeparator({ });

const cameraScale = cameraTab.pages[0].addInput(Camera, 'Scale', { label: 'Scene Scale', min: Camera.minScale, max: Camera.maxScale, step: 0.01 });
const cameraScaleMotion = cameraTab.pages[0].addInput(Motion, 'scaleInterval', { label: 'Scene Scale', min: Camera.minScale, max: Camera.maxScale, step: 0.01 });
const cameraScaleFactor = cameraTab.pages[0].addInput(Motion, 'scaleFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const cameraScalePoint = cameraTab.pages[0].addInput(Motion, 'scalePoint', { view: 'radiogrid', groupName: 'cameraScaleRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const cameraSeparatorD = cameraTab.pages[0].addSeparator({ });

const resetCamera = cameraTab.pages[0].addButton({ title: 'Reset Camera' }).on('click', () => { cameraPresetChange(); });
const cameraCoordinates = cameraTab.pages[1].addMonitor(Camera, 'Coordinates', { label: 'Coordinates', multiline: true, lineCount: 3 });

const cameraMotionFolder = cameraTab.pages[0].addFolder({ title: 'Motion Control', expanded: false });
const cameraFOVCheck = cameraMotionFolder.addInput(Motion, 'FOVCheck', { label: 'Field of View' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.FOVInterval.min = Camera.FOV : Camera.FOV = Motion.FOVInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		FOVMotionChange();
	}
});
const cameraScaleCheck = cameraMotionFolder.addInput(Motion, 'scaleCheck', { label: 'Scene Scale' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.scaleInterval.min = Camera.Scale : Camera.Scale = Motion.scaleInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		scaleMotionChange();
	}
});

const guiSeparatorF = gui.addSeparator();

// Axes Tab
const positionTab = gui.addTab({ pages: [ {title: 'Plane Axes'}, {title: 'Plane Tils'}, {title: 'Advanced'} ] });

const planeXAxis = positionTab.pages[0].addInput(Plane, 'xAxis', { label: 'X Axis', min: -100, max: 100, step: 0.1 });
const xAxisMotion = positionTab.pages[0].addInput(Motion, 'xAxisInterval', { label: 'X Axis', min: -100, max: 100, step: 0.1 });
const xAxisFactor = positionTab.pages[0].addInput(Motion, 'xAxisFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const xAxisPoint = positionTab.pages[0].addInput(Motion, 'xAxisPoint', { view: 'radiogrid', groupName: 'xAxisRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const axisSeparatorA = positionTab.pages[0].addSeparator({ });

const planeYAxis = positionTab.pages[0].addInput(Plane, 'yAxis', { label: 'Y Axis', min: -100, max: 100, step: 0.1 });
const yAxisMotion = positionTab.pages[0].addInput(Motion, 'yAxisInterval', { label: 'Y Axis', min: -100, max: 100, step: 0.1 });
const yAxisFactor = positionTab.pages[0].addInput(Motion, 'yAxisFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const yAxisPoint = positionTab.pages[0].addInput(Motion, 'yAxisPoint', { view: 'radiogrid', groupName: 'yAxisRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const axisSeparatorB = positionTab.pages[0].addSeparator({ });

const planeZAxis = positionTab.pages[0].addInput(Plane, 'zAxis', { label: 'Z Axis', min: -100, max: 100, step: 0.1 });
const zAxisMotion = positionTab.pages[0].addInput(Motion, 'zAxisInterval', { label: 'Z Axis', min: -100, max: 100, step: 0.1 });
const zAxisFactor = positionTab.pages[0].addInput(Motion, 'zAxisFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const zAxisPoint = positionTab.pages[0].addInput(Motion, 'zAxisPoint', { view: 'radiogrid', groupName: 'zAxisRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const axisSeparatorC = positionTab.pages[0].addSeparator({ });

const resetAxis = positionTab.pages[0].addButton({ title: 'Reset Axes' }).on('click', () => { axisReset(); });

const axisMotionFolder = positionTab.pages[0].addFolder({ title: 'Motion Control', expanded: false });
const xAxisCheck = axisMotionFolder.addInput(Motion, 'xAxisCheck', { label: 'X Axis' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.xAxisInterval.min = Plane.xAxis : Plane.xAxis = Motion.xAxisInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		axisChange();
	}
});
const yAxisCheck = axisMotionFolder.addInput(Motion, 'yAxisCheck', { label: 'Y Axis' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.yAxisInterval.min = Plane.yAxis : Plane.yAxis = Motion.yAxisInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		axisChange();
	}
});
const zAxisCheck = axisMotionFolder.addInput(Motion, 'zAxisCheck', { label: 'Z Axis' }).on('change', (ev) => {
	if(presetBool){
		ev.value == true ? Motion.zAxisInterval.min = Plane.zAxis : Plane.zAxis = Motion.zAxisInterval.min;
		if(ev.value == true){
			resetFrames();
		}
		axisChange();
	}
});

// Tilts Tab
const planeXTilt = positionTab.pages[1].addInput(Plane, 'xTilt', { label: 'X Tilt', min: -360, max: 360, step: 1 });
const xTiltType = positionTab.pages[1].addInput(Motion, 'xTiltType', { label: 'Motion Type', options: { 'Swing': 'Swing', 'Spin Forward': 'Spin Forward', 'Spin Backward': 'Spin Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.xTiltPoint = 0;
		Motion.xTiltFrame = 0;
	}
	tiltMotionChange();
});
const xTiltStart = positionTab.pages[1].addInput(Motion, 'xTiltStart', { label: 'X Tilt Start', min: -360, max: 360, step: 1 });
const xTiltMotion = positionTab.pages[1].addInput(Motion, 'xTiltInterval', { label: 'X Tilt', min: -360, max: 360, step: 1 });
const xTiltFactor = positionTab.pages[1].addInput(Motion, 'xTiltFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const xTiltPoint = positionTab.pages[1].addInput(Motion, 'xTiltPoint', { view: 'radiogrid', groupName: 'xTiltRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const tiltSeparatorA = positionTab.pages[1].addSeparator({ });

const planeYTilt = positionTab.pages[1].addInput(Plane, 'yTilt', { label: 'Y Tilt', min: -360, max: 360, step: 1 });
const yTiltType = positionTab.pages[1].addInput(Motion, 'yTiltType', { label: 'Motion Type', options: { 'Swing': 'Swing', 'Spin Forward': 'Spin Forward', 'Spin Backward': 'Spin Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.yTiltPoint = 0;
		Motion.yTiltFrame = 0;
	}
	tiltMotionChange();
});
const yTiltStart = positionTab.pages[1].addInput(Motion, 'yTiltStart', { label: 'Y Tilt Start', min: -360, max: 360, step: 1 });
const yTiltMotion = positionTab.pages[1].addInput(Motion, 'yTiltInterval', { label: 'Y Tilt', min: -360, max: 360, step: 1 });
const yTiltFactor = positionTab.pages[1].addInput(Motion, 'yTiltFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const yTiltPoint = positionTab.pages[1].addInput(Motion, 'yTiltPoint', { view: 'radiogrid', groupName: 'yTiltRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });
const tiltSeparatorB = positionTab.pages[1].addSeparator({ });

const planeZTilt = positionTab.pages[1].addInput(Plane, 'zTilt', { label: 'Z Tilt', min: -360, max: 360, step: 1 });
const zTiltType = positionTab.pages[1].addInput(Motion, 'zTiltType', { label: 'Motion Type', options: { 'Swing': 'Swing', 'Spin Forward': 'Spin Forward', 'Spin Backward': 'Spin Backward' }}).on('change', (ev) => { 
	if(presetBool){
		Motion.zTiltPoint = 0;
		Motion.zTiltFrame = 0;
	}
	tiltMotionChange();
});
const zTiltStart = positionTab.pages[1].addInput(Motion, 'zTiltStart', { label: 'Z Tilt Start', min: -360, max: 360, step: 1 });
const zTiltMotion = positionTab.pages[1].addInput(Motion, 'zTiltInterval', { label: 'Z Tilt', min: -360, max: 360, step: 1 });
const zTiltFactor = positionTab.pages[1].addInput(Motion, 'zTiltFactor', { label: 'Loop Factor', min: 0, max: Loop.maxFactor, step: Loop.stepFactor }).on('change', (ev) => { 
	if(presetBool){
		resetFrames();
	}
});
const zTiltPoint = positionTab.pages[1].addInput(Motion, 'zTiltPoint', { view: 'radiogrid', groupName: 'zTiltRadio', size: [4, 1],
  cells: (x, y) => ({
    title: `${radioScales[y + x]}%`,
    value: radioValues[y + x],
  }), label: 'Loop Start' }).on('change', (ev) => { resetFrames(); });

const tiltSeparatorC = positionTab.pages[1].addSeparator({ });

const resetTilt = positionTab.pages[1].addButton({ title: 'Reset Tilts' }).on('click', () => { tiltReset(); });

const tiltMotionFolder = positionTab.pages[1].addFolder({ title: 'Motion Control', expanded: false });
const xTiltCheck = tiltMotionFolder.addInput(Motion, 'xTiltCheck', { label: 'X Tilt' }).on('change', (ev) => {
	if(presetBool){
		if(ev.value == true){
			Motion.xTiltInterval.min = Plane.xTilt;
			Motion.xTiltStart = Plane.xTilt;
			resetFrames();
		} else {
			switch(Motion.xTiltType){
				case 'Swing':
					Plane.xTilt = Motion.xTiltInterval.min;
					break;
				
				case 'Spin Forward':
				case 'Spin Backward':
					Plane.xTilt = Motion.xTiltStart;
					break;
			}
		}
		tiltMotionChange();
	}
});
const yTiltCheck = tiltMotionFolder.addInput(Motion, 'yTiltCheck', { label: 'Y Tilt' }).on('change', (ev) => {
	if(presetBool){
		if(ev.value == true){
			Motion.yTiltInterval.min = Plane.yTilt;
			Motion.yTiltStart = Plane.yTilt;
			resetFrames();
		} else {
			switch(Motion.yTiltType){
				case 'Swing':
					Plane.yTilt = Motion.yTiltInterval.min;
					break;
				
				case 'Spin Forward':
				case 'Spin Backward':
					Plane.yTilt = Motion.yTiltStart;
					break;
			}
		}
		tiltMotionChange();
	}
});
const zTiltCheck = tiltMotionFolder.addInput(Motion, 'zTiltCheck', { label: 'Z Tilt' }).on('change', (ev) => {
	if(presetBool){
		if(ev.value == true){
			Motion.zTiltInterval.min = Plane.zTilt;
			Motion.zTiltStart = Plane.zTilt;
			resetFrames();
		} else {
			switch(Motion.zTiltType){
				case 'Swing':
					Plane.zTilt = Motion.zTiltInterval.min;
					break;
				
				case 'Spin Forward':
				case 'Spin Backward':
					Plane.zTilt = Motion.zTiltStart;
					break;
			}
		}
		tiltMotionChange();
	}
});

// Local Settings Tab
const planeXLocal = positionTab.pages[2].addInput(Plane, 'xLocal', { label: 'Local Tilt (X)' });
const localSeparatorA = positionTab.pages[2].addSeparator({ });
const planeYLocal = positionTab.pages[2].addInput(Plane, 'yLocal', { label: 'Local Tilt (Y)' });
const localSeparatorB = positionTab.pages[2].addSeparator({ });
const planeZLocal = positionTab.pages[2].addInput(Plane, 'zLocal', { label: 'Local Tilt (Z)' });

const guiSeparatorG = gui.addSeparator();

// Loop Tab
const captureTab = gui.addTab({ pages: [ {title: 'Loop'}, {title: 'Export'} ] });

//const restartFrames = captureTab.pages[0].addButton({ title: 'Restart Animation' }).on('click', () => { resetFrames(); }); 
const loopSeparatorA = captureTab.pages[0].addSeparator({ });
const loopSpeed = captureTab.pages[0].addInput(Loop, 'Speed', { label: 'Noise Speed', min: Loop.minSpeed, max: Loop.maxSpeed, step: 0.01 });
const loopSeparatorB = captureTab.pages[0].addSeparator({ });
const loopLength = captureTab.pages[0].addInput(Loop, 'Length', { label: 'Clip Length', min: Loop.minLength, max: Loop.maxLength, step: 0.5 });
const loopSeparatorC = captureTab.pages[0].addSeparator({ });
const loopState = captureTab.pages[0].addMonitor(Loop, 'State', { label: 'Loop State' });

// Export Tab
const exportStartCheck = captureTab.pages[1].addInput(Export, 'startCheck', { label: 'Restart Loop' });
const exportSeparatorA = captureTab.pages[1].addSeparator({ });
const exportType = captureTab.pages[1].addInput(Export, 'Type', { label: 'File Type', options: { WebM: 'webm', GIF: 'gif', JPG: 'jpg', PNG: 'png', WebP: 'webp' }}).on('change', () => { exportChange(); });
const exportSeparatorB = captureTab.pages[1].addSeparator({ });
const exportSize = captureTab.pages[1].addInput(Export, 'Size', { label: 'Clip Size', min: 1, max: 4, step: 1 }).on('change', () => { exportChange(); });

const guiSeparatorH = gui.addSeparator();

const exportButton = gui.addButton({ title: 'Click to Export' }).on('click', () => { exportEvent(); });
const exportState = gui.addMonitor(capture, 'state', { label: 'Capture State' });

canvasMotionFolder.controller_.view.element.classList.toggle("folderGUI");
noiseMotionFolder.controller_.view.element.classList.toggle("folderGUI");
easeMotionFolder.controller_.view.element.classList.toggle("folderGUI");
flowMotionFolder.controller_.view.element.classList.toggle("folderGUI");
//fMeshMotionFolder.controller_.view.element.classList.toggle("folderGUI");
fColorMotionFolder.controller_.view.element.classList.toggle("folderGUI");
sColorMotionFolder.controller_.view.element.classList.toggle("folderGUI");
cameraMotionFolder.controller_.view.element.classList.toggle("folderGUI");
axisMotionFolder.controller_.view.element.classList.toggle("folderGUI");
tiltMotionFolder.controller_.view.element.classList.toggle("folderGUI");

// resetPreset.controller_.valueController.view.buttonElement.classList.add("resetGUI");

// guiSeparatorA.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorB.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorC.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorD.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorE.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorF.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorG.controller_.view.element.classList.toggle("separatorGUI");
// guiSeparatorH.controller_.view.element.classList.toggle("separatorGUI");
// systemTab.controller_.view.element.classList.toggle("systemTab");
// canvasTab.controller_.view.element.classList.toggle("canvasTab");
// noiseTab.controller_.view.element.classList.toggle("noiseTab");
// fillTab.controller_.view.element.classList.toggle("fillTab");
// strokeTab.controller_.view.element.classList.toggle("strokeTab");
// cameraTab.controller_.view.element.classList.toggle("cameraTab");
// positionTab.controller_.view.element.classList.toggle("positionTab");
// captureTab.controller_.view.element.classList.toggle("captureTab");


function bgChange() {
	let p5Canvas = select('.p5Canvas');
	bgOneType.hidden = true; 
	bgOneStart.hidden = true;  
  bgOneEnd.hidden = true; 
  bgOneFactor.hidden = true;
	bgTwoType.hidden = true; 
	bgTwoStart.hidden = true;  
  bgTwoEnd.hidden = true; 
  bgTwoFactor.hidden = true;
	bgThreeType.hidden = true; 
	bgThreeStart.hidden = true;  
  bgThreeEnd.hidden = true; 
  bgThreeFactor.hidden = true;
	switch (BG.Type) {
		case 'Solid':
			p5Canvas.style('border-width', '1px');
			canvasSeparatorC.hidden = false;
			canvasSeparatorD.hidden = true;
			canvasSeparatorE.hidden = true;
			canvasSeparatorF.hidden = true;
			bgColorOne.hidden = false;
			bgColorTwo.hidden = true;
			bgColorThree.hidden = true;
			bgGradientPosition.hidden = true;
			bgOneCheck.disabled = false;
			Motion.bgTwoCheck = false;
			bgTwoCheck.disabled = true;
			Motion.bgThreeCheck = false;
			bgThreeCheck.disabled = true;
			bgMotionChange();
			break;

		case 'Gradient':
			p5Canvas.style('border-width', '1px');
			canvasSeparatorC.hidden = false;
			canvasSeparatorD.hidden = false;
			canvasSeparatorE.hidden = false;
			canvasSeparatorF.hidden = false;
			bgColorOne.hidden = false;
			bgColorTwo.hidden = false;
			bgColorThree.hidden = false;
			bgGradientPosition.hidden = false;
			bgOneCheck.disabled = false;
			bgTwoCheck.disabled = false;
			bgThreeCheck.disabled = false;
			bgMotionChange();
			break;

		case 'Transparent':
			p5Canvas.style('border-width', '1px');
			Export.Type = 'png';
			canvasSeparatorC.hidden = true;
			canvasSeparatorD.hidden = true;
			canvasSeparatorE.hidden = true;
			canvasSeparatorF.hidden = true;
			bgColorOne.hidden = true;
			bgColorTwo.hidden = true;
			bgColorThree.hidden = true;
			bgGradientPosition.hidden = true;
			Motion.bgOneCheck = false;
			bgOneCheck.disabled = true;
			Motion.bgTwoCheck = false;
			bgTwoCheck.disabled = true;
			Motion.bgThreeCheck = false;
			bgThreeCheck.disabled = true;
			break;
	}
	gui.refresh();
}

function bgMotionChange() {
	if (Motion.bgOneCheck == true) {
		switch (Motion.bgOneType) {
			case 'Blend Color':
				bgColorOne.hidden = true;
				bgOneType.hidden = false;
				bgOneStart.hidden = false;
				bgOneEnd.hidden = false;
				bgOneFactor.hidden = false;
				break;
			case 'Hue Forward':
			case 'Hue Backward':
				bgColorOne.hidden = true;
				bgOneType.hidden = false;
				bgOneStart.hidden = false;
				bgOneEnd.hidden = true;
				bgOneFactor.hidden = false;
				break;
		}
	}
	if (Motion.bgTwoCheck == true) {
		switch (Motion.bgTwoType) {
			case 'Blend Color':
				bgColorTwo.hidden = true;
				bgTwoType.hidden = false;
				bgTwoStart.hidden = false;
				bgTwoEnd.hidden = false;
				bgTwoFactor.hidden = false;
				break;
			case 'Hue Forward':
			case 'Hue Backward':
				bgColorTwo.hidden = true;
				bgTwoType.hidden = false;
				bgTwoStart.hidden = false;
				bgTwoEnd.hidden = true;
				bgTwoFactor.hidden = false;
				break;
		}
	}
	if (Motion.bgThreeCheck == true) {
		switch (Motion.bgThreeType) {
			case 'Blend Color':
				bgColorThree.hidden = true;
				bgThreeType.hidden = false;
				bgThreeStart.hidden = false;
				bgThreeEnd.hidden = false;
				bgThreeFactor.hidden = false;
				break;
			case 'Hue Forward':
			case 'Hue Backward':
				bgColorThree.hidden = true;
				bgThreeType.hidden = false;
				bgThreeStart.hidden = false;
				bgThreeEnd.hidden = true;
				bgThreeFactor.hidden = false;
				break;
		}
	}
}

function noiseTypeChange() {
	if (Noise.Type == 'Wave') {
		noiseElevation.hidden = true;
		noiseSeparatorG.hidden = true;
	} else {
		noiseElevation.hidden = false;
		noiseSeparatorG.hidden = false; 
	}
}

// function noiseDetailChange() {
// 	if (Noise.Detail != 0) {
// 		noiseDetailScale.hidden = false;
// 	} else {
// 		noiseDetailScale.hidden = true;
// 	}
// }

function noiseMotionChange() {
	if (Motion.ampCheck) {
		noiseAmplitude.hidden = true;
		noiseAmpMotion.hidden = false;
		noiseAmpFactor.hidden = false;
		noiseAmpPoint.hidden = false;
	} else {
		noiseAmplitude.hidden = false;
		noiseAmpMotion.hidden = true;
		noiseAmpFactor.hidden = true;
		noiseAmpPoint.hidden = true;
	}
	if (Motion.xfreqCheck) {
		noiseXFreq.hidden = true;
		noiseXFreqMotion.hidden = false;
		noiseXFreqFactor.hidden = false;
		noiseXFreqPoint.hidden = false;
	} else {
		noiseXFreq.hidden = false;
		noiseXFreqMotion.hidden = true;
		noiseXFreqFactor.hidden = true;
		noiseXFreqPoint.hidden = true;
	}
	if (Motion.yfreqCheck) {
		noiseYFreq.hidden = true;
		noiseYFreqMotion.hidden = false;
		noiseYFreqFactor.hidden = false;
		noiseYFreqPoint.hidden = false;
	} else {
		noiseYFreq.hidden = false;
		noiseYFreqMotion.hidden = true;
		noiseYFreqFactor.hidden = true;
		noiseYFreqPoint.hidden = true;
	}
	if (Motion.detailCheck) {
		noiseDetail.hidden = true;
		noiseDetailMotion.hidden = false;
		noiseDetailFactor.hidden = false;
		noiseDetailPoint.hidden = false;
	} else {
		noiseDetail.hidden = false;
		noiseDetailMotion.hidden = true;
		noiseDetailFactor.hidden = true;
		noiseDetailPoint.hidden = true;
	}
	gui.refresh();
}

function easeTypeChange() {
	if (Ease.Type == 'None') {	
		easeSeparatorA.hidden = true;
		easeSeparatorB.hidden = true;
		easeSeparatorC.hidden = true;
		easeRowMode.hidden = true;
		easeRoundMode.hidden = true;
		easeWidth.hidden = true;
		easeWidthMotion.hidden = true;
		easeWidthFactor.hidden = true;
		easeWidthPoint.hidden = true;
		easeWidthCheck.disabled = true;
		Motion.easeCheck = false;
		easeRelief.hidden = true;
	}
	if (Ease.Type != 'None') {
		easeWidthCheck.disabled = false;
		easeRelief.hidden = false;
		easeSeparatorA.hidden = false;
		easeSeparatorB.hidden = false;
		easeSeparatorC.hidden = false;
		if (Ease.Type == 'Round') {
			easeRowMode.hidden = true;
			easeRoundMode.hidden = false;
		} else {
			easeRowMode.hidden = false;
			easeRoundMode.hidden = true;
		}	
		easeMotionChange();		
	}
	gui.refresh();
}

function easeMotionChange() {
	if (Motion.easeCheck) {
		easeWidth.hidden = true;
		easeWidthMotion.hidden = false;
		easeWidthFactor.hidden = false;
		easeWidthPoint.hidden = false;
	} else {
		if (Ease.Type != 'None') easeWidth.hidden = false;
		easeWidthMotion.hidden = true;
		easeWidthFactor.hidden = true;
		easeWidthPoint.hidden = true;
	}
	gui.refresh();
}

function flowMotionChange(){
	flowForce.hidden = false;
	flowForceType.hidden = true;
	flowForceStart.hidden = true;
	flowForceAddition.hidden = true;
	flowForceSeamless.hidden = true;
	flowForceFactor.hidden = true;
	flowForcePoint.hidden = true;
	if (Motion.flowCheck) {
		flowForce.hidden = true;
		flowForceType.hidden = false;
		flowForceFactor.hidden = false;
		switch (Motion.flowType) {
			case 'Addition':
				flowForceStart.hidden = false;
				flowForceAddition.hidden = false;
				break;
				
			case 'Seamless':
				flowForceSeamless.hidden = false;
				flowForcePoint.hidden = false;
				break;
		}
	}
	gui.refresh();
}

function fillTypeChange() {
	if (Fill.Type == 'None') {
		fillMeshSeparatorA.hidden = true;
		size3DType.hidden = true;
		fillMeshSeparatorB.hidden = true;
		sizeOBJ.hidden = true;
		fillMeshSeparatorC.hidden = true;
		sizeXOBJ.hidden = true;
		sizeYOBJ.hidden = true;
		sizeZOBJ.hidden = true;
		fillMeshSeparatorD.hidden = true;
		noiseSizeMin.hidden = true;
		noiseSizeMax.hidden = true;
		fillMeshSeparatorE.hidden = true;
		randomOBJ.hidden = true;
		fillMeshSeparatorF.hidden = true;
		multiplyOBJ.hidden = true;
		
		fillColorType.hidden = true;
		fillColorSeparatorA.hidden = true;
		fillDirection.hidden = true;
		fillColorSeparatorB.hidden = true;
		fillFirstColor.hidden = true;
		fOneType.hidden = true;
		fOneStart.hidden = true;
		fOneEnd.hidden = true;
		fOneFactor.hidden = true;
		fOneCheck.disabled = true;
		Motion.fOneCheck = false;
		
		fillColorSeparatorC.hidden = true;
		fillSecondColor.hidden = true;
		fTwoType.hidden = true;
		fTwoStart.hidden = true;
		fTwoEnd.hidden = true;
		fTwoFactor.hidden = true;
		fTwoCheck.disabled = true;
		Motion.fTwoCheck = false;
			
		fillColorSeparatorD.hidden = true;
		fillColorNoise.hidden = true;
		fillColorSeparatorE.hidden = true;
		fillContrast.hidden = true;
	} else {
		if (Fill.Type.includes("3D")) {
			size3DType.hidden = false;
			fillMeshSeparatorA.hidden = false;
			fillMeshSeparatorB.hidden = false;
			fillMeshSeparatorF.hidden = false;
			fill3DChange();
		} else {
			fillMeshSeparatorA.hidden = true;
			fillMeshSeparatorB.hidden = true;
			fillMeshSeparatorC.hidden = true;
			fillMeshSeparatorD.hidden = true;
			fillMeshSeparatorE.hidden = true;
			fillMeshSeparatorF.hidden = true;
			size3DType.hidden = true;
			sizeOBJ.hidden = true;
			sizeXOBJ.hidden = true;
			sizeYOBJ.hidden = true;
			sizeZOBJ.hidden = true;
			noiseSizeMin.hidden = true;
			noiseSizeMax.hidden = true;
			randomOBJ.hidden = true;
			multiplyOBJ.hidden = true;
		}
		fillColorType.hidden = false;
		fillColorChange();
		fillMotionChange();
	}
	gui.refresh();
}

function fill3DChange() {
	switch (Fill.size3DType) {
		case 'Unified':
			fillMeshSeparatorC.hidden = false;
			fillMeshSeparatorD.hidden = true;
			fillMeshSeparatorE.hidden = true;
			sizeOBJ.hidden = false;
			sizeXOBJ.hidden = true;
			sizeYOBJ.hidden = true;
			sizeZOBJ.hidden = true;
			noiseSizeMin.hidden = true;
			noiseSizeMax.hidden = true;
			randomOBJ.hidden = false;
			multiplyOBJ.hidden = false;
			break;
		case 'Three-axis':
			fillMeshSeparatorC.hidden = false;
			fillMeshSeparatorD.hidden = false;
			fillMeshSeparatorE.hidden = false;
			sizeOBJ.hidden = true;
			sizeXOBJ.hidden = false;
			sizeYOBJ.hidden = false;
			sizeZOBJ.hidden = false;
			noiseSizeMin.hidden = true;
			noiseSizeMax.hidden = true;
			randomOBJ.hidden = false;
			multiplyOBJ.hidden = false;
			break;
		case 'Noise-Based':
			fillMeshSeparatorC.hidden = true;
			fillMeshSeparatorD.hidden = true;
			fillMeshSeparatorE.hidden = false;
			sizeOBJ.hidden = true;
			sizeXOBJ.hidden = true;
			sizeYOBJ.hidden = true;
			sizeZOBJ.hidden = true;
			noiseSizeMin.hidden = false;
			noiseSizeMax.hidden = false;
			randomOBJ.hidden = true;
			multiplyOBJ.hidden = false;
			break;
	}
}

function fillColorChange() {
	fillColorSeparatorA.hidden = false;
	fillColorSeparatorB.hidden = false;
	fillColorSeparatorC.hidden = false;
	fillColorSeparatorD.hidden = false;
	fillColorSeparatorE.hidden = false;
	fillFirstColor.hidden = false;
	fOneCheck.disabled = false;
	fillContrast.hidden = false;
	fillColorNoise.hidden = false;
	if (Fill.colorType == 'Solid') {
		fillColorSeparatorB.hidden = true;
		fillColorSeparatorD.hidden = true;
		fillSecondColor.hidden = true;
		fillDirection.hidden = true;
		fTwoCheck.disabled = true;
		Motion.fTwoCheck = false;
	} else {
		fillSecondColor.hidden = false;
		fTwoCheck.disabled = false;
	} 
	gui.refresh();
}

function fillMotionChange() {
	if(Motion.fOneCheck){
		fillFirstColor.hidden = true;
		fOneStart.hidden = false;
		fOneType.hidden = false;
		fOneFactor.hidden = false;
		if(Motion.fOneType == 'Blend Color'){
			fOneEnd.hidden = false;
		} else {
			fOneEnd.hidden = true;
		}
	} else {
		if(Fill.Type != 'None') fillFirstColor.hidden = false;
		fOneType.hidden = true;
		fOneStart.hidden = true;
		fOneEnd.hidden = true;
		fOneFactor.hidden = true;
	}
	if(Motion.fTwoCheck){
		fillSecondColor.hidden = true;
		fTwoStart.hidden = false;
		fTwoType.hidden = false;
		fTwoFactor.hidden = false;
		if(Motion.fTwoType == 'Blend Color'){
			fTwoEnd.hidden = false;
		} else {
			fTwoEnd.hidden = true;
		}
	} else {
		if(Fill.Type != 'None' && Fill.colorType != 'Solid') fillSecondColor.hidden = false;
		fTwoType.hidden = true;
		fTwoStart.hidden = true;
		fTwoEnd.hidden = true;
		fTwoFactor.hidden = true;
	}
	gui.refresh();
}

function strokeTypeChange() {
	strokeMeshSeparatorA.hidden = true;
	strokeColorSeparatorA.hidden = true;
	strokeColorSeparatorB.hidden = true;
	strokeColorSeparatorC.hidden = true;
	strokeColorType.hidden = true;
	strokeContrast.hidden = true;
	strokeWidth.hidden = true;
	strokeFirstColor.hidden = true;
	sOneType.hidden = true;
	sOneStart.hidden = true;
	sOneEnd.hidden = true;
	sOneFactor.hidden = true;
	strokeSecondColor.hidden = true;
	sTwoType.hidden = true;
	sTwoStart.hidden = true;
	sTwoEnd.hidden = true;
	sTwoFactor.hidden = true;
	if(Stroke.Type != 'None'){
		strokeColorChange();
	} else {
		sOneCheck.disabled = true;
		Motion.sOneCheck = false;
		sTwoCheck.disabled = true;
		Motion.sTwoCheck = false;
	}
	gui.refresh();
}

function strokeColorChange() {
	switch (Stroke.colorType) {
		case 'Solid':
			strokeMeshSeparatorA.hidden = false;
			strokeWidth.hidden = false;
			strokeColorType.hidden = false;
			strokeColorSeparatorA.hidden = false;
			strokeFirstColor.hidden = false;
			sOneType.hidden = true;
			sOneStart.hidden = true;
			sOneEnd.hidden = true;
			sOneFactor.hidden = true;
			sOneCheck.disabled = false;
			strokeColorSeparatorB.hidden = true;
			strokeSecondColor.hidden = true;
			sTwoType.hidden = true;
			sTwoStart.hidden = true;
			sTwoEnd.hidden = true;
			sTwoFactor.hidden = true;
			sTwoCheck.disabled = true;
			Motion.sTwoCheck = false;
			strokeColorSeparatorC.hidden = false;
			strokeContrast.hidden = false;
			strokeMotionChange();
			break;
		
		case 'Gradient':
			strokeMeshSeparatorA.hidden = false;
			strokeWidth.hidden = false;
			strokeColorType.hidden = false;
			strokeColorSeparatorA.hidden = false;
			strokeFirstColor.hidden = false;
			sOneType.hidden = true;
			sOneStart.hidden = true;
			sOneEnd.hidden = true;
			sOneFactor.hidden = true;
			sOneCheck.disabled = false;
			strokeColorSeparatorB.hidden = false;
			strokeSecondColor.hidden = false;
			sTwoType.hidden = true;
			sTwoStart.hidden = true;
			sTwoEnd.hidden = true;
			sTwoFactor.hidden = true;
			sTwoCheck.disabled = false;
			strokeColorSeparatorC.hidden = false;
			strokeContrast.hidden = false;
			strokeMotionChange();
			break;
	}
	gui.refresh();
}

function strokeMotionChange() {
	if (Motion.sOneCheck == true) {
		strokeFirstColor.hidden = true;
		switch (Motion.sOneType) {
			case 'Blend Color':
				sOneType.hidden = false;
				sOneStart.hidden = false;
				sOneEnd.hidden = false;
				sOneFactor.hidden = false;
				break;
			case 'Hue Forward':
			case 'Hue Backward':
				sOneType.hidden = false;
				sOneStart.hidden = false;
				sOneEnd.hidden = true;
				sOneFactor.hidden = false;
				break;
		}
	}
	if (Motion.sTwoCheck == true) {
		strokeSecondColor.hidden = true;
		switch (Motion.sTwoType) {
			case 'Blend Color':
				sTwoType.hidden = false;
				sTwoStart.hidden = false;
				sTwoEnd.hidden = false;
				sTwoFactor.hidden = false;
				break;
			case 'Hue Forward':
			case 'Hue Backward':
				sTwoType.hidden = false;
				sTwoStart.hidden = false;
				sTwoEnd.hidden = true;
				sTwoFactor.hidden = false;
				break;
		}
	}
	gui.refresh();
}

function axisChange() {
	if (Motion.xAxisCheck) {
		planeXAxis.hidden = true;
		xAxisMotion.hidden = false;
		xAxisFactor.hidden = false;
		xAxisPoint.hidden = false;
	} else {
		planeXAxis.hidden = false;
		xAxisMotion.hidden = true;
		xAxisFactor.hidden = true;
		xAxisPoint.hidden = true;
	}	
	if (Motion.yAxisCheck) {
		planeYAxis.hidden = true;
		yAxisMotion.hidden = false;
		yAxisFactor.hidden = false;
		yAxisPoint.hidden = false;
	} else {
		planeYAxis.hidden = false;
		yAxisMotion.hidden = true;
		yAxisFactor.hidden = true;
		yAxisPoint.hidden = true;
	}
	if (Motion.zAxisCheck) {
		planeZAxis.hidden = true;
		zAxisMotion.hidden = false;
		zAxisFactor.hidden = false;
		zAxisPoint.hidden = false;
	} else {
		planeZAxis.hidden = false;
		zAxisMotion.hidden = true;
		zAxisFactor.hidden = true;
		zAxisPoint.hidden = true;
	}
	gui.refresh();
}

function tiltMotionChange() {
	if (Motion.xTiltCheck) {
		planeXTilt.hidden = true;
		xTiltType.hidden = false;
		xTiltFactor.hidden = false;
		switch(Motion.xTiltType){
			case 'Swing':
				xTiltMotion.hidden = false;
				xTiltPoint.hidden = false;
				xTiltStart.hidden = true;
				break;			
			case 'Spin Forward':
			case 'Spin Backward':
				xTiltStart.hidden = false;
				xTiltMotion.hidden = true;
				xTiltPoint.hidden = true;
				break;
		}	
	} else {
		planeXTilt.hidden = false;
		xTiltType.hidden = true;
		xTiltStart.hidden = true;
		xTiltMotion.hidden = true;
		xTiltFactor.hidden = true;
		xTiltPoint.hidden = true;
	}	
	
	if (Motion.yTiltCheck) {
		planeYTilt.hidden = true;
		yTiltType.hidden = false;
		yTiltFactor.hidden = false;
		switch(Motion.yTiltType){
			case 'Swing':
				yTiltMotion.hidden = false;
				yTiltPoint.hidden = false;
				yTiltStart.hidden = true;
				break;			
			case 'Spin Forward':
			case 'Spin Backward':
				yTiltStart.hidden = false;
				yTiltMotion.hidden = true;
				yTiltPoint.hidden = true;
				break;
		}	
	} else {
		planeYTilt.hidden = false;
		yTiltType.hidden = true;
		yTiltStart.hidden = true;
		yTiltMotion.hidden = true;
		yTiltFactor.hidden = true;
		yTiltPoint.hidden = true;
	}	
	
	if (Motion.zTiltCheck) {
		planeZTilt.hidden = true;
		zTiltType.hidden = false;
		zTiltFactor.hidden = false;
		switch(Motion.zTiltType){
			case 'Swing':
				zTiltMotion.hidden = false;
				zTiltPoint.hidden = false;
				zTiltStart.hidden = true;
				break;			
			case 'Spin Forward':
			case 'Spin Backward':
				zTiltStart.hidden = false;
				zTiltMotion.hidden = true;
				zTiltPoint.hidden = true;
				break;
		}	
	} else {
		planeZTilt.hidden = false;
		zTiltType.hidden = true;
		zTiltStart.hidden = true;
		zTiltMotion.hidden = true;
		zTiltFactor.hidden = true;
		zTiltPoint.hidden = true;
	}	
	gui.refresh();
}