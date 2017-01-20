window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;
  var unit = 50;
  var position = { x: 0, y: 0, z: 20};
  var box1 = [[0, 0, 0],
              [50, 0, 0],
              [50, 0, 50],
              [0, 0, 50]];
  var box2 = [[0, 0, 0],
              [0, 100, 0],
              [0, 100, 50],
              [0, 0, 50]];
  var box3 = [[50, 0, 0],
              [50, 100, 0],
              [50, 100, 50],
              [50, 0, 50]];
  var box4 = [[0, 100, 0],
              [50, 100, 0],
              [50, 100, 50],
              [0, 100, 50]];
  var angle = -45 * Math.PI / 180



  update();

  document.body.addEventListener("keydown", function(event) {
     switch(event.keyCode) {
       case 38: //up
         position.y -= unit;
         break;

       case 40: //down
         position.y += unit;
         break;

       case 37: //left
         //position.x -= unit;
         angle += Math.PI / 16
         break;

       case 39: //right
         //position.x += unit;
         angle -= Math.PI / 16
         break;

       default:
         break;
     }
  });

  function update() {
    context.clearRect(0, 0, width, height);

    drawShape(box1, angle, "#ff0000")
    drawShape(box2, angle, "#00ff00")
    drawShape(box3, angle, "#0000ff")
    drawShape(box4, angle, "#00ff00")

    requestAnimationFrame(update);
  }

  function drawShape(points, angle, color) {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(width/2, height/2)

    for (var i = points.length - 1; i >= 0; i--) {
      coords = persp(points[i][0], points[i][1], points[i][2], angle);
      context.lineTo(coords[0] + width/2, coords[1] + height/2);
    };

    context.stroke();
  }

  function persp(origX, origY, origZ, angle) {
    newX = Math.cos(angle) * origX - Math.sin(angle) * origY;
    newY = Math.sin(angle) * origX + Math.cos(angle) * origY + origZ;
    return [newX, newY];
  }
};