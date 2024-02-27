function motionFunction() {
	let frame = 360 / (Loop.Length * Main.frameRate);

	if (Motion.bgOneCheck) {
		let c = colorMotion(Motion.bgOneType, Motion.bgOneStart, Motion.bgOneEnd, Motion.bgOneFrame, Motion.bgOneFactor);
		BG.firstColor.r = c[0];
		BG.firstColor.g = c[1];
		BG.firstColor.b = c[2];
		Motion.bgOneFrame += frame;
	}

	if (Motion.bgTwoCheck) {
		let c = colorMotion(Motion.bgTwoType, Motion.bgTwoStart, Motion.bgTwoEnd, Motion.bgTwoFrame, Motion.bgTwoFactor);
		BG.secondColor.r = c[0];
		BG.secondColor.g = c[1];
		BG.secondColor.b = c[2];
		Motion.bgTwoFrame += frame;
	}

	if (Motion.bgThreeCheck) {
		let c = colorMotion(Motion.bgThreeType, Motion.bgThreeStart, Motion.bgThreeEnd, Motion.bgThreeFrame, Motion.bgThreeFactor);
		BG.thirdColor.r = c[0];
		BG.thirdColor.g = c[1];
		BG.thirdColor.b = c[2];
		Motion.bgThreeFrame += frame;
	}

	if (Motion.ampCheck) {
		Noise.Amplitude = map2(cos(radians(Motion.ampFrame * Motion.ampFactor)), 1, -1, Motion.ampInterval.min, Motion.ampInterval.max, 'Linear', BOTH);
		Motion.ampFrame += frame;
	}

	if (Motion.xfreqCheck) {
		Noise.xFreq = map2(cos(radians(Motion.xfreqFrame * Motion.xfreqFactor)), 1, -1, Motion.xfreqInterval.min, Motion.xfreqInterval.max, 'Linear', BOTH);
		Motion.xfreqFrame += frame;
	}

	if (Motion.yfreqCheck) {
		Noise.yFreq = map2(cos(radians(Motion.yfreqFrame * Motion.yfreqFactor)), 1, -1, Motion.yfreqInterval.min, Motion.yfreqInterval.max, 'Linear', BOTH);
		Motion.yfreqFrame += frame;
	}

	if (Motion.detailCheck) {
		Noise.Detail = map2(cos(radians(Motion.detailFrame * Motion.detailFactor)), 1, -1, Motion.detailInterval.min, Motion.detailInterval.max, 'Linear', BOTH);
		Motion.detailFrame += frame;
	}

	if (Motion.easeCheck) {
		Ease.Width = map2(cos(radians(Motion.easeFrame * Motion.easeFactor)), 1, -1, Motion.easeInterval.min, Motion.easeInterval.max, 'Linear', BOTH);
		Motion.easeFrame += frame;
	}

	if (Motion.flowCheck) {
		switch (Motion.flowType) {
			case 'Addition':
				Flow.Force = Motion.flowStart + map2(cos(radians(Motion.flowFrame * Motion.flowFactor)), 1, -1, 0, Motion.flowAddition, 'Linear', BOTH);
				Motion.flowFrame += frame;
				break;

			case 'Seamless':
				Flow.Force = map2(sin(radians(Motion.flowFrame * Motion.flowFactor)), 1, -1, -Motion.flowSeamless, Motion.flowSeamless, 'Linear', BOTH);
				Motion.flowFrame += frame;
				break;
		}
	}

	if (Motion.fOneCheck) {
		let c = colorMotion(Motion.fOneType, Motion.fOneStart, Motion.fOneEnd, Motion.fOneFrame, Motion.fOneFactor);
		Fill.firstColor.r = c[0];
		Fill.firstColor.g = c[1];
		Fill.firstColor.b = c[2];
		Motion.fOneFrame += frame;
	}
	
	if (Motion.fTwoCheck) {
		let c = colorMotion(Motion.fTwoType, Motion.fTwoStart, Motion.fTwoEnd, Motion.fTwoFrame, Motion.fTwoFactor);
		Fill.secondColor.r = c[0];
		Fill.secondColor.g = c[1];
		Fill.secondColor.b = c[2];
		Motion.fTwoFrame += frame;
	}
	
	if (Motion.sOneCheck) {
		let c = colorMotion(Motion.sOneType, Motion.sOneStart, Motion.sOneEnd, Motion.sOneFrame, Motion.sOneFactor);
		Stroke.firstColor.r = c[0];
		Stroke.firstColor.g = c[1];
		Stroke.firstColor.b = c[2];
		Motion.sOneFrame += frame;
	}
	
	if (Motion.sTwoCheck) {
		let c = colorMotion(Motion.sTwoType, Motion.sTwoStart, Motion.sTwoEnd, Motion.sTwoFrame, Motion.sTwoFactor);
		Stroke.secondColor.r = c[0];
		Stroke.secondColor.g = c[1];
		Stroke.secondColor.b = c[2];
		Motion.sTwoFrame += frame;
	}

	if (Motion.FOVCheck) {
		Camera.FOV = map2(cos(radians(Motion.FOVFrame * Motion.FOVFactor)), 1, -1, Motion.FOVInterval.min, Motion.FOVInterval.max, 'Linear', BOTH);
		Motion.FOVFrame += frame;
	}

	if (Motion.scaleCheck) {
		Camera.Scale = map2(cos(radians(Motion.scaleFrame * Motion.scaleFactor)), 1, -1, Motion.scaleInterval.min, Motion.scaleInterval.max, 'Linear', BOTH);
		Motion.scaleFrame += frame;
	}

	if (Motion.xAxisCheck) {
		Plane.xAxis = map2(cos(radians(Motion.xAxisFrame * Motion.xAxisFactor)), 1, -1, Motion.xAxisInterval.min, Motion.xAxisInterval.max, 'Linear', BOTH);
		Motion.xAxisFrame += frame;
	}

	if (Motion.yAxisCheck) {
		Plane.yAxis = map(cos(radians(Motion.yAxisFrame * Motion.yAxisFactor)), 1, -1, Motion.yAxisInterval.min, Motion.yAxisInterval.max, 'Linear', BOTH);
		Motion.yAxisFrame += frame;
	}

	if (Motion.zAxisCheck) {
		Plane.zAxis = map(cos(radians(Motion.zAxisFrame * Motion.zAxisFactor)), 1, -1, Motion.zAxisInterval.min, Motion.zAxisInterval.max, 'Linear', BOTH);
		Motion.zAxisFrame += frame;
	}

	if (Motion.xTiltCheck) {
		switch (Motion.xTiltType) {

			case 'Spin Forward':
				Plane.xTilt = (Motion.xTiltStart + Motion.xTiltFrame * Motion.xTiltFactor) % 360;
				Motion.xTiltFrame += frame;
				break;
				
			case 'Spin Backward':
				Plane.xTilt = 360 - (Motion.xTiltStart + Motion.xTiltFrame * Motion.xTiltFactor) % 360;
				Motion.xTiltFrame += frame;
				break;

			case 'Swing':
				Plane.xTilt = map2(cos(radians(Motion.xTiltFrame * Motion.xTiltFactor)), 1, -1, Motion.xTiltInterval.min, Motion.xTiltInterval.max, 'Linear', BOTH);
				Motion.xTiltFrame += frame;
				break;
		}
	}

	if (Motion.yTiltCheck) {
		switch (Motion.yTiltType) {
				
			case 'Spin Forward':
				Plane.yTilt = (Motion.yTiltStart + Motion.yTiltFrame * Motion.yTiltFactor) % 360;
				Motion.yTiltFrame += frame;
				break;
				
			case 'Spin Backward':
				Plane.yTilt = 360 - (Motion.yTiltStart + Motion.yTiltFrame * Motion.yTiltFactor) % 360;
				Motion.yTiltFrame += frame;
				break;

			case 'Swing':
				Plane.yTilt = map2(cos(radians(Motion.yTiltFrame * Motion.yTiltFactor)), 1, -1, Motion.yTiltInterval.min, Motion.yTiltInterval.max, 'Linear', BOTH);
				Motion.yTiltFrame += frame;
				break;
		}
	}

	if (Motion.zTiltCheck) {
		switch (Motion.zTiltType) {
				
			case 'Spin Forward':
				Plane.zTilt = (Motion.zTiltStart + Motion.zTiltFrame * Motion.zTiltFactor) % 360;
				Motion.zTiltFrame += frame;
				break;
				
			case 'Spin Backward':
				Plane.zTilt = 360 - (Motion.zTiltStart + Motion.zTiltFrame * Motion.zTiltFactor) % 360;
				Motion.zTiltFrame += frame;
				break;

			case 'Swing':
				Plane.zTilt = map2(cos(radians(Motion.zTiltFrame * Motion.zTiltFactor)), 1, -1, Motion.zTiltInterval.min, Motion.zTiltInterval.max, 'Linear', BOTH);
				Motion.zTiltFrame += frame;
				break;
		}
	}

}

function colorMotion(motionType, startColor, endColor, motionFrame, motionFactor) {
	let tempHue, tempSat, tempLig;
	let h = hue(color(startColor.r, startColor.g, startColor.b));
	let s = saturation(color(startColor.r, startColor.g, startColor.b));
	let l = lightness(color(startColor.r, startColor.g, startColor.b));

	switch (motionType) {
		case 'Blend Color':
			let hEnd = hue(color(endColor.r, endColor.g, endColor.b));
			let sEnd = saturation(color(endColor.r, endColor.g, endColor.b));
			let lEnd = lightness(color(endColor.r, endColor.g, endColor.b));

			if (s == 0 || l == 0) h = hEnd;
			if (sEnd == 0 || lEnd == 0) hEnd = h;
			if (h - hEnd > 180) hEnd = hEnd + 360;
			if (hEnd - h > 180) h = h + 360;

			tempHue = map2(cos(radians(motionFrame * motionFactor)), 1, -1, h, hEnd, 'Linear', BOTH);
			if (tempHue > 360 || tempHue < 360) {
				tempHue = tempHue % 360;
			}

			tempSat = map2(cos(radians(motionFrame * motionFactor)), 1, -1, s, sEnd, 'Linear', BOTH);
			tempLig = map2(cos(radians(motionFrame * motionFactor)), 1, -1, l, lEnd, 'Linear', BOTH);

			break;
		
		case 'Hue Forward':
			tempHue = (h + motionFrame * motionFactor) % 360;
			tempSat = s;
			tempLig = l;
			break;
			
		case 'Hue Backward':
			tempHue = 360 - (h + motionFrame * motionFactor) % 360;
			tempSat = s;
			tempLig = l;
			break;
	}
	colorMode(HSL);
	let tempColor = color(abs(tempHue), tempSat, tempLig);
	colorMode(RGB);
	return ([red(tempColor), green(tempColor), blue(tempColor)]);
}