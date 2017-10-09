var WAY_MAX = 4;
var wayArray = [
    0,
    1,
    2,
    3
];
var WAY_LEFT = 0;
var WAY_TOP = 1;
var WAY_RIGHT = 2;
var WAY_BOTTOM = 3;

var mazeData;
var mazeMaxSize = 0;
var mazeBlockX = 0;
var mazeBlockY = 0;

var makeMap = function (mazeSize) {
    mazeMaxSize = mazeSize;
    mazeData = new Array(mazeSize);
    for (var i = 0; i < mazeSize; i++) {
        mazeData[i] = new Array(mazeSize);
        for (var j = 0; j < mazeSize; j++) {
            mazeData[i][j] = {
                left: false,
                top: false,
                right: false,
                bottom: false,
                created: false,
                visit: false
            };
        }
    }
    console.log(mazeData);
    mazeData[0][0].created = true;
    makeBlock(0, 0);
}

var makeBlock = function (y, x) {
    //Math.floor(Math.random() * 4);
    shuffle(wayArray)
    var orderIndex = 0;
    while (orderIndex < WAY_MAX) {
        var nextX = x;
        var nextY = y;
        var isBlocked = true;
        switch (wayArray[orderIndex]) {
            case WAY_LEFT:
                if (x > 0) {
                    nextX--;
                    isBlocked = false;
                }
                break;
            case WAY_TOP:
                if (y > 0) {
                    nextY--;
                    isBlocked = false;
                }
                break;
            case WAY_RIGHT:
                if (x < mazeMaxSize - 1) {
                    nextX++;
                    isBlocked = false;
                }
                break;
            case WAY_BOTTOM:
                if (y < mazeMaxSize - 1) {
                    nextY++;
                    isBlocked = false;
                }
                break;
        }

        if (!isBlocked && mazeData[nextY][nextX].created == false) {
            console.log("nextBlock : " + nextX + " / " + nextY);
            mazeData[nextY][nextX].created = true;
            switch (wayArray[orderIndex]) {
                case WAY_LEFT:
                    mazeData[y][x].left = true;
                    mazeData[nextY][nextX].right = true;
                    break;
                case WAY_TOP:
                    mazeData[y][x].top = true;
                    mazeData[nextY][nextX].bottom = true;
                    break;
                case WAY_RIGHT:
                    mazeData[y][x].right = true;
                    mazeData[nextY][nextX].left = true;
                    break;
                case WAY_BOTTOM:
                    mazeData[y][x].bottom = true;
                    mazeData[nextY][nextX].top = true;
                    break;
            }
            makeBlock(nextY, nextX);
        } else {
            orderIndex++;
        }
    }


}

var shuffle = function (array) {
    var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

var printMapTest = function () {
    var startMark = '■□';
    var wall = '■';
    var line = '□';
    var drawAll = '';
    var drawString = '';
    for (var i = 0; i < mazeMaxSize; i++) {
        // draw top line;
        drawString = '';
        for (var j = 0; j < mazeMaxSize; j++) {
            var drawTopLine = wall;
            if (mazeData[i][j].top) {
                drawTopLine += line;
            } else {
                drawTopLine += wall;
            }
            if (i == 0 && j == 0) {
                drawTopLine = startMark;
            }
            drawString += drawTopLine;
        }
        drawString += wall;
        drawAll += 't: ' + drawString + '\n';

        // draw left
        drawString = '';
        for (var j = 0; j < mazeMaxSize; j++) {
            var drawLeft = '';
            if (mazeData[i][j].left) {
                drawLeft += line;
            } else {
                drawLeft += wall;
            }
            drawString += drawLeft + line;
        }
        drawString += wall;
        drawAll += 'l: ' + drawString + '\n';
    }
    drawString = '';
    for (var j = 0; j < (mazeMaxSize * 2 + 1); j++) {
        drawString += wall;
    }
    drawAll += 'b: ' + drawString + '\n';
    console.log(drawAll);
}
