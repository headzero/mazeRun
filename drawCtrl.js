var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var charactor = new Image();
charactor.src = 'images/rabbit.png';
var tileImage = new Image();
tileImage.src = 'images/bg_sprite.png';
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

var tileType = 0; // 0 = green, 1 = block, 2 = green;
var tileSize = 64;
var tilePerBlock = 5;
var lastTileIndex = tilePerBlock - 1;
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
    ctx.drawImage(charactor, charPosX, charPosY, 48, 48);
}

var drawTile = function () {
    if (mazeData == undefined) return;
    drawBlock(0, 0);
    //    ctx.drawImage(tileImage, 140, 0, 70, 70, charPosX + offsetX, charPosY + offsetY, 64, 64);

}

// block width = tileSize * 5;
var blockOffset = (tileSize * tilePerBlock) / 2;
var drawBlock = function (x, y) {
    var block = mazeData[x][y];
    for (var x = 0; x < tilePerBlock; x++) {
        for (var y = 0; y < tilePerBlock; y++) {
            var blockOffsetX = (tileSize * x) - blockOffset;
            var blockOffsetY = (tileSize * y) - blockOffset;
            if ((x == 0 && y == 0) || (x == lastTileIndex && y == 0) ||
                (x == 0 && y == lastTileIndex) || (x == lastTileIndex && y == lastTileIndex)) {
                createBlock(1, blockOffsetX, blockOffsetY);
            } else if ((!block.top && y == 0) || (!block.bottom && y == lastTileIndex) ||
                (!block.left && x == 0) || (!block.right && x == lastTileIndex)) {
                createBlock(1, blockOffsetX, blockOffsetY);
            } else {
                createBlock(2, blockOffsetX, blockOffsetY);
            }
        }
    }
}

var createBlock = function (type, blockPosX, blockPosY) {
    ctx.drawImage(tileImage, 70 * type, 0, 70, 70, charPosX + offsetX + blockPosX, charPosY + offsetY + blockPosY, tileSize, tileSize);
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
