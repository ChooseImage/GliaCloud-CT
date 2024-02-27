window.onload = function() {
	this.focus();
}

p5.disableFriendlyErrors = true;
P5Capture.setDefaultOptions({
	disableUi: "true",
	autoSaveDuration: 300,
});

function seedEvent(num) {
	if (num != undefined) {
		seed = num;
	} else {
		seed = Math.floor(Math.random() * 10000) + 1;
	}
	simplex = createNoise4D(alea(seed));
	simplex2 = createNoise2D(alea(seed));
	updatePlane();
	resetFrames();
	noiseSeed.title = 'Seed: #' + seed;
}

function fullscreenEvent() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else if (document.exitFullscreen) {
		document.exitFullscreen();
	}
}

function windowColorChange() {
	let body;
	let c = map(System.windowColor, 0, 100, 0, 255);
	let col = 'rgb(' + c + ',' + c + ',' + c + ')';
	body = select('body');
	body.style('background-color', col);
}

function settingsSave(){
	localStorage.setItem("windowColor", JSON.stringify(System.windowColor));
}

function settingsLoad(){
	let data = localStorage.getItem("windowColor");
	if(JSON.parse(data) != null){
		System.windowColor = JSON.parse(data);
	}
	gui.refresh();
}

function checkBrowser() {
	checkAgent = navigator.userAgent.indexOf("Chrome") > -1;
}

function checkStates() {
	let loopCheck = false;

	if (!Number.isInteger(round(Motion.bgOneFactor, 1)) && Motion.bgOneCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.bgTwoFactor, 1)) && Motion.bgTwoCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.bgThreeFactor, 1)) && Motion.bgThreeCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.ampFactor, 1)) && Motion.ampCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.xfreqFactor, 1)) && Motion.xfreqCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.yfreqFactor, 1)) && Motion.yfreqCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.detailFactor, 1)) && Motion.detailCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.easeFactor, 1)) && Motion.easeCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.flowFactor, 1)) && Motion.flowCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.fOneFactor, 1)) && Motion.fOneCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.fTwoFactor, 1)) && Motion.fTwoCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.sOneFactor, 1)) && Motion.sOneCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.sTwoFactor, 1)) && Motion.sTwoCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.FOVFactor, 1)) && Motion.FOVCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.scaleFactor, 1)) && Motion.scaleCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.xAxisFactor, 1)) && Motion.xAxisCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.yAxisFactor, 1)) && Motion.yAxisCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.zAxisFactor, 1)) && Motion.zAxisCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.xTiltFactor, 1)) && Motion.xTiltCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.yTiltFactor, 1)) && Motion.yTiltCheck == true) loopCheck = true;
	if (!Number.isInteger(round(Motion.zTiltFactor, 1)) && Motion.zTiltCheck == true) loopCheck = true;

	if (loopCheck == true) {
		Loop.State = 'NO LOOP';
	} else if (Flow.Force != 0 && Motion.flowCheck == false) {
		Loop.State = 'NO LOOP';
	} else if (Flow.Force != 0 && Motion.flowType == 'Addition') {
		Loop.State = 'NO LOOP';
	} else {
		Loop.State = 'SEAMLESS';
	}
}

function loopsStatesCheck(){
	if ( Motion.bgOneCheck == false &&
		   Motion.bgTwoCheck == false &&
			 Motion.bgThreeCheck == false &&
			 Motion.ampCheck == false &&
			 Motion.xfreqCheck == false &&
			 Motion.yfreqCheck == false &&
			 Motion.detailCheck == false &&
			 Motion.easeCheck == false &&
			 Motion.flowCheck == false &&
			 Motion.fOneCheck == false &&
			 Motion.fTwoCheck == false &&
			 Motion.sOneCheck == false && 
			 Motion.sTwoCheck == false &&
			 Motion.FOVCheck == false &&
			 Motion.scaleCheck == false &&
			 Motion.xAxisCheck == false &&
			 Motion.yAxisCheck == false &&
		   Motion.zAxisCheck == false &&
			 Motion.xTiltCheck == false &&
			 Motion.yTiltCheck == false &&
			 Motion.zTiltCheck == false )
	{ return false } else { return true }
}

function motionStates(){

	if(Motion.bgOneCheck == true || Motion.bgTwoCheck == true || Motion.bgThreeCheck == true){
		canvasMotionFolder.expanded = true;
	} else {
		canvasMotionFolder.expanded = false;
	}
	
	if(Motion.ampCheck == true || Motion.xfreqCheck == true || Motion.yfreqCheck == true || Motion.detailCheck == true){
		noiseMotionFolder.expanded = true;
	} else {
		noiseMotionFolder.expanded = false;
	}
	
	if(Motion.easeCheck == true){
		easeMotionFolder.expanded = true;
	} else {
		easeMotionFolder.expanded = false;
	}
	
	if(Motion.flowCheck == true){
		flowMotionFolder.expanded = true;
	} else {
		flowMotionFolder.expanded = false;
	}
	
	if(Motion.fOneCheck == true || Motion.fTwoCheck == true){
		fColorMotionFolder.expanded = true;
	} else {
		fColorMotionFolder.expanded = false;
	}
	
	if(Motion.sOneCheck == true || Motion.sTwoCheck == true){
		sColorMotionFolder.expanded = true;
	} else {
		sColorMotionFolder.expanded = false;
	}
	
	if(Motion.FOVCheck == true || Motion.scaleCheck == true){
		cameraMotionFolder.expanded = true;
	} else {
		cameraMotionFolder.expanded = false;
	}
	
	if(Motion.xAxisCheck == true || Motion.yAxisCheck == true || Motion.zAxisCheck == true){
		axisMotionFolder.expanded = true;
	} else {
		axisMotionFolder.expanded = false;
	}
	
	if(Motion.xTiltCheck == true || Motion.yTiltCheck == true || Motion.zTiltCheck == true){
		tiltMotionFolder.expanded = true;
	} else {
		tiltMotionFolder.expanded = false;
	}	
}

function shuffleColors() {
	colorArray = shuffle(colorArray);
}