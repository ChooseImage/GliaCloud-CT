function presetChange() {
	presetBool = false;
	
	Main.canvasWidth = min(window.innerWidth, preset.Main.canvasWidth);
	Main.canvasHeight = min(window.innerHeight, preset.Main.canvasHeight);

	BG.Type = preset.BG.Type;
	BG.firstColor = {r: preset.BG.firstColor.r, g: preset.BG.firstColor.g, b: preset.BG.firstColor.b};
	BG.secondColor = {r: preset.BG.secondColor.r, g: preset.BG.secondColor.g, b: preset.BG.secondColor.b};
	BG.thirdColor = {r: preset.BG.thirdColor.r, g: preset.BG.thirdColor.g, b: preset.BG.thirdColor.b};
	BG.gradientPosition = preset.BG.gradientPosition;

	Plane.Width = preset.Plane.Width;
	Plane.Height = preset.Plane.Height;
	Plane.xCell = preset.Plane.xCell;
	Plane.yCell = preset.Plane.yCell;
	Plane.xAxis = preset.Plane.xAxis;
	Plane.yAxis = preset.Plane.yAxis;
	Plane.zAxis = preset.Plane.zAxis;
	Plane.xTilt = preset.Plane.xTilt;
	Plane.yTilt = preset.Plane.yTilt;
	Plane.zTilt = preset.Plane.zTilt;
	Plane.xLocal = preset.Plane.xLocal;
	Plane.yLocal = preset.Plane.yLocal;
	Plane.zLocal = preset.Plane.zLocal;
	preset.Noise.seedNum == 0 ? Noise.seedNum = Math.floor(Math.random() * 10000) + 1 : Noise.seedNum = preset.Noise.seedNum;
	Noise.Type = preset.Noise.Type;
	Noise.Amplitude = preset.Noise.Amplitude;
	Noise.xFreq = preset.Noise.xFreq;
	Noise.yFreq = preset.Noise.yFreq;
	Noise.Detail = preset.Noise.Detail;
	Noise.detailScale = preset.Noise.detailScale;
	Noise.Elevation = preset.Noise.Elevation;

	Ease.Type = preset.Ease.Type;
	Ease.rowMode = preset.Ease.rowMode;
	Ease.roundMode = preset.Ease.roundMode;
	Ease.Width = preset.Ease.Width;
	Ease.Relief = preset.Ease.Relief;

	Flow.Force = preset.Flow.Force;
	Flow.Angle = preset.Flow.Angle;

	Fill.Type = preset.Fill.Type;
	Fill.size3DType = preset.Fill.size3DType;
	Fill.sizeXOBJ = preset.Fill.sizeXOBJ;
	Fill.sizeYOBJ = preset.Fill.sizeYOBJ;
	Fill.sizeZOBJ = preset.Fill.sizeZOBJ;
	Fill.sizeOBJ = preset.Fill.sizeOBJ;
	Fill.noiseSizeMin = preset.Fill.noiseSizeMin;
	Fill.noiseSizeMax = preset.Fill.noiseSizeMax;
	Fill.randomOBJ = preset.Fill.randomOBJ;
	Fill.multiplyOBJ = preset.Fill.multiplyOBJ;
	Fill.colorType = preset.Fill.colorType;
	Fill.gradDirection = preset.Fill.gradDirection;
	Fill.mapDirection = preset.Fill.mapDirection;
	Fill.firstColor = {r: preset.Fill.firstColor.r, g: preset.Fill.firstColor.g, b: preset.Fill.firstColor.b};
	Fill.secondColor = {r: preset.Fill.secondColor.r, g: preset.Fill.secondColor.g, b: preset.Fill.secondColor.b};
	Fill.colorNoise = preset.Fill.colorNoise;
	Fill.Contrast = preset.Fill.Contrast;

	Stroke.Type = preset.Stroke.Type;
	Stroke.colorType = preset.Stroke.colorType;
	Stroke.firstColor = {r: preset.Stroke.firstColor.r, g: preset.Stroke.firstColor.g, b: preset.Stroke.firstColor.b};
	Stroke.secondColor = {r: preset.Stroke.secondColor.r, g: preset.Stroke.secondColor.g, b: preset.Stroke.secondColor.b};
	Stroke.Weight = preset.Stroke.Weight;
	Stroke.Position = preset.Stroke.Position;
	Stroke.Contrast = preset.Stroke.Contrast;

	Camera.Type = preset.Camera.Type;
	Camera.perspPreset = preset.Camera.perspPreset;
	Camera.orthoPreset = preset.Camera.orthoPreset;
	Camera.FOV = preset.Camera.FOV;
	Camera.xValue = preset.Camera.xValue;
	Camera.yValue = preset.Camera.yValue;
	Camera.Zoom = preset.Camera.Zoom;
	Camera.Scale = preset.Camera.Scale;
	
	Motion.bgOneCheck = preset.Motion.bgOneCheck;
	Motion.bgOneType = preset.Motion.bgOneType;
	Motion.bgOneStart = {r: preset.Motion.bgOneStart.r, g: preset.Motion.bgOneStart.g, b: preset.Motion.bgOneStart.b};
	Motion.bgOneEnd = {r: preset.Motion.bgOneEnd.r, g: preset.Motion.bgOneEnd.g, b: preset.Motion.bgOneEnd.b};
	Motion.bgOneFactor = preset.Motion.bgOneFactor;
	Motion.bgOnePoint = preset.Motion.bgOnePoint;
	
	Motion.bgTwoCheck = preset.Motion.bgTwoCheck;
	Motion.bgTwoType = preset.Motion.bgTwoType;
	Motion.bgTwoStart = {r: preset.Motion.bgTwoStart.r, g: preset.Motion.bgTwoStart.g, b: preset.Motion.bgTwoStart.b};
	Motion.bgTwoEnd = {r: preset.Motion.bgTwoEnd.r, g: preset.Motion.bgTwoEnd.g, b: preset.Motion.bgTwoEnd.b};
	Motion.bgTwoFactor = preset.Motion.bgTwoFactor;
	Motion.bgTwoPoint = preset.Motion.bgTwoPoint;
	
	Motion.bgThreeCheck = preset.Motion.bgThreeCheck;
	Motion.bgThreeType = preset.Motion.bgThreeType;
	Motion.bgThreeStart = {r: preset.Motion.bgThreeStart.r, g: preset.Motion.bgThreeStart.g, b: preset.Motion.bgThreeStart.b};
	Motion.bgThreeEnd = {r: preset.Motion.bgThreeEnd.r, g: preset.Motion.bgThreeEnd.g, b: preset.Motion.bgThreeEnd.b};
	Motion.bgThreeFactor = preset.Motion.bgThreeFactor;
	Motion.bgThreePoint = preset.Motion.bgThreePoint;
	
	Motion.ampCheck = preset.Motion.ampCheck;
	Motion.ampInterval.min = preset.Motion.ampInterval.min;
	Motion.ampInterval.max = preset.Motion.ampInterval.max;
	Motion.ampFactor = preset.Motion.ampFactor;
	Motion.ampPoint = preset.Motion.ampPoint;
	
	Motion.xfreqCheck = preset.Motion.xfreqCheck;
	Motion.xfreqInterval.min = preset.Motion.xfreqInterval.min;
	Motion.xfreqInterval.max = preset.Motion.xfreqInterval.max;
	Motion.xfreqFactor = preset.Motion.xfreqFactor;
	Motion.xfreqPoint = preset.Motion.xfreqPoint;
	
	Motion.yfreqCheck = preset.Motion.yfreqCheck;
	Motion.yfreqInterval.min = preset.Motion.yfreqInterval.min;
	Motion.yfreqInterval.max = preset.Motion.yfreqInterval.max;
	Motion.yfreqFactor = preset.Motion.yfreqFactor;
	Motion.yfreqPoint = preset.Motion.yfreqPoint;
	
	Motion.detailCheck = preset.Motion.detailCheck;
	Motion.detailInterval.min = preset.Motion.detailInterval.min;
	Motion.detailInterval.max = preset.Motion.detailInterval.max;
	Motion.detailFactor = preset.Motion.detailFactor;
	Motion.detailPoint = preset.Motion.detailPoint;
	
	Motion.easeCheck = preset.Motion.easeCheck;
	Motion.easeInterval.min = preset.Motion.easeInterval.min;
	Motion.easeInterval.max = preset.Motion.easeInterval.max;
	Motion.easeFactor = preset.Motion.easeFactor;
	Motion.easePoint = preset.Motion.easePoint;
	
	Motion.flowCheck = preset.Motion.flowCheck;
	Motion.flowType = preset.Motion.flowType;
	Motion.flowStart = preset.Motion.flowStart;
	Motion.flowAddition = preset.Motion.flowAddition;
	Motion.flowSeamless = preset.Motion.flowSeamless;
	Motion.flowFactor = preset.Motion.flowFactor;
	Motion.flowPoint = preset.Motion.flowPoint;
	
	Motion.fOneCheck = preset.Motion.fOneCheck;
	Motion.fOneType = preset.Motion.fOneType;
	Motion.fOneStart = {r: preset.Motion.fOneStart.r, g: preset.Motion.fOneStart.g, b: preset.Motion.fOneStart.b};
	Motion.fOneEnd = {r: preset.Motion.fOneEnd.r, g: preset.Motion.fOneEnd.g, b: preset.Motion.fOneEnd.b};
	Motion.fOneFactor = preset.Motion.fOneFactor;
	Motion.fOnePoint = preset.Motion.fOnePoint;
	
	Motion.fTwoCheck = preset.Motion.fTwoCheck;
	Motion.fTwoType = preset.Motion.fTwoType;
	Motion.fTwoStart = {r: preset.Motion.fTwoStart.r, g: preset.Motion.fTwoStart.g, b: preset.Motion.fTwoStart.b};
	Motion.fTwoEnd = {r: preset.Motion.fTwoEnd.r, g: preset.Motion.fTwoEnd.g, b: preset.Motion.fTwoEnd.b};
	Motion.fTwoFactor = preset.Motion.fTwoFactor;
	Motion.fTwoPoint = preset.Motion.fTwoPoint;
	
	Motion.sOneCheck = preset.Motion.sOneCheck;
	Motion.sOneType = preset.Motion.sOneType;
	Motion.sOneStart = {r: preset.Motion.sOneStart.r, g: preset.Motion.sOneStart.g, b: preset.Motion.sOneStart.b};
	Motion.sOneEnd = {r: preset.Motion.sOneEnd.r, g: preset.Motion.sOneEnd.g, b: preset.Motion.sOneEnd.b};
	Motion.sOneFactor = preset.Motion.sOneFactor;
	Motion.sOnePoint = preset.Motion.sOnePoint;
	
	Motion.sTwoCheck = preset.Motion.sTwoCheck;
	Motion.sTwoType = preset.Motion.sTwoType;
	Motion.sTwoStart = {r: preset.Motion.sTwoStart.r, g: preset.Motion.sTwoStart.g, b: preset.Motion.sTwoStart.b};
	Motion.sTwoEnd = {r: preset.Motion.sTwoEnd.r, g: preset.Motion.sTwoEnd.g, b: preset.Motion.sTwoEnd.b};
	Motion.sTwoFactor = preset.Motion.sTwoFactor;
	Motion.sTwoPoint = preset.Motion.sTwoPoint;
	
	Motion.FOVCheck = preset.Motion.FOVCheck;
	Motion.FOVInterval.min = preset.Motion.FOVInterval.min;
	Motion.FOVInterval.max = preset.Motion.FOVInterval.max;
	Motion.FOVFactor = preset.Motion.FOVFactor;
	Motion.FOVPoint = preset.Motion.FOVPoint;
		
	Motion.scaleCheck = preset.Motion.scaleCheck;
	Motion.scaleInterval.min = preset.Motion.scaleInterval.min;
	Motion.scaleInterval.max = preset.Motion.scaleInterval.max;
	Motion.scaleFactor = preset.Motion.scaleFactor;
	Motion.scalePoint = preset.Motion.scalePoint;
	
	Motion.xAxisCheck = preset.Motion.xAxisCheck;
	Motion.xAxisInterval.min = preset.Motion.xAxisInterval.min;
	Motion.xAxisInterval.max = preset.Motion.xAxisInterval.max;
	Motion.xAxisFactor = preset.Motion.xAxisFactor;
	Motion.xAxisPoint = preset.Motion.xAxisPoint;
	
	Motion.yAxisCheck = preset.Motion.yAxisCheck;
	Motion.yAxisInterval.min = preset.Motion.yAxisInterval.min;
	Motion.yAxisInterval.max = preset.Motion.yAxisInterval.max;
	Motion.yAxisFactor = preset.Motion.yAxisFactor;
	Motion.yAxisPoint = preset.Motion.yAxisPoint;
	
	Motion.zAxisCheck = preset.Motion.zAxisCheck;
	Motion.zAxisInterval.min = preset.Motion.zAxisInterval.min;
	Motion.zAxisInterval.max = preset.Motion.zAxisInterval.max;
	Motion.zAxisFactor = preset.Motion.zAxisFactor;
	Motion.zAxisPoint = preset.Motion.zAxisPoint;
	
	Motion.xTiltCheck = preset.Motion.xTiltCheck;
	Motion.xTiltType = preset.Motion.xTiltType;
	Motion.xTiltStart = preset.Motion.xTiltStart;
	Motion.xTiltInterval.min = preset.Motion.xTiltInterval.min;
	Motion.xTiltInterval.max = preset.Motion.xTiltInterval.max;
	Motion.xTiltFactor = preset.Motion.xTiltFactor;
	Motion.xTiltPoint = preset.Motion.xTiltPoint;
	
	Motion.yTiltCheck = preset.Motion.yTiltCheck;
	Motion.yTiltType = preset.Motion.yTiltType;
	Motion.yTiltStart = preset.Motion.yTiltStart;
	Motion.yTiltInterval.min = preset.Motion.yTiltInterval.min;
	Motion.yTiltInterval.max = preset.Motion.yTiltInterval.max;
	Motion.yTiltFactor = preset.Motion.yTiltFactor;
	Motion.yTiltPoint = preset.Motion.yTiltPoint;
	
	Motion.zTiltCheck = preset.Motion.zTiltCheck;
	Motion.zTiltType = preset.Motion.zTiltType;
	Motion.zTiltStart = preset.Motion.zTiltStart;
	Motion.zTiltInterval.min = preset.Motion.zTiltInterval.min;
	Motion.zTiltInterval.max = preset.Motion.zTiltInterval.max;
	Motion.zTiltFactor = preset.Motion.zTiltFactor;
	Motion.zTiltPoint = preset.Motion.zTiltPoint;

	Loop.Speed = preset.Loop.Speed;
	Loop.Length = preset.Loop.Length;
	
	resetFrames();
	seedEvent(Noise.seedNum);
	updateFunctions();
	canvasResize();
	gui.refresh();
	presetBool = true;
}

function resetFrames() {
	frame = 0;
	xStepFlow = 0;
	yStepFlow = 0;
	Motion.bgOneFrame = Motion.bgOnePoint;
	Motion.bgTwoFrame = Motion.bgTwoPoint;
	Motion.bgThreeFrame = Motion.bgThreePoint;
	Motion.ampFrame = Motion.ampPoint;
	Motion.xfreqFrame = Motion.xfreqPoint;
	Motion.yfreqFrame = Motion.yfreqPoint;
	Motion.detailFrame = Motion.detailPoint;
	Motion.easeFrame = Motion.easePoint;
	Motion.flowFrame = Motion.flowPoint;
	Motion.fOneFrame = Motion.fOnePoint;
	Motion.fTwoFrame = Motion.fTwoPoint;
	Motion.sOneFrame = Motion.sOnePoint;
	Motion.sTwoFrame = Motion.sTwoPoint;
	Motion.FOVFrame = Motion.FOVPoint;
	Motion.scaleFrame = Motion.scalePoint;
	Motion.xAxisFrame = Motion.xAxisPoint;
	Motion.yAxisFrame = Motion.yAxisPoint;
	Motion.zAxisFrame = Motion.zAxisPoint;
	Motion.xTiltFrame = Motion.xTiltPoint;
	Motion.yTiltFrame = Motion.yTiltPoint;
	Motion.zTiltFrame = Motion.zTiltPoint;
}


function importPreset() {
	let element = document.createElement('div');
	element.innerHTML = '<input type="file" accept="application/json">';
	let fileInput = element.firstChild;

	fileInput.addEventListener('change', function() {
		var file = fileInput.files[0];
		let reader = new FileReader(file);
		reader.onload = async (e) => {
			let aaa = e.target.result;
			preset = await JSON.parse(aaa);
			Main.Preset = 'User Preset';
			presetChange();
		}
		reader.readAsText(file);
	});
	fileInput.click();
}

function loadPreset(data) {
	fetch(data)
	.then(response => response.json())
	.then(json => { 
		preset = json;
		presetChange(); 
	});
}