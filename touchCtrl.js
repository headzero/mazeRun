canvas.addEventListener('touchstart', 
    function(touchEvent){
        var touchButtonNum = touchPositionToButtonNum(getTouchPos(touchEvent));
        setLastInput(touchButtonNum);
    });
canvas.addEventListener('touchmove', 
    function(touchEvent){
        var touchButtonNum = touchPositionToButtonNum(getTouchPos(touchEvent));
        setLastInput(touchButtonNum);
    });
canvas.addEventListener('touchend', 
    function(touchEvent){
        console.log('end ');
        setLastInput(TOUCH_MIDDLE);
    });

var canvasWidthLeft = canvasWidth / 3;
var canvasWidthRight = canvasWidthLeft * 2;
var canvasHeightUpper = canvasHeight / 3;
var canvasHeightLower = canvasHeightUpper * 2;

var TOUCH_UPPER_LEFT = 1;
var TOUCH_UPPER = 2;
var TOUCH_UPPER_RIGHT = 3;
var TOUCH_LEFT = 4;
var TOUCH_MIDDLE = 5;
var TOUCH_RIGHT = 6;
var TOUCH_LOWER_LEFT = 7;
var TOUCH_LOWER = 8;
var TOUCH_LOWER_RIGHT = 9;

var touchPositionToButtonNum = function(touchPosition){
    if(touchPosition.y < canvasHeightUpper){ // upper line
        if(touchPosition.x < canvasWidthLeft){ // left
            return TOUCH_UPPER_LEFT;
        } else if (touchPosition.x < canvasWidthRight){ // middle
            return TOUCH_UPPER;
        } else { // right
            return TOUCH_UPPER_RIGHT;
        }
    } else if(touchPosition.y < canvasHeightLower){ // middle line;
        if(touchPosition.x < canvasWidthLeft){ // left
            return TOUCH_LEFT
        } else if (touchPosition.x < canvasWidthRight){ // middle
            return TOUCH_MIDDLE;
        } else { // right
            return TOUCH_RIGHT;
        }
    } else { // lower line;
        if(touchPosition.x < canvasWidthLeft){ // left
            return TOUCH_LOWER_LEFT;
        } else if (touchPosition.x < canvasWidthRight){ // middle
            return TOUCH_LOWER;
        } else { // right
            return TOUCH_LOWER_RIGHT;
        }
    }
};