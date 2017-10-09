var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var lastInputButton = 5;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasRect = canvas.getBoundingClientRect();
var charPosX = canvasWidth / 2;
var charPosY = canvasHeight / 2;
var dx = -2;
var dy = 2;
var offsetX = 0;
var offsetY = 0;
var moveAmount = 5;

var getTouchPos = function (touchEvent) {
    return {
        x: touchEvent.touches[0].clientX - canvasRect.left,
        y: touchEvent.touches[0].clientY - canvasRect.top
    };
}

var clearView = function () {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

var drawCircle = function () {
    ctx.beginPath();
    console.log("x : " + (charPosX + offsetX) + " / y : " + (charPosY + offsetY));
    ctx.arc(charPosX + offsetX, charPosY + offsetY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

var setLastInput = function (buttonNum) {
    lastInputButton = buttonNum;
}

var updateDrawOffset = function () {
    switch (lastInputButton) {
        case TOUCH_UPPER_LEFT:
            offsetX += moveAmount;
            offsetY += moveAmount;
            break;
        case TOUCH_UPPER:
            offsetY += moveAmount;
            break;
        case TOUCH_UPPER_RIGHT:
            offsetX += -moveAmount;
            offsetY += moveAmount;
            break;
        case TOUCH_LEFT:
            offsetX += moveAmount;
            break;
        case TOUCH_MIDDLE:
            break;
        case TOUCH_RIGHT:
            offsetX += -moveAmount;
            break;
        case TOUCH_LOWER_LEFT:
            offsetX += moveAmount;
            offsetY += -moveAmount;
            break;
        case TOUCH_LOWER:
            offsetY += -moveAmount;
            break;
        case TOUCH_LOWER_RIGHT:
            offsetX += -moveAmount;
            offsetY += -moveAmount;
            break;
    }
}
