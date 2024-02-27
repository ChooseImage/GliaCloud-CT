function mouseDragged() {
	let winOffset = (window.innerWidth - 616) - width;
	let intefaceOffset = 0;
	if (winOffset < 0) intefaceOffset = -(winOffset / 2);
	if (mouseX > 0 && mouseX < width - intefaceOffset && mouseY > 0 && mouseY < height && capture.state != 'capturing') {

		switch (Camera.Type) {
			case 'Perspective':
				let cpX = (-Camera.xSens * (mouseX - pmouseX)) / Camera.rotateScale;
				let cpY = (Camera.ySens * (mouseY - pmouseY)) / Camera.rotateScale;

				Camera.xValue += cpX;
				cam._orbit(cpX, 0, 0);
				Camera.xValue = Camera.xValue % TWO_PI;

				if (Camera.yValue >= -cpY && Camera.yValue <= HALF_PI - cpY) {
					Camera.yValue += cpY;
					cam._orbit(0, cpY, 0);
				} else {
					if (Camera.yValue < 0) {
						Camera.yValue = 0;
					}
					if (Camera.yValue > HALF_PI) {
						Camera.yValue = HALF_PI;
					}
					cam._orbit(0, 0, 0);
				}
				break;

			case 'Ortho':
				let coX = (-Camera.xSens * (mouseX - pmouseX)) / Camera.rotateScale;
				let coY = (-Camera.ySens * (mouseY - pmouseY)) / Camera.rotateScale;
				
				Camera.xValue += coX;
				cam._orbit(coX, 0, 0);
				Camera.xValue = Camera.xValue % TWO_PI;
				
				if (Camera.yValue <= -coY && Camera.yValue >= -HALF_PI - coY) {
					Camera.yValue += coY;
					cam._orbit(0, coY, 0);
				} else {
					cam._orbit(0, 0, 0);
				}
				break;
		}
	}
}

function mouseWheel(event) {
	let winOffset = (window.innerWidth - 616) - width;
	let intefaceOffset = 0;
	if (winOffset < 0) intefaceOffset = -(winOffset / 2);
	if (mouseX > 0 && mouseX < width - intefaceOffset && mouseY > 0 && mouseY < height && capture.state != 'capturing') {
		if (event.delta > 0) {
			switch (Camera.Type) {
				case 'Perspective':
					if (Camera.Zoom <= Camera.maxZoom) {
						cam._orbit(0, 0, Camera.zoomSens * Camera.zoomScale);
						Camera.Zoom += Camera.zoomSens * Camera.zoomScale;
					} else {
						cam._orbit(0, 0, 0);
					}
					break;

				case 'Ortho':
					//cam._orbit(0, 0, -Camera.zoomSens * Camera.zoomScale);
					//Camera.Zoom += -Camera.zoomSens * Camera.zoomScale;
					break;
			}
		} else {
			switch (Camera.Type) {
				case 'Perspective':
					if (Camera.Zoom >= Camera.minZoom) {
						cam._orbit(0, 0, -Camera.zoomSens * Camera.zoomScale);
						Camera.Zoom -= Camera.zoomSens * Camera.zoomScale;
					} else {
						cam._orbit(0, 0, 0);
					}
					break;

				case 'Ortho':
					//cam._orbit(0, 0, Camera.zoomSens * Camera.zoomScale);
					//Camera.Zoom += Camera.zoomSens * Camera.zoomScale;
					break;
			}
		}
	}
}

function stopTouchScrolling(canvas) {
	// Prevent scrolling when touching the canvas
	document.body.addEventListener("touchstart", function(e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, {
		passive: false
	});
	document.body.addEventListener("touchend", function(e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, {
		passive: false
	});
	document.body.addEventListener("touchmove", function(e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, {
		passive: false
	});
	document.body.addEventListener("wheel", function(e) {
		if (e.target == canvas) {
			e.preventDefault();
		}
	}, {
		passive: false
	});
}