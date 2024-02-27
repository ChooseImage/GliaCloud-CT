function fillFunction() {
	g.noStroke();
	switch (Fill.Type) {

		case 'None':
			break;

		case 'Image':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(TRIANGLE_STRIP);
				g.textureMode(NORMAL); // Normalize coordinates
				g.texture(img); // Adding image as texture	
				for (let x = 0; x < cols; x++) {
					let u = map(x, 0, cols, 0, 1); // U coordinate for image
					let v1 = map(y, 0, rows - 1, 0, 1); // V coordinate for image 
					let v2 = map(y + 1, 0, rows - 1, 0, 1); // V + 1 coordinate for image 
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y], u, v1);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1], u, v2);
				}
				g.endShape();
			}
			break;

		case 'MultiImage':
			//g.blendMode(BLEND);
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					g.beginShape();
					g.textureMode(NORMAL); // Normalize coordinates
					g.texture(img); // Adding image as texture
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y], 0, 0);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1], 1, 0);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1], 1, 1);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y], 0, 1);
					g.endShape();
				}
			}
			break;

		case 'Plane (2D)':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(TRIANGLE_STRIP);
				for (let x = 0; x < cols; x++) {
					fillColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y]);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1]);
				}
				g.endShape();
			}
			break;

		case 'Checker (2D)':
			for (let y = 0; y < rows - 1; y++) {
				let tmp;
				y % 2 ? tmp = 0 : tmp = 1;
				for (let x = 0; x < cols - 1; x++) {
					if (tmp % 2) {
						g.beginShape();
						fillColorFunction(x, y);
						g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y]);
						g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1]);
						g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1]);
						g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y]);
						g.endShape();
					}
					tmp++;
				}
			}
			break;

		case 'Triangle (2D)':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(TRIANGLES);
				for (let x = 0; x < cols - 1; x++) {
					fillColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y]);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y]);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1]);
				}
				g.endShape();
			}
			break;

		case 'Sphere (3D)':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					let size = sizeFunction(x, y);
					fillColorFunction(x, y);
					g.push();
					g.translate((x + (x + 1)) * 0.5 * Plane.xCell, (y + (y + 1)) * 0.5 * Plane.yCell, planeArray[x][y]); // Positioning between cells
					g.ellipsoid(size[0], size[1], size[2], Fill.sphereDetail, Fill.sphereDetail);
					g.pop();
				}
			}
			break;

		case 'Box (3D)':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					let size = sizeFunction(x, y);
					fillColorFunction(x, y);
					g.push();
					g.translate((x + (x + 1)) * 0.5 * Plane.xCell, (y + (y + 1)) * 0.5 * Plane.yCell, planeArray[x][y]); // Positioning between cells
					g.box(size[0], size[1], size[2]);
					g.pop();
				}
			}
			break;

		case 'TriangleComplex':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					g.beginShape();
					fillColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y]);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1]);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1]);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y]);
					g.endShape();
				}
			}
			break;
	}
}

function strokeFunction() {
	g.noFill();
	switch (Stroke.Type) {
		case 'None':
			break;

		case 'Rectangle':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(QUAD_STRIP);
				for (let x = 0; x < cols; x++) {
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1] - Stroke.Position);
				}
				g.endShape();
			}
			break;

		case 'Triangle':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(TRIANGLE_STRIP);
				for (let x = 0; x < cols; x++) {
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1] - Stroke.Position);
				}
				g.endShape();
			}
			break;

		case 'Dots':
			for (let y = 0; y < rows; y++) {
				g.beginShape(POINTS);
				for (let x = 0; x < cols; x++) {
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - (Stroke.Position + Stroke.Weight));
				}
				g.endShape();
			}
			break;

		case 'Horizontal':
			for (let y = 0; y < rows; y++) {
				g.beginShape(LINES);
				for (let x = 0; x < cols - 1; x++) {
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y] - Stroke.Position);
				}
				g.endShape();
			}
			break;

		case 'Vertical':
			for (let y = 0; y < rows - 1; y++) {
				g.beginShape(LINES);
				for (let x = 0; x < cols; x++) {
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1] - Stroke.Position);
				}
				g.endShape();
			}
			break;

		case 'DiagonalComplex':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					g.beginShape();
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1] - Stroke.Position);
					g.endShape();
				}
			}
			break;

		case 'RectComplex':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					g.beginShape(QUADS);
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y] - Stroke.Position);
					g.endShape();
				}
			}
			break;

		case 'TriangleComplex':
			for (let y = 0; y < rows - 1; y++) {
				for (let x = 0; x < cols - 1; x++) {
					g.beginShape(TRIANGLES);
					strokeColorFunction(x, y);
					g.vertex(x * Plane.xCell, y * Plane.yCell, planeArray[x][y] - Stroke.Position);
					g.vertex(x * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x][y + 1] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, (y + 1) * Plane.yCell, planeArray[x + 1][y + 1] - Stroke.Position);
					g.vertex((x + 1) * Plane.xCell, y * Plane.yCell, planeArray[x + 1][y] - Stroke.Position);
					g.endShape();
				}
			}
			break;
	}
}

function sizeFunction(x, y) {
	let size = [];
	let obj = [];

	switch (Fill.size3DType) {
		case 'Unified':
		case 'Three-axis':
			if (Fill.size3DType == 'Unified') {
				obj[0] = Fill.sizeOBJ;
				obj[1] = Fill.sizeOBJ;
				obj[2] = Fill.sizeOBJ;
			} else if (Fill.size3DType == 'Three-axis') {
				obj[0] = Fill.sizeXOBJ;
				obj[1] = Fill.sizeYOBJ;
				obj[2] = Fill.sizeZOBJ;
			}

			if (Fill.Type == 'Sphere (3D)') {
				obj[0] = obj[0] / 2;
				obj[1] = obj[1] / 2;
				obj[2] = obj[2] / 2;
			}

			size[0] = pow(obj[0] * map(Fill.randomOBJ, 0, 100, 1, abs(pow(randomArray[x][y], 3))), Fill.multiplyOBJ);
			size[1] = pow(obj[1] * map(Fill.randomOBJ, 0, 100, 1, abs(pow(randomArray[x][y], 3))), Fill.multiplyOBJ);
			size[2] = pow(obj[2] * map(Fill.randomOBJ, 0, 100, 1, abs(pow(randomArray[x][y], 3))), Fill.multiplyOBJ);
			break;

		case 'Noise-Based':
			size[0] = pow(map(abs(planeArray[x][y]), 0, abs(Noise.Amplitude), Fill.noiseSizeMin, Fill.noiseSizeMax), Fill.multiplyOBJ);
			size[1] = pow(map(abs(planeArray[x][y]), 0, abs(Noise.Amplitude), Fill.noiseSizeMin, Fill.noiseSizeMax), Fill.multiplyOBJ);
			size[2] = pow(map(abs(planeArray[x][y]), 0, abs(Noise.Amplitude), Fill.noiseSizeMin, Fill.noiseSizeMax), Fill.multiplyOBJ);

			if (Fill.Type == 'Sphere (3D)') {
				size[0] = size[0] / 2;
				size[1] = size[1] / 2;
				size[2] = size[2] / 2;
			}
			break;
	}

	size[0] > Fill.maxSizeOBJ ? size[0] = Fill.maxSizeOBJ : size[0] = size[0];
	size[1] > Fill.maxSizeOBJ ? size[1] = Fill.maxSizeOBJ : size[1] = size[1];
	size[2] > Fill.maxSizeOBJ ? size[2] = Fill.maxSizeOBJ : size[2] = size[2];

	return size;
}

function fillColorFunction(x, y) {
	switch (Fill.colorType) {
		case 'Solid':
			g.fill(mappingFillSolid(Fill.firstColor, x, y));
			break;

		case 'Gradient':
			if (Fill.gradDirection == 'Vertical') {
				g.fill(mappingFillGradient(y, 0, rows, Fill.firstColor, Fill.secondColor, x, y));
			} else if (Fill.gradDirection == 'Horizontal') {
				g.fill(mappingFillGradient(x, cols, 0, Fill.firstColor, Fill.secondColor, x, y));
			}
			break;

		case 'Heightmap':
			let color1, color2;
			if (Fill.mapDirection == 'Top/Bottom') {
				color1 = Fill.firstColor;
				color2 = Fill.secondColor;
			} else if (Fill.mapDirection == 'Bottom/Top') {
				color2 = Fill.firstColor;
				color1 = Fill.secondColor;
			}
			switch (Noise.Type) {
				case 'Wave':
					g.fill(mappingFillHeight(planeArray[x][y], -Noise.Amplitude, Noise.Amplitude, color1, color2, x, y));
					break;

				case 'Hill':
				case 'Scape':
					g.fill(mappingFillHeight(planeArray[x][y], -Noise.Amplitude * map(Noise.Elevation, 0, 1, 0.4, 0.75), Noise.Amplitude * 0.001, color1, color2, x, y));
					break;

				case 'Crater':
					g.fill(mappingFillHeight(planeArray[x][y], Noise.Amplitude * map(Noise.Elevation, 0, 1, 0.4, 0.75), Noise.Amplitude * 0.001, color1, color2, x, y));
					break;
			}
			break;
	}
}

function strokeColorFunction(x, y) {
	switch (Stroke.colorType) {
		case 'Solid':
			g.stroke(mappingStrokeSolid(Stroke.firstColor));
			break;

		case 'Gradient':
			if (Stroke.Direction == 'Vertical') {
				g.stroke(mappingStrokeGradient(y, 0, rows, Stroke.firstColor, Stroke.secondColor));
			} else if (Stroke.Direction == 'Horizontal') {
				g.stroke(mappingStrokeGradient(x, cols, 0, Stroke.firstColor, Stroke.secondColor));
			}
			break;

		case 'Heightmap':
			if (Noise.Type == 'Wave') {
				g.stroke(mappingStrokeGradient(planeArray[x][y], -Noise.Amplitude, Noise.Amplitude, Stroke.firstColor, Stroke.secondColor));
			} else if (Noise.Type == 'Crater') {
				g.stroke(mappingStrokeGradient(planeArray[x][y], Noise.Amplitude * 0.5, 0, Stroke.firstColor, Stroke.secondColor));
			} else {
				g.stroke(mappingStrokeGradient(planeArray[x][y], -Noise.Amplitude, 0, Stroke.firstColor, Stroke.secondColor));
			}
			break;
	}
}

function mappingStrokeSolid(color1) {
	let c = [];
	let contrast = map(Stroke.Contrast, 0, 1, 1, 3);

	c[0] = color1.r * contrast;
	c[1] = color1.g * contrast;
	c[2] = color1.b * contrast;

	return (c);
}

function mappingStrokeGradient(value, start, finish, color1, color2) {
	let c = [];
	let contrast = map(Stroke.Contrast, 0, 1, 1, 3);
	
	c[0] = map(value, start, finish, color1.r, color2.r);
	c[1] = map(value, start, finish, color1.g, color2.g);
	c[2] = map(value, start, finish, color1.b, color2.b);

	c[0] = c[0] * contrast;
	c[1] = c[1] * contrast;
	c[2] = c[2] * contrast;

	return (c);
}

function mappingFillSolid(color1, x, y) {
	let c = [];
	let contrast = map(Fill.Contrast, 0, 1, 1, 3);

	c[0] = color1.r + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][y];
	c[1] = color1.g + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][y];
	c[2] = color1.b + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][y];

	c[0] = c[0] * contrast;
	c[1] = c[1] * contrast;
	c[2] = c[2] * contrast;

	return (c);
}

function mappingFillGradient(value, start, finish, color1, color2, x, y) {
	let c = [];
	let contrast = map(Fill.Contrast, 0, 1, 1, 3);

	c[0] = map(value, start, finish, color1.r, color2.r);
	c[1] = map(value, start, finish, color1.g, color2.g);
	c[2] = map(value, start, finish, color1.b, color2.b);

	if (Fill.gradDirection == 'Horizontal') {
		c[0] = c[0] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][0];
		c[1] = c[1] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][0];
		c[2] = c[2] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[x][0];
	} else {
		c[0] = c[0] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[0][y];
		c[1] = c[1] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[0][y];
		c[2] = c[2] + map(Fill.colorNoise, 0, 100, 0, 255) * colorArray[0][y];
	}

	c[0] = c[0] * contrast;
	c[1] = c[1] * contrast;
	c[2] = c[2] * contrast;
	
	return (c);
}

function mappingFillHeight(value, start, finish, color1, color2, x, y) {
	let c = [0, 0, 0];
	let contrast = map2(Fill.Contrast, 0, 1, 1, 0.1, 'Quartic', OUT);

	c[0] = map(Fill.colorNoise, 0, 100, 0, 0.5) * map(colorArray[x][y], -1, 1, color1.r, color2.r);
	c[1] = map(Fill.colorNoise, 0, 100, 0, 0.5) * map(colorArray[x][y], -1, 1, color1.g, color2.g);
	c[2] = map(Fill.colorNoise, 0, 100, 0, 0.5) * map(colorArray[x][y], -1, 1, color1.b, color2.b);

	c[0] = c[0] * map(Fill.colorNoise, 0, 100, 1, colorArray[x][y]);
	c[1] = c[1] * map(Fill.colorNoise, 0, 100, 1, colorArray[x][y]);
	c[2] = c[2] * map(Fill.colorNoise, 0, 100, 1, colorArray[x][y]);

	c[0] = c[0] + map(value, start * contrast, finish * contrast, color1.r, color2.r);
	c[1] = c[1] + map(value, start * contrast, finish * contrast, color1.g, color2.g);
	c[2] = c[2] + map(value, start * contrast, finish * contrast, color1.b, color2.b);

	return (c);
}

function addContrast(c) {

	let h = hue(c);
	let s = saturation(c);
	let l = lightness(c);
	
	s = map(Fill.Contrast, 0, 1, s, 200);
	//l = map(Fill.Contrast, 0, 1, l, l + 10);
	
	colorMode(HSL);
	let tempColor = color(h, s, l);
	return ([red(tempColor), green(tempColor), blue(tempColor)]);
}