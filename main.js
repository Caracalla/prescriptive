window.onload = function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var width = canvas.width = window.innerWidth;
	var height = canvas.height = window.innerHeight;
	// distance change amount
	var unit = 50;
	//angle change amount
	var delta = Math.PI/32;

	var eye = { x: -5, y: -5, z: -1};

	//angle of dp from xz plane
	var theta = -Math.PI/4;
	//angle of dp from xy plane
	var phi = 0;
	var building = {x: 5, y: 5, z: -3, origin: [0, 0, 0]}
	var box1 = [[0, 0, 0],
							[0, 0, building.z],
							[0, building.y, building.z],
							[0, building.y, 0]];
	var box2 = [[0, 0, 0],
							[0, 0, building.z],
							[building.x, 0, building.z],
							[building.x, 0, 0]];
	var box3 = [[building.x, 0, 0],
							[building.x, 0, building.z],
							[building.x, building.y, building.z],
							[building.x, building.y, 0]];
	var box4 = [[0, building.y, 0],
							[building.x, building.y, 0],
							[building.x, building.y, building.z],
							[0, building.y, building.z]];


	update();

	document.body.addEventListener("keydown", function(event) {
 		switch(event.keyCode) {
 			case 38: //up
 				//phi += delta;
 				eye.x += Math.cos(theta);
 				eye.y += -Math.sin(theta);
 				break;

 			case 40: //down
				//phi -= delta;
				eye.x -= Math.cos(theta);
 				eye.y -= -Math.sin(theta);
 				break;

 			case 37: //left
 				theta -= delta;
 				break;

 			case 39: //right
 				//position.x += unit;
 				theta += delta;
 				break;

 			default:
 				break;
 		}
	});

	function update() {
		context.clearRect(0, 0, width, height);

		context.font = "10px Helvetica";
		context.fillText(eye.x.toFixed(2) + ", " + eye.y.toFixed(2) + ", " + eye.z.toFixed(2), 10, 20);
		context.fillText("ORIGIN", width/2 + 10, height/2 + 10)
		context.beginPath();
		context.fillStyle = "#000000";
		context.arc(width/2, height/2, 5, 0, Math.PI * 2, false);
		context.fill();

		drawShape(box1, "#ff0000")
		drawShape(box2, "#00ff00")
		drawShape(box3, "#0000ff")
		drawShape(box4, "#00ff00")

		requestAnimationFrame(update);
	}

	function drawShape(points, color) {
		context.strokeStyle = color;
		context.beginPath();
		var coords = persp(points[0][0], points[0][1], points[0][2]);
		context.moveTo(coords[0] + width/2, coords[1] + height/2)

		for (var i = points.length - 1; i >= 0; i--) {
			coords = persp(points[i][0], points[i][1], points[i][2]);
			
			xval = Math.floor(coords[0] + width/2);
			yval = Math.floor(coords[1] + height/2);

			context.lineTo(xval, yval);

			context.font = "10px Helvetica";
			context.fillText(Math.floor(coords[0]) + ", " + Math.floor(coords[1]), xval, yval);
			// if ((xval > 0 && xval < width) && (yval > 0 && yval < height)) {
			// 	context.lineTo(xval, yval);
			// }
		};

		context.stroke();
	}

	function persp(origX, origY, origZ) {
		var T_x = origX - eye.x;
		var T_y = origY - eye.y;
		var T_z = origZ - eye.z;

		var dp_z = Math.sin(phi);
		var dp_x = Math.sqrt(1 - Math.pow(dp_z, 2)) * Math.cos(theta);
		var dp_y = Math.sqrt(1 - Math.pow(dp_x, 2) - Math.pow(dp_z, 2));

		var r_1 = Math.sqrt(Math.pow(dp_x, 2) + Math.pow(dp_y, 2));
		var s_1 = dp_x / r_1;
		var c_1 = dp_y / r_1;

		var r_2 = Math.sqrt(Math.pow(dp_x, 2) + Math.pow(dp_y, 2) + Math.pow(dp_z, 2));
		var c_2 = r_1 / r_2; //somehow rdp_2 = r_1???
		var s_2 = dp_z / r_2;

		var GPpP = s_1 * c_2 * T_x + c_1 * c_2 * T_y + s_2 * T_z;

		var newX = (c_1 * T_x - s_1 * T_y) / GPpP;
		var newY = (c_2 * T_z - s_1 * s_2 * T_x - c_1 * s_2 * T_y) / GPpP;

		return [newX * 1000, newY * 1000];
	}
};