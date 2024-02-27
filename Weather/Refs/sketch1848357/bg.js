function bgFunction() {
	push();
	if (BG.Type == 'Transparent') {
		noFill();
		noStroke();
	}
	if (BG.Type == 'Solid') {
		beginShape();
		noStroke();
		fill(BG.firstColor.r, BG.firstColor.g, BG.firstColor.b);
		vertex(0, 0);
		vertex(Main.canvasWidth, 0);
		vertex(Main.canvasWidth, Main.canvasHeight);
		vertex(0, Main.canvasHeight);
		endShape(CLOSE);
	}
	if (BG.Type == 'Gradient') {
		noStroke();
		let c1 = color(BG.firstColor.r, BG.firstColor.g, BG.firstColor.b);
		let c2 = color(BG.secondColor.r, BG.secondColor.g, BG.secondColor.b);
		let c3 = color(BG.thirdColor.r, BG.thirdColor.g, BG.thirdColor.b);
		let gradient = drawingContext.createLinearGradient(Main.canvasWidth / 2, 0, Main.canvasWidth / 2, Main.canvasHeight);
		gradient.addColorStop(0, c1.toString('#rrggbb'));
		gradient.addColorStop(BG.gradientPosition, c2.toString('#rrggbb'));
		gradient.addColorStop(1, c3.toString('#rrggbb'));
		drawingContext.fillStyle = gradient;
		beginShape();
		vertex(0, 0);
		vertex(Main.canvasWidth, 0);
		vertex(Main.canvasWidth, Main.canvasHeight);
		vertex(0, Main.canvasHeight);
		endShape(CLOSE);
	}
	pop();
}