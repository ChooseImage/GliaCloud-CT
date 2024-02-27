function exportPreset() {

	const exportData = {
		
		Main: {
			canvasWidth: Main.canvasWidth,
			canvasHeight: Main.canvasHeight,
		},

		BG: {
			Type: BG.Type,
			firstColor: {
				r: round(BG.firstColor.r, 0),
				g: round(BG.firstColor.g, 0),
				b: round(BG.firstColor.b, 0),
			},
			secondColor: {
				r: round(BG.secondColor.r, 0),
				g: round(BG.secondColor.g, 0),
				b: round(BG.secondColor.b, 0),
			}, 
			thirdColor: {
				r: round(BG.thirdColor.r, 0),
				g: round(BG.thirdColor.g, 0),
				b: round(BG.thirdColor.b, 0),
			}, 
			gradientPosition: round(BG.gradientPosition, 2)
		},

		Plane: {
			Width: Plane.Width,
			Height: Plane.Height,
			xCell: round(Plane.xCell, 0),
			yCell: round(Plane.yCell, 0),
			xAxis: round(Plane.xAxis, 1),
			yAxis: round(Plane.yAxis, 1),
			zAxis: round(Plane.zAxis, 1),
			xTilt: round(Plane.xTilt, 0),
			yTilt: round(Plane.yTilt, 0),
			zTilt: round(Plane.zTilt, 0),
			xLocal: Plane.xLocal,
			yLocal: Plane.yLocal,
			zLocal: Plane.zLocal
		},

		Noise: {
			seedNum: Noise.seedNum,
			Type: Noise.Type,
			Amplitude: round(Noise.Amplitude, 0),
			xFreq: round(Noise.xFreq, 3),
			yFreq: round(Noise.yFreq, 3),
			Detail: round(Noise.Detail, 0),
			detailScale: round(Noise.detailScale, 1),
			Elevation: round(Noise.Elevation, 2),
		},

		Ease: {
			Type: Ease.Type,
			rowMode: Ease.rowMode,
			roundMode: Ease.roundMode,
			Width: round(Ease.Width, 2),
			Relief: round(Ease.Relief, 3)
		},

		Flow: {
			Force: round(Flow.Force, 3),
			Angle: round(Flow.Angle, 0)
		},

		Fill: {
			Type: Fill.Type,
			size3DType: Fill.size3DType,
			sizeXOBJ: round(Fill.sizeXOBJ, 0),
			sizeYOBJ: round(Fill.sizeYOBJ, 0),
			sizeZOBJ: round(Fill.sizeZOBJ, 0),
			sizeOBJ: round(Fill.sizeOBJ, 0),
			noiseSizeMin: round(Fill.noiseSizeMin, 0),
			noiseSizeMax: round(Fill.noiseSizeMax, 0),
			randomOBJ: round(Fill.randomOBJ, 0),
			multiplyOBJ: round(Fill.multiplyOBJ, 1),
			colorType: Fill.colorType,
			gradDirection: Fill.gradDirection,
			mapDirection: Fill.mapDirection,
			firstColor: {
				r: round(Fill.firstColor.r, 0),
				g: round(Fill.firstColor.g, 0),
				b: round(Fill.firstColor.b, 0),
			},
			secondColor: {
				r: round(Fill.secondColor.r, 0),
				g: round(Fill.secondColor.g, 0),
				b: round(Fill.secondColor.b, 0),
			},
			colorNoise: round(Fill.colorNoise, 1),
			Contrast: round(Fill.Contrast, 2),
		},

		Stroke: {
			Type: Stroke.Type,
			colorType: Stroke.colorType,
			firstColor: {
				r: round(Stroke.firstColor.r, 0),
				g: round(Stroke.firstColor.g, 0),
				b: round(Stroke.firstColor.b, 0),
			},
			secondColor: {
				r: round(Stroke.secondColor.r, 0),
				g: round(Stroke.secondColor.g, 0),
				b: round(Stroke.secondColor.b, 0),
			},
			Weight: round(Stroke.Weight, 1),
			Position: round(Stroke.Position, 0),
			Contrast: round(Stroke.Contrast, 2)
		},

		Camera: {
			Type: Camera.Type,
			perspPreset: Camera.perspPreset,
			orthoPreset: Camera.orthoPreset,
			FOV: round(Camera.FOV, 0),
			xValue: round(Camera.xValue, 4),
			yValue: round(Camera.yValue, 4),
			Zoom: round(Camera.Zoom, 0),
			Scale: round(Camera.Scale, 2)
		},

		Motion: {
			bgOneCheck: Motion.bgOneCheck,
			bgOneType: Motion.bgOneType,
			bgOneStart: {
				r: round(Motion.bgOneStart.r, 0),
				g: round(Motion.bgOneStart.g, 0),
				b: round(Motion.bgOneStart.b, 0),
			},
			bgOneEnd: {
				r: round(Motion.bgOneEnd.r, 0),
				g: round(Motion.bgOneEnd.g, 0),
				b: round(Motion.bgOneEnd.b, 0),
			},
			bgOneFactor: round(Motion.bgOneFactor, 1),
			bgOnePoint: round(Motion.bgOnePoint, 0),

			bgTwoCheck: Motion.bgTwoCheck,
			bgTwoType: Motion.bgTwoType,
			bgTwoStart: {
				r: round(Motion.bgTwoStart.r, 0),
				g: round(Motion.bgTwoStart.g, 0),
				b: round(Motion.bgTwoStart.b, 0),
			},
			bgTwoEnd: {
				r: round(Motion.bgTwoEnd.r, 0),
				g: round(Motion.bgTwoEnd.g, 0),
				b: round(Motion.bgTwoEnd.b, 0),
			},
			bgTwoFactor: round(Motion.bgTwoFactor, 1),
			bgTwoPoint: round(Motion.bgTwoPoint, 0),

			bgThreeCheck: Motion.bgThreeCheck,
			bgThreeType: Motion.bgThreeType,
			bgThreeStart: {
				r: round(Motion.bgThreeStart.r, 0),
				g: round(Motion.bgThreeStart.g, 0),
				b: round(Motion.bgThreeStart.b, 0),
			},
			bgThreeEnd: {
				r: round(Motion.bgThreeEnd.r, 0),
				g: round(Motion.bgThreeEnd.g, 0),
				b: round(Motion.bgThreeEnd.b, 0),
			},
			bgThreeFactor: round(Motion.bgThreeFactor, 1),
			bgThreePoint: round(Motion.bgThreePoint, 0),

			ampCheck: Motion.ampCheck,
			ampInterval: {
				min: round(Motion.ampInterval.min, 0),
				max: round(Motion.ampInterval.max, 0),
			},
			ampFactor: round(Motion.ampFactor, 1),
			ampPoint: round(Motion.ampPoint, 0),

			xfreqCheck: Motion.xfreqCheck,
			xfreqInterval: {
				min: round(Motion.xfreqInterval.min, 3),
				max: round(Motion.xfreqInterval.max, 3),
			},
			xfreqFactor: round(Motion.xfreqFactor, 1),
			xfreqPoint: round(Motion.xfreqPoint, 0),

			yfreqCheck: Motion.yfreqCheck,
			yfreqInterval: {
				min: round(Motion.yfreqInterval.min, 3),
				max: round(Motion.yfreqInterval.max, 3),
			},
			yfreqFactor: round(Motion.yfreqFactor, 1),
			yfreqPoint: round(Motion.yfreqPoint, 0),

			detailCheck: Motion.detailCheck,
			detailInterval: {
				min: round(Motion.detailInterval.min, 0),
				max: round(Motion.detailInterval.max, 0),
			},
			detailFactor: round(Motion.detailFactor, 1),
			detailPoint: round(Motion.detailPoint, 0),

			easeCheck: Motion.easeCheck,
			easeInterval: {
				min: round(Motion.easeInterval.min, 2),
				max: round(Motion.easeInterval.max, 2),
			},
			easeFactor: round(Motion.easeFactor, 1),
			easePoint: round(Motion.easePoint, 0),

			flowCheck: Motion.flowCheck,
			flowType: Motion.flowType,
			flowStart: round(Motion.flowStart, 3),
			flowAddition: round(Motion.flowAddition, 3),
			flowSeamless: round(Motion.flowSeamless, 3),
			flowFactor: round(Motion.flowFactor, 1),
			flowPoint: round(Motion.flowPoint, 0),

			fOneCheck: Motion.fOneCheck,
			fOneType: Motion.fOneType,
			fOneStart: {
				r: round(Motion.fOneStart.r, 0),
				g: round(Motion.fOneStart.g, 0),
				b: round(Motion.fOneStart.b, 0),
			},
			fOneEnd: {
				r: round(Motion.fOneEnd.r, 0),
				g: round(Motion.fOneEnd.g, 0),
				b: round(Motion.fOneEnd.b, 0),
			},
			fOneFactor: round(Motion.fOneFactor, 1),
			fOnePoint: round(Motion.fOnePoint, 0),

			fTwoCheck: Motion.fTwoCheck,
			fTwoType: Motion.fTwoType,
			fTwoStart: {
				r: round(Motion.fTwoStart.r, 0),
				g: round(Motion.fTwoStart.g, 0),
				b: round(Motion.fTwoStart.b, 0),
			},
			fTwoEnd: {
				r: round(Motion.fTwoEnd.r, 0),
				g: round(Motion.fTwoEnd.g, 0),
				b: round(Motion.fTwoEnd.b, 0),
			},
			fTwoFactor: round(Motion.fTwoFactor, 1),
			fTwoPoint: round(Motion.fTwoPoint, 0),

			sOneCheck: Motion.sOneCheck,
			sOneType: Motion.sOneType,
			sOneStart: {
				r: round(Motion.sOneStart.r, 0),
				g: round(Motion.sOneStart.g, 0),
				b: round(Motion.sOneStart.b, 0),
			},
			sOneEnd: {
				r: round(Motion.sOneEnd.r, 0),
				g: round(Motion.sOneEnd.g, 0),
				b: round(Motion.sOneEnd.b, 0),
			},
			sOneFactor: round(Motion.sOneFactor, 1),
			sOnePoint: round(Motion.sOnePoint, 0),

			sTwoCheck: Motion.sTwoCheck,
			sTwoType: Motion.sTwoType,
			sTwoStart: {
				r: round(Motion.sTwoStart.r, 0),
				g: round(Motion.sTwoStart.g, 0),
				b: round(Motion.sTwoStart.b, 0),
			},
			sTwoEnd: {
				r: round(Motion.sTwoEnd.r, 0),
				g: round(Motion.sTwoEnd.g, 0),
				b: round(Motion.sTwoEnd.b, 0),
			},
			sTwoFactor: round(Motion.sTwoFactor, 1),
			sTwoPoint: round(Motion.sTwoPoint, 0),

			FOVCheck: Motion.FOVCheck,
			FOVInterval: {
				min: round(Motion.FOVInterval.min, 0),
				max: round(Motion.FOVInterval.max, 0),
			},
			FOVFactor: round(Motion.FOVFactor, 1),
			FOVPoint: round(Motion.FOVPoint, 0),

			scaleCheck: Motion.scaleCheck,
			scaleInterval: {
				min: round(Motion.scaleInterval.min, 2),
				max: round(Motion.scaleInterval.max, 2),
			},
			scaleFactor: round(Motion.scaleFactor, 1),
			scalePoint: round(Motion.scalePoint, 0),

			xAxisCheck: Motion.xAxisCheck,
			xAxisInterval: {
				min: round(Motion.xAxisInterval.min, 1),
				max: round(Motion.xAxisInterval.max, 1),
			},
			xAxisFactor: round(Motion.xAxisFactor, 1),
			xAxisPoint: round(Motion.xAxisPoint, 0),

			yAxisCheck: Motion.yAxisCheck,
			yAxisInterval: {
				min: round(Motion.yAxisInterval.min, 1),
				max: round(Motion.yAxisInterval.max, 1),
			},
			yAxisFactor: round(Motion.yAxisFactor, 1),
			yAxisPoint: round(Motion.yAxisPoint, 0),

			zAxisCheck: Motion.zAxisCheck,
			zAxisInterval: {
				min: round(Motion.zAxisInterval.min, 1),
				max: round(Motion.zAxisInterval.max, 1),
			},
			zAxisFactor: round(Motion.zAxisFactor, 1),
			zAxisPoint: round(Motion.zAxisPoint, 0),

			xTiltCheck: Motion.xTiltCheck,
			xTiltType: Motion.xTiltType,
			xTiltStart: round(Motion.xTiltStart, 0),
			xTiltInterval: {
				min: round(Motion.xTiltInterval.min, 0),
				max: round(Motion.xTiltInterval.max, 0),
			},
			xTiltFactor: round(Motion.xTiltFactor, 1),
			xTiltPoint: round(Motion.xTiltPoint, 0),

			yTiltCheck: Motion.yTiltCheck,
			yTiltType: Motion.yTiltType,
			yTiltStart: round(Motion.yTiltStart, 0),
			yTiltInterval: {
				min: round(Motion.yTiltInterval.min, 0),
				max: round(Motion.yTiltInterval.max, 0),
			},
			yTiltFactor: round(Motion.yTiltFactor, 1),
			yTiltPoint: round(Motion.yTiltPoint, 0),

			zTiltCheck: Motion.zTiltCheck,
			zTiltType: Motion.zTiltType,
			zTiltStart: round(Motion.zTiltStart, 0),
			zTiltInterval: {
				min: round(Motion.zTiltInterval.min, 0),
				max: round(Motion.zTiltInterval.max, 0),
			},
			zTiltFactor: round(Motion.zTiltFactor, 1),
			zTiltPoint: round(Motion.zTiltPoint, 0),
		},

		Loop: {
			Speed: round(Loop.Speed, 2),
			Length: round(Loop.Length, 1)
		}
	};

	const a = document.createElement("a");
	a.href = URL.createObjectURL(new Blob([JSON.stringify(exportData, null, 2)], {
		type: "application/json"
	}));
	a.setAttribute("download", `plain-${getFormattedTime()}.json`);

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

function getFormattedTime() {
	var today = new Date();
	var y = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	var h = today.getHours();
	var mi = today.getMinutes();
	var s = today.getSeconds();
	return y + "-" + m + "-" + d + "-" + h + "" + mi + "" + s;
}