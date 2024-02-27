function cameraFunction() {
	Camera.Coordinates = 'Camera (X): ' + round(Camera.xValue, 4) + '\nCamera (Y): ' + round(Camera.yValue, 4) + '\nZoom: ' + round(Camera.Zoom, 0);
	switch (Camera.Type) {
		case 'Perspective':
			g.rotateX(HALF_PI);
			g.rotateY(PI);
			g.scale(Camera.Scale);
			g.perspective(radians(Camera.FOV), width / height, 2, 25000);	
			if (Plane.zLocal == false) g.rotateZ(radians(Plane.zTilt));
			if (Plane.xLocal == false) g.rotateX(radians(Plane.xTilt));
			if (Plane.yLocal == false) g.rotateY(radians(Plane.yTilt));
			g.translate(
				map(Plane.xAxis, 100, -100, -Main.canvasWidth, Main.canvasWidth),
				map(Plane.yAxis, 100, -100, -Main.canvasWidth, Main.canvasWidth),
				map(Plane.zAxis, 100, -100, -Main.zMax, Main.zMax));
			//map(Plane.zAxis, 100, -100, -(Main.canvasHeight + (Noise.Amplitude * 0.25)), Main.canvasHeight + (Noise.Amplitude * 0.25)));
			if (Plane.zLocal == true) g.rotateZ(radians(Plane.zTilt));
			if (Plane.xLocal == true) g.rotateX(radians(Plane.xTilt));
			if (Plane.yLocal == true) g.rotateY(radians(Plane.yTilt));
			g.translate(
				(-Plane.Width / 2 + (Plane.xCell / 2) + (Plane.Width % Plane.xCell / 2)),
				(-Plane.Height / 2 + (Plane.yCell / 2) + (Plane.Height % Plane.yCell / 2)),
				0);
			break;

		case 'Ortho':
			g.rotateX(HALF_PI);
			g.scale(Camera.Scale);
			if (Plane.zLocal == false) g.rotateZ(radians(Plane.zTilt));
			if (Plane.xLocal == false) g.rotateX(radians(Plane.xTilt));
			if (Plane.yLocal == false) g.rotateY(radians(Plane.yTilt));
			g.translate(
				map(Plane.xAxis, -100, 100, -Main.canvasWidth * 0.75, Main.canvasWidth * 0.75),
				map(Plane.yAxis, -100, 100, -Main.canvasWidth * 0.75, Main.canvasWidth * 0.75),
				map(Plane.zAxis, -100, 100, -Main.zMax * 0.5, Main.zMax * 0.5));
			if (Plane.zLocal == true) g.rotateZ(radians(Plane.zTilt));
			if (Plane.xLocal == true) g.rotateX(radians(Plane.xTilt));
			if (Plane.yLocal == true) g.rotateY(radians(Plane.yTilt));
			g.ortho(-width / 2, width / 2, height / 2, -height / 2, -1000, 25000);
			g.translate(
				-Plane.Width / 2 + (Plane.xCell / 2) + (Plane.Width % Plane.xCell / 2),
				-Plane.Height / 2 + (Plane.yCell / 2) + (Plane.Height % Plane.yCell / 2),
				0);
			break;
	}
}

function axisReset() {
	Plane.xAxis = 0;
	Plane.yAxis = 0;
	Plane.zAxis = 0;
	gui.refresh();
}

function tiltReset() {
	Plane.xTilt = 0;
	Plane.yTilt = 0;
	Plane.zTilt = 0;
	gui.refresh();
}

function cameraTypeChange() {
	if (Camera.Type == 'Perspective') {
		cameraSeparatorB.hidden = false;
		cameraFOV.hidden = false;
		cameraFOVMotion.hidden = false;
		cameraFOVFactor.hidden = false;
		cameraFOVPoint.hidden = false;
		cameraFOVCheck.disabled = false;	
	}
	if (Camera.Type == 'Ortho') {
		cameraSeparatorB.hidden = true;
		cameraFOV.hidden = true;
		cameraFOVMotion.hidden = true;
		cameraFOVFactor.hidden = true;
		cameraFOVPoint.hidden = true;
		Motion.FOVCheck = false;
		cameraFOVCheck.disabled = true;
	}
	scaleMotionChange();
	FOVMotionChange();
	gui.refresh();
}

function FOVMotionChange(){
	if (Motion.FOVCheck) {
		cameraFOV.hidden = true;
		cameraFOVMotion.hidden = false;
		cameraFOVFactor.hidden = false;
		cameraFOVPoint.hidden = false;
	} else {
		if(Camera.Type != 'Ortho') cameraFOV.hidden = false;
		cameraFOVMotion.hidden = true;
		cameraFOVFactor.hidden = true;
		cameraFOVPoint.hidden = true;
	}
	gui.refresh();
}

function scaleMotionChange(){
	if (Motion.scaleCheck) {
		cameraScale.hidden = true;
		cameraScaleMotion.hidden = false;
		cameraScaleFactor.hidden = false;
		cameraScalePoint.hidden = false;
	} else {
		cameraScale.hidden = false;
		cameraScaleMotion.hidden = true;
		cameraScaleFactor.hidden = true;
		cameraScalePoint.hidden = true;
	}
	gui.refresh();
}

function cameraPresetChange() {
	if (Camera.Type == 'Perspective' && presetBool) {
		switch (Camera.perspPreset) {
			case 'Front':
				Camera.xValue = 0;
				Camera.yValue = 0;
				Camera.Zoom = 500;
				Camera.FOV = 75;
				Camera.Scale = 1;
				break;

			case 'Top':
				Camera.xValue = 0;
				Camera.yValue = HALF_PI;
				Camera.Zoom = 500;
				Camera.FOV = 75;
				Camera.Scale = 1;
				break;

			case 'Perspective':
				Camera.xValue = -0.5;
				Camera.yValue = 0.5;
				Camera.Zoom = 500;
				Camera.FOV = 75;
				Camera.Scale = 1;
				break;
		}
	}
	if (Camera.Type == 'Ortho' && presetBool) {
		switch (Camera.orthoPreset) {
			case 'Front':
				Camera.xValue = 0;
				Camera.yValue = 0;
				Camera.Scale = 1;
				break;

			case 'Front 45°':
				Camera.xValue = 0;
				Camera.yValue = -0.5;
				Camera.Scale = 1;
				break;

			case 'Top':
				Camera.xValue = 0;
				Camera.yValue = -HALF_PI;
				Camera.Scale = 1;
				break;

			case 'Diagonal':
				Camera.xValue = -1;
				Camera.yValue = -0.5;
				Camera.Scale = 1;
				break;
		}
	}
	gui.refresh();
	updateGraphics();
	cameraFOVChange();
}

function cameraFOVChange() {
	if(Camera.FOV < 75){
		Camera.zoomSens = map2(Camera.FOV, Camera.minFOV, 75, 0.3, 0.1, 'Cubic', BOTH);
	} else {
		Camera.zoomSens = map2(Camera.FOV, 75, Camera.maxFOV, 0.1, 0.04, 'Cubic', BOTH);
	}
}
