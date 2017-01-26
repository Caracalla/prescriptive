(function () {
  var context = document.getElementById("canvas").getContext("2d");
  var width = canvas.width = 600 // window.innerWidth;
  var height = canvas.height = 600 // window.innerHeight;
  window.mouseX = 0;
  window.mouseY = 0;

  var theta1 = 0
  var theta2 = 0

  var getMouseCoordinates = function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  $('#canvas').on('mousemove', getMouseCoordinates);

  var leaf = function (x, y) {
    context.beginPath();
    context.fillStyle = "#008800";
    context.strokeStyle = "#004400";
    context.arc(x, y, 6, 0, Math.PI * 2, false);
    context.fill();
    context.stroke();
  };

  var branch = function (originX, originY, len, angle) {
    var endX = originX + len * Math.cos(angle);
    var endY = originY + len * Math.sin(angle);
    var branchAngle = Math.PI / 8;

    // draw branch
    line(originX, originY, endX, endY);

    len = Math.floor(len * 2 / 3);

    // create child branches
    if (len > 5) {
      var angle1 = branchAngle + branchAngle * Math.random();
      var angle2 = branchAngle + branchAngle * Math.random();

      if ((Math.random() * len ) > 2) {
        branch(endX, endY, (len - (len * Math.random()) / len), angle + angle1);
      }

      if ((Math.random() * len ) > 2) {
        branch(endX, endY, (len - (len * Math.random()) / len), angle - angle2);
      }

      if ((Math.random() * len ) > 2) {
        branch(endX, endY, (len - (len * Math.random()) / len), angle - angle1 + angle2);
      }
    } else { leaf(endX, endY) }
  };

  var drawTree = function () {
    branch(width/2, height, 150, -Math.PI/2);
  };

  drawTree()
})();
