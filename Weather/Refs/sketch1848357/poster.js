let bookFont, boldFont, iboldFont, menuFont;

function posterGraphics() {
	if (captureBool) {} else {
	//{
		push();
		blendMode(EXCLUSION);
		textFont(boldFont);
		noStroke();
		fill(255);
		textAlign(LEFT);
		textSize(32);
		text('PLA', 11, 36);
		textFont(iboldFont);
		text('I', 76, 36);
		textFont(boldFont);
		text('N', 86, 36);

		textFont(bookFont);
		textSize(9);
		text('V.067', 12, 48);
		text('SEED: #' + seed, 12, height - 12);

		textAlign(RIGHT);
		text('ANTLII.WORK', width - 12, 20);
		text('→ 2023', width - 12, 30);
		text(round(frameRate()) + '', width - 54, height - 12);
		//text(frameCount + '', width - 54, height - 12);
		text(' :FRAMES', width - 12, height - 12);
		pop();
	}
	// Checking browser
	if (checkAgent) {} else {
		push();
		noStroke();
		textFont(bookFont);
		textAlign(CENTER, CENTER);
		textSize(20);
		fill(255, 240 - (millis() / 60));
		rect(0, 0, Main.canvasWidth, Main.canvasHeight);
		fill(0, 240 - (millis() / 60));
		let t = 'Please use Chrome browser on laptop/desktop for stable functionality and optimal performance. Thanks ;)';
		text(t, width * 0.2, (height / 2) - 120, Main.canvasWidth - (Main.canvasWidth * 0.4), 240);
		pop();
	}
}