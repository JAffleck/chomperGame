
var context;
var arrowKey = false;
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;

var ANIM_JUMP = 5;
var MOVE_TOTAL = 40;
var ANIM_REMAINING = 0;


var RIGHT = 39
var LEFT = 37 
var UP   = 38 
var DOWN = 40 

var moveLeft = 0;
var moveDown = 0;

var block_x;
var block_y;
var block_h = 30;
var block_w = 30;

var WIDTH;
var HEIGHT;

// TODO find out how to do these easier
function init() {
  canvas = $('#canvas').get(0);
  context = $('#canvas').get(0).getContext('2d');
  WIDTH = $('#canvas').width();
  HEIGHT = $('#canvas').height();
  block_x = WIDTH / 2 - 15;
  block_y = HEIGHT / 2 - 15;
  var FPS = 30;

  var renderHook = function () {
	updatePlayerPosition();
    clearCanvas();
	draw();
    requestAnimationFrame(renderHook);
  };

  //setTimeout where you don't specify the time
  //keep running it over and over
  renderHook();
//setTimeout = does it once
}

function clearCanvas() {
  context.clearRect(0,0,WIDTH,HEIGHT);
}

function draw() {
  context.fillRect(block_x,block_y,block_w,block_h);
}

function character(x, y) {
   x_position = x;
   y_position = y;
   this.movingDirection = 0;
   this.movesLeft = 0;
   this.x = x;
   this.y = y;
   this.getX = function() {
	   return this.x_position;
   };
   this.setX = function(newValue) {
	   return x_position = newValue;
   };
   this.addX = function(newValue) {
	   this.x_position++;
   };
   this.minusX = function(newValue) {
	   this.x_position--;
   };
   this.getY = function() {
	   return this.y_position;
   };
   this.setY = function(newValue) {
	   this.y_position = newValue;
   };
   this.addY = function(newValue) {
	   this.y_position++;
   };
   this.minusY = function(newValue) {
	   this.y_position--;
   };
   this.getDirection = function() {
	   return this.movingDirection;
   };
   this.setDirection = function(direction) {
	   this.movingDirection = direction;
   };
   this.getMovesLeft = function() {
	   return this.movesLeft;
   };
   this.setMovesLeft = function(movesLeft) {
	   this.movesLeft = movesLeft;
   };
   this.addMove = function() {
	   this.movesLeft++;
   };
   this.minusMove = function() {
	   this.movesLeft--;
   };
}

var player = new character(WIDTH / 2 - 15, HEIGHT / 2 - 15);

function updatePlayerPosition() {
	//move the thing
	// I need something stating what current direction player is moving is
	// then schedule next ones
	if(player.getMovesLeft() > 0 || ANIM_REMAINING > 0) {
	//TODO update position if movesLeft, but not arrowKey
	// Bug from this code here, it never sets moves left to 0
		if(!arrowKey && ANIM_REMAINING > 0) {
			switch(player.getDirection()) {
				case RIGHT:
					block_x += ANIM_JUMP;
					break;
				case LEFT:
					block_x -= ANIM_JUMP; 
					break;
				case UP:
					block_y -= ANIM_JUMP;
					break;
				case DOWN:
					block_y += ANIM_JUMP;
					break;
				default:
					break;
			}
			ANIM_REMAINING -= ANIM_JUMP;
			if(!ANIM_REMAINING) {
				player.minusMove();
			}
		} else {
			if(arrowKey) {
				ANIM_REMAINING = MOVE_TOTAL;
				player.setDirection(arrowKey);
				switch(arrowKey) {
					case RIGHT:
						player.addX();
						block_x += ANIM_JUMP;
						break;
					case LEFT:
						player.minusX();
						block_x -= ANIM_JUMP; 
						break;
					case UP:
						player.minusY();
						block_y -= ANIM_JUMP;
						break;
					case DOWN:
						player.addY();
						block_y += ANIM_JUMP;
						break;
					default:
						break;
				}
			}
		}
		//Bounds checking
		if (block_x <= 0) {
			block_x = 0;
		} else if ((block_x + block_w) >= WIDTH) {
			block_x = WIDTH - block_w;
		}
		if (block_y <= 0) {
			block_y = 0;
		} else if ((block_y + block_h) >= HEIGHT) {
			block_y = HEIGHT - block_h;
		}
	}
}

//var directionStack = {
   //directionStack.first = null;
   //directionStack.second = null;
//};


//case 1 = no key
//case 2 = key press with no previous value
//case 3 = key press with previous value set
//case 4 = key press on second direction
	//keep going until value is gone
	//set .first to .second value
//case 5 = holding key down

//function popKeyBuffer() {
	//if (directionStack.first === null) {
		////if already moving keep that movement value, else set to max
	//}
//}


//make sure key released before moving
// && ! => make sure key not already pressed / nbot already moving that way
function onKeyDown(evt) {
	debugger;
	switch(evt.keyCode) {
		case RIGHT : {
			if (!rightKey && !player.getMovesLeft()) {
				rightKey = true;
				arrowKey = RIGHT;
				player.addMove();
			}
		}
		break;
		case LEFT : {
			if (!leftKey && !player.getMovesLeft()) {
				leftKey = true;
				arrowKey = LEFT;
				player.addMove();
			}
		}
		break;
		case UP : {
			if (!upKey && !player.getMovesLeft()) {
				upKey = true;
				arrowKey = UP;
				player.addMove();
			}
		}
		break;
		case DOWN : {
			if (!downKey && !player.getMovesLeft()) {
				downKey = true;
				arrowKey = DOWN;
				player.addMove();
			}
		}
		break;
		default:
			arrowKey = false;
			break;
	}
}


//keep holding down from repeating actions
function onKeyUp(evt) {
	debugger;
	switch(evt.keyCode) {
		case RIGHT: rightKey = false; break;
		case LEFT: leftKey = false; break;
		case UP: upKey = false; break;
		case DOWN: downKey = false; 
		default:
			break;
	}
	arrowKey = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
