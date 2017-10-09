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
var charSize = 64;
var dx = -2;
var dy = 2;
var offsetX = 0;
var offsetY = 0;
var lastOffsetX = 0; // 충돌 처리 후 복구하기 위함
var lastOffsetY = 0;
var moveAmount = 12;

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
    ctx.drawImage(charactor, charPosX, charPosY, charSize, charSize);
}

var drawTile = function () {
    if (mazeData == undefined) return;
    // memo : 주변 9개 블럭까지만 그린다.
    drawBlock(mazeBlockX - 1, mazeBlockY - 1);
    drawBlock(mazeBlockX, mazeBlockY - 1);
    drawBlock(mazeBlockX + 1, mazeBlockY - 1);
    drawBlock(mazeBlockX - 1, mazeBlockY);
    drawBlock(mazeBlockX, mazeBlockY);
    drawBlock(mazeBlockX + 1, mazeBlockY);
    drawBlock(mazeBlockX - 1, mazeBlockY + 1);
    drawBlock(mazeBlockX, mazeBlockY + 1);
    drawBlock(mazeBlockX + 1, mazeBlockY + 1);
}


var tileType = 0; // 0 = green, 1 = block, 2 = green;
var tileSize = 64;
var tilePerBlock = 5;
var lastTileIndex = tilePerBlock - 1;
var blockWidth = tileSize * tilePerBlock;
var blockOffset = blockWidth / 2;

var drawBlock = function (mazeIndexX, mazeIndexY) {
    if (mazeIndexX < 0 || mazeIndexX >= mazeMaxSize || mazeIndexY < 0 || mazeIndexY >= mazeMaxSize) return;

    var block = mazeData[mazeIndexY][mazeIndexX];
    for (var y = 0; y < tilePerBlock; y++) {
        for (var x = 0; x < tilePerBlock; x++) {
            var blockOffsetX = (tileSize * x) - blockOffset + (mazeIndexX * blockWidth);
            var blockOffsetY = (tileSize * y) - blockOffset + (mazeIndexY * blockWidth);
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
    lastOffsetX = offsetX;
    lastOffsetY = offsetY;
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

    if (!checkCollisionWall()) {
        mazeBlockX = Math.floor(-(offsetX - blockOffset) / blockWidth);
        mazeBlockY = Math.floor(-(offsetY - blockOffset) / blockWidth);
    }
}

var checkCollisionWall = function () {
    if (mazeBlockX < 0 || mazeBlockX >= mazeMaxSize || mazeBlockY < 0 || mazeBlockY >= mazeMaxSize) return;

    var block = mazeData[mazeBlockY][mazeBlockX];
    var currentXInBlock = blockOffset - (blockWidth * mazeBlockX) - offsetX;
    var currentYInBlock = blockOffset - (blockWidth * mazeBlockY) - offsetY;

    var outerTileSize = tileSize * lastTileIndex - charSize;
    var topBlock = (!block.top && currentYInBlock < tileSize);
    var leftBlock = (!block.left && currentXInBlock < tileSize);
    var rightBlock = (!block.right && currentXInBlock > outerTileSize);
    var bottomBlock = (!block.bottom && currentYInBlock > outerTileSize);
    var cornerBlock = (currentXInBlock < tileSize && currentYInBlock < tileSize) ||
        (currentXInBlock < tileSize && currentYInBlock > outerTileSize) ||
        (currentXInBlock > outerTileSize && currentYInBlock < tileSize) ||
        (currentXInBlock > outerTileSize && currentYInBlock > outerTileSize);

    if (topBlock || leftBlock || rightBlock || bottomBlock || cornerBlock) {
        offsetX = lastOffsetX;
        offsetY = lastOffsetY;
        return true;
    }
    return false;
}
