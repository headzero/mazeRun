var canvas = document.getElementById("myCanvas"); 
var ctx = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasRect = canvas.getBoundingClientRect();
var x = canvasWidth / 2;
var y = canvasHeight / 2;
var dx = -2;
var dy = 2;

var getTouchPos = function(touchEvent) {
  return {
    x: touchEvent.touches[0].clientX - canvasRect.left,
    y: touchEvent.touches[0].clientY - canvasRect.top
  };
}

var clearView = function(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

var drawCircle = function(){
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    x += dx;
    y += dy;
}
