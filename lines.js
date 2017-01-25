window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  var width = canvas.width = window.innerWidth;
  var height = canvas.height = window.innerHeight;

  var bresenham = function (startX, startY, endX, endY) {
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    var slope = deltaY/deltaX;

    if (startX <= endX) {
      if (startY <= endY) {
        if (slope <= 1) {
          var deltaErr = Math.abs(slope), error = deltaErr - 0.5
          for(var x = startX, y = startY; x <= endX; x += 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { y += 1; error -= 1; }
          }
        } else if (slope > 1) {
          var deltaErr = 1 / Math.abs(slope), error = deltaErr - 0.5
          for (var y = startY, x = startX; y <= endY; y += 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { x += 1; error -= 1; }
          }
        }
      } else {
        if (slope >= -1) {
          var deltaErr = Math.abs(slope), error = deltaErr - 0.5
          for(var x = startX, y = startY; x <= endX; x += 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { y -= 1; error -= 1; }
          }
        } else if (slope < -1) {
          var deltaErr = 1 / Math.abs(slope), error = deltaErr - 0.5
          for (var y = startY, x = startX; y >= endY; y -= 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { x += 1; error -= 1; }
          }
        }
      }
    } else {
      if (startY <= endY) {
        if (slope >= -1) {
          var deltaErr = Math.abs(slope), error = deltaErr - 0.5
          for(var x = startX, y = startY; x >= endX; x -= 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { y += 1; error -= 1; }
          }
        } else if (slope < -1) {
          var deltaErr = 1 / Math.abs(slope), error = deltaErr - 0.5
          for (var y = startY, x = startX; y <= endY; y += 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { x -= 1; error -= 1; }
          }
        }
      } else {
        if (slope <= 1) {
          var deltaErr = Math.abs(slope), error = deltaErr - 0.5
          for(var x = startX, y = startY; x >= endX; x -= 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { y -= 1; error -= 1; }
          }
        } else if (slope > 1) {
          var deltaErr = 1 / Math.abs(slope), error = deltaErr - 0.5
          for (var y = startY, x = startX; y >= endY; y -= 1) {
            context.fillRect(x, y, 1, 1);
            error += deltaErr;
            if (error >= 0.5) { x -= 1; error -= 1; }
          }
        }
      }
    }
  }

  var bresTest = function() {
    // midpoint: 100, 100
    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(200, 200, 5, 0, Math.PI * 2, false);
    context.fill();


    context.beginPath();
    context.fillStyle = "#000000";
    context.arc(200, 200, 100, 0, Math.PI * 2, false);
    context.stroke();

    var qtramt = 100/1.414
    var eighthsin = 100 * Math.sin(Math.PI / 8)
    var eighthcos = 100 * Math.cos(Math.PI / 8)

    //octant 1
    bresenham(200, 200, 300, 200)
    bresenham(200, 200, 100, 200)
    bresenham(200, 200, 200, 100)
    bresenham(200, 200, 200, 300)

    bresenham(200, 200, 200 + qtramt, 200 + qtramt)
    bresenham(200, 200, 200 - qtramt, 200 + qtramt)
    bresenham(200, 200, 200 + qtramt, 200 - qtramt)
    bresenham(200, 200, 200 - qtramt, 200 - qtramt)

    bresenham(200, 200, 200 + eighthsin, 200 + eighthcos)
    bresenham(200, 200, 200 - eighthsin, 200 + eighthcos)
    bresenham(200, 200, 200 + eighthsin, 200 - eighthcos)
    bresenham(200, 200, 200 - eighthsin, 200 - eighthcos)

    bresenham(200, 200, 200 + eighthcos, 200 + eighthsin)
    bresenham(200, 200, 200 - eighthcos, 200 + eighthsin)
    bresenham(200, 200, 200 + eighthcos, 200 - eighthsin)
    bresenham(200, 200, 200 - eighthcos, 200 - eighthsin)
  };

  bresTest();
  // bresenham(200, 200, 600, 500)
};
