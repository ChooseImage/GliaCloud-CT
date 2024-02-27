function captureState(){
	if (capture.state != 'idle') {
		exportButton.hidden = true;
		exportSize.disabled = true;
		exportType.disabled = true;
		loopLength.disabled = true;
		exportState.hidden = false;
	} else {
		if (captureBool) {
			pixelDensity(defaultDensity);
			g.pixelDensity(defaultDensity);
			updateGraphics();
			captureBool = false;
		}
		exportButton.hidden = false;
		exportSize.disabled = false;
		exportType.disabled = false;
		loopLength.disabled = false;
		exportState.hidden = true;
	}
}

function exportEvent() {
	if(Export.startCheck) resetFrames();
	let checkLoop = loopsStatesCheck();
	pixelDensity(Export.Size);
	g.pixelDensity(Export.Size);
	updateGraphics();
	capture.start({
		format: Export.Type,
		//quality: (1 - (Export.Size * 0.025)),
		quality: 1,
		duration: Loop.Speed == 0 && Flow.Force == 0 && checkLoop == false ? 1 : Loop.Length * Main.frameRate,
	});
	captureBool = true;
}

function exportChange() {
	exportSize.label = "Size: " + Main.canvasWidth * Export.Size + 'x' + Main.canvasHeight * Export.Size;
	if (Export.Type != "png" && BG.Type == "Transparent") {
		BG.Type = "Solid";
		gui.refresh();
	}
}