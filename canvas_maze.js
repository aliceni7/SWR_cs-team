var canvas = document.getElementById('canvas1', { alpha: false });
var canvas2 = document.getElementById('canvas2', { alpha: false });
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//canvas2.width = 700;//window.innerWidth;
//canvas2.height = 1000;//window.innerHeight;

// Global variables
var defaultRows = 10;
var defaultCols = 10;
var mazeRows = 10;
var mazeCols = 10;
var maze = []; //will be a 2d array of "cells" containing info about walls
var startCell;
var endCell;
var cellWidth = canvas.width / (mazeCols + 1);
var cellHeight = canvas.height / (mazeRows + 1);
var COL = 0;
var ROW = 1;
var widthOffset = cellWidth / 2;
var heightOffset = cellHeight / 2;

/* Window Resizing */
window.addEventListener('resize', resizeMaze);


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
}

function resizeMaze() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cellWidth = canvas.width / (mazeCols + 1);
    cellHeight = canvas.height / (mazeRows + 1);
    widthOffset = cellWidth / 2;
    heightOffset = cellHeight / 2;
    drawMaze();
}

function init() {
    generateMaze();
    gameLoop();
    canvas2.addEventListener('click', function(e) { getCursorPosition(canvas, e) }, false);
}

var form = document.querySelector('form');
form.onsubmit = function () {
    mazeRows = parseInt(form.maze_rows.value);
    mazeCols = parseInt(form.maze_cols.value);
    generateMaze(mazeRows, mazeCols);
    resizeMaze();
    avatarPosition(startCell[COL] * cellWidth + 45, startCell[ROW] * cellHeight + 50); //positions avatar at the start cell
    return false;
};

function generateMaze(r = defaultRows, c = defaultCols) {
    makeBlankMaze(r, c);
    mazeGenBacktracking(r, c);
    drawMaze();
    console.log(mazeSolver(r, c));
    //console.log(maze);
    avatarPosition(startCell[COL] * cellWidth + 45, startCell[ROW] * cellHeight + 50); //positions avatar at the start cell
}

// Creates an empty grid with start and end cells in HTML file and returns the maze
function makeBlankMaze(rows = defaultRows, cols = defaultCols) {
    maze = [];
    for (var c = 0; c < cols; c++) {
	maze.push([]);
	for (var r = 0; r < rows; r++) {
	    maze[c].push({});
	}
    }

    fillWalls(rows, cols);
    return makeStartEndCells(rows, cols);
}

// Fills the maze with walls and borders
function fillWalls(rows = defaultRows, cols = defaultCols) {
    for (var c = 0; c < cols; c++) {
	for (var r = 0; r < rows; r++) {
	    maze[c][r].walls = ['top', 'bot', 'left', 'right'];
	    maze[c][r].borders = [];
	    if (r === 0) {
		maze[c][r].borders.push('top');
	    }

	    if (r === maze[c].length - 1) {
		maze[c][r].borders.push('bot');
	    }

	    if (c === 0) {
		maze[c][r].borders.push('left');
	    }

	    if (c === maze.length - 1) {
		maze[c][r].borders.push('right');
	    }
	}
    }
}

// Draws the maze on canvas
function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayStartEnd();
    drawWalls();
}

// Draws the walls on the canvas
function drawWalls() {
    /* Coordinates for a cell
       top left corner: (c * cellWidth, r * cellHeight)
       top right corner: (c * cellWidth + cellWidth, r * cellHeight)
       bot left corner: (c * cellWidth, r * cellHeight + cellHeight)
       bot right corner: (c * cellWidth + cellWidth, r * cellHeight + cellHeight)
    */
    var rows = maze[0].length;
    var cols = maze.length;
    for (var c = 0; c < maze.length; c++) {
	for (var r = 0; r < maze[c].length; r++) {
	    var topLeft = [c * cellWidth, r * cellHeight];
	    ctx.beginPath();
	    ctx.lineWidth = 5;

	    // Draws the top border
	    if (maze[c][r].walls.indexOf('top') > -1) {
		if (maze[c][r].borders.indexOf('top') > -1) {
		    ctx.lineWidth = 8;
		}

		ctx.moveTo(topLeft[0] + widthOffset, topLeft[1] + heightOffset);
		ctx.lineTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + heightOffset);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 5;
	    }

	    // Draws the right border starting from top right corner
	    if (maze[c][r].walls.indexOf('bot') > -1) {
		if (maze[c][r].borders.indexOf('bot') > -1) {
		    ctx.lineWidth = 8;
		}

		ctx.moveTo(topLeft[0] + widthOffset, topLeft[1] + cellHeight + heightOffset);
		ctx.lineTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + cellHeight + heightOffset);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 5;
	    }

	    // Draws the left border
	    if (maze[c][r].walls.indexOf('left') > -1) {
		if (maze[c][r].borders.indexOf('left') > -1) {
		    ctx.lineWidth = 8;
		}

		ctx.moveTo(topLeft[0] + widthOffset, topLeft[1] + heightOffset);
		ctx.lineTo(topLeft[0] + widthOffset, topLeft[1] + cellHeight + heightOffset);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 5;
	    }

	    // Draws the right border
	    if (maze[c][r].walls.indexOf('right') > -1) {
		if (maze[c][r].borders.indexOf('right') > -1) {
		    ctx.lineWidth = 8;
		}

		ctx.moveTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + heightOffset);
		ctx.lineTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + cellHeight + heightOffset);
		ctx.stroke();
		ctx.beginPath();
		ctx.lineWidth = 5;
	    }
	}
    }
}

function displayStartEnd() {
    ctx.fillStyle = 'rgba(20, 255, 20, 0.8)';
    ctx.fillRect(startCell[COL] * cellWidth + widthOffset, startCell[ROW] * cellHeight + heightOffset, cellWidth, cellHeight);
    ctx.fillStyle = 'rgba(255, 0, 20, 0.8)';
    ctx.fillRect(endCell[COL] * cellWidth + widthOffset, endCell[ROW] * cellHeight + heightOffset, cellWidth, cellHeight);
}

// Returns a random integer between 0 and the given maximum (noninclusive) parameter
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Determines startCell and endCell
function makeStartEndCells(rows = defaultRows, cols = defaultCols) {
    var mazeOrient = getRandomInt(4);
    var tempIdx;
    switch (mazeOrient){
    case 0: //start left end right
	startCell = [0, getRandomInt(rows)];
	tempIdx = maze[startCell[COL]][startCell[ROW]].walls.indexOf('left');
	maze[startCell[COL]][startCell[ROW]].walls.splice(tempIdx, 1);

	endCell = [cols - 1, getRandomInt(rows)];
	tempIdx = maze[endCell[COL]][endCell[ROW]].walls.indexOf('right');
	maze[endCell[COL]][endCell[ROW]].walls.splice(tempIdx, 1);
	break;
    case 1: // start right end left
	startCell = [cols - 1, getRandomInt(rows)];
	tempIdx = maze[startCell[COL]][startCell[ROW]].walls.indexOf('right');
	maze[startCell[COL]][startCell[ROW]].walls.splice(tempIdx, 1);

	endCell = [0, getRandomInt(rows)];
	tempIdx = maze[endCell[COL]][endCell[ROW]].walls.indexOf('left');
	maze[endCell[COL]][endCell[ROW]].walls.splice(tempIdx, 1);
	break;
    case 2: //start top end bot
	startCell = [getRandomInt(cols), 0];
	tempIdx = maze[startCell[COL]][startCell[ROW]].walls.indexOf('top');
	maze[startCell[COL]][startCell[ROW]].walls.splice(tempIdx, 1);

	endCell = [getRandomInt(cols), rows - 1];
	tempIdx = maze[endCell[COL]][endCell[ROW]].walls.indexOf('bot');
	maze[endCell[COL]][endCell[ROW]].walls.splice(tempIdx, 1);
	break;
    default: // start bot end top
	startCell = [getRandomInt(cols), rows - 1];
	tempIdx = maze[startCell[COL]][startCell[ROW]].walls.indexOf('bot');
	maze[startCell[COL]][startCell[ROW]].walls.splice(tempIdx, 1);

	endCell = [getRandomInt(cols), 0];
	tempIdx = maze[endCell[COL]][endCell[ROW]].walls.indexOf('top');
	maze[endCell[COL]][endCell[ROW]].walls.splice(tempIdx, 1);
	break;
    }

    // console.log(startCell);
    // console.log(endCell);
}

/* Pseudocode
   Choose the initial cell, mark it as visited and push it to the stack
   While the stack is not empty
   Pop a cell from the stack and make it a current cell
   If the current cell has any neighbours which have not been visited
   Push the current cell to the stack
   Choose one of the unvisited neighbors
   Remove the wall between the current cell and the chosen cell
   Mark the chosen cell as visited and push it to the stack
*/
function mazeGenBacktracking(rows = defaultRows, cols = defaultCols) {
    var stack = [];
    var visited = makeArray(rows, cols, false);
    stack.push(startCell);
    visited[startCell[COL]][startCell[ROW]] = true;
    backtrackGenHelper(stack, visited, maze);
}

function backtrackGenHelper(stack, visited, maze) {
    while (stack.length !== 0) {
	var curr = stack.pop();
	var unvisited = unvisitedNeighbors(curr, visited);
	if (unvisited.length !== 0) {
	    stack.push(curr);

	    //Choose one of unvisited neighbors
	    var next = unvisited[getRandomInt(unvisited.length)];
	    removeWall(curr, next);
	    visited[next[COL]][next[ROW]] = true;
	    stack.push(next);
	}
    }
}

// Returns a rows by cols sized array filled with fillValue
function makeArray(rows, cols, fillValue) {
    var temp = [];
    for (var c = 0; c < cols; c++) {
	temp.push([]);
	for (var r = 0; r < rows; r++) {
	    temp[c].push(fillValue);
	}
    }

    return temp;
}

// Takes two cells and removes the adjacent wall. Doesn't return anything.
function removeWall(start, end) {
    var relativePosition = [end[COL] - start[COL], end[ROW] - start[ROW]];
    var tempIdx;
    switch (relativePosition.join(' ')){
	// start is on top of end
    case '0 1':
	tempIdx = maze[start[COL]][start[ROW]].walls.indexOf('bot');
	maze[start[COL]][start[ROW]].walls.splice(tempIdx, 1);

	tempIdx = maze[end[COL]][end[ROW]].walls.indexOf('top');
	maze[end[COL]][end[ROW]].walls.splice(tempIdx, 1);
	break;

	// start is below end
    case '0 -1':
	tempIdx = maze[start[COL]][start[ROW]].walls.indexOf('top');
	maze[start[COL]][start[ROW]].walls.splice(tempIdx, 1);

	tempIdx = maze[end[COL]][end[ROW]].walls.indexOf('bot');
	maze[end[COL]][end[ROW]].walls.splice(tempIdx, 1);
	break;

	// start is to the left of end
    case '1 0':
	tempIdx = maze[start[COL]][start[ROW]].walls.indexOf('right');
	maze[start[COL]][start[ROW]].walls.splice(tempIdx, 1);

	tempIdx = maze[end[COL]][end[ROW]].walls.indexOf('left');
	maze[end[COL]][end[ROW]].walls.splice(tempIdx, 1);
	break;

	// start is to the right of end
    case '-1 0':
	tempIdx = maze[start[COL]][start[ROW]].walls.indexOf('left');
	maze[start[COL]][start[ROW]].walls.splice(tempIdx, 1);

	tempIdx = maze[end[COL]][end[ROW]].walls.indexOf('right');
	maze[end[COL]][end[ROW]].walls.splice(tempIdx, 1);
	break;
    }
}

// Returns an array of unvisited neighboring cells
function unvisitedNeighbors(cell, visited) {
    var unvisited = [];
    var tempCell;
    var currRow = cell[ROW];
    var currCol = cell[COL];

    // Check cell on top
    if (currRow !== 0) {
	if (!visited[currCol][currRow - 1]) {
	    tempCell = [currCol, currRow - 1];
	    unvisited.push(tempCell);
	}
    }

    // Check cell below
    if (currRow !== visited[currCol].length - 1) {
	if (!visited[currCol][currRow + 1]) {
	    tempCell = [currCol, currRow + 1];
	    unvisited.push(tempCell);
	}
    }

    // Check cell to left
    if (currCol !== 0) {
	if (!visited[currCol - 1][currRow]) {
	    tempCell = [currCol - 1, currRow];
	    unvisited.push(tempCell);
	}
    }

    // Check cell to right
    if (currCol !== visited.length - 1) {
	if (!visited[currCol + 1][currRow]) {
	    tempCell = [currCol + 1, currRow];
	    unvisited.push(tempCell);
	}
    }

    return unvisited;
}

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    keys[e.keyCode] = true;
}
		       );

window.addEventListener('keyup', function (e) {
    velX = 0;
    velY = 0;
    keys[e.keyCode] = false;
}
		       );

var avatarX = 400,
    avatarY = 300,
    velX = 0,
    velY = 0,
    keys = [],
    maxSpeed = 4;

function avatarPosition(a, b) {
    avatarX = a;
    avatarY = b;
}

function gameLoop() {
    whatKey();
    var canvas2 = document.getElementById('canvas2');
    var ctx2 = canvas2.getContext('2d');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    avatarX += velX;
    Math.round(avatarX);
    avatarY += velY;
    Math.round(avatarY);
    //console.log(Math.round(avatarX), avatarY);

    ctx2.fillRect(avatarX, avatarY, 50, 50);
    requestAnimationFrame(gameLoop);
}

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function checkEquality(pix) {
	    for (j = 0; j < pix.length; j++){
		if (arraysEqual(pix[j], [0,0,0,255])){ return true; }
	    }
	    return false;
	}

function whatKey() {
    if (keys[37]) {
	const leftSide = [];
	for (i = 5; i < 45; i++) {
	    leftSide.push(canvas.getContext('2d').getImageData(avatarX, avatarY+i, 1, 1).data)
	}
	//velX = -4;  left key
	if (avatarX < 0 || checkEquality(leftSide)) {
	    velX = 0;
	    velY = 0;
	} else if (velX > -maxSpeed) {
	    velX -= 1.0;
	}
    }

    if (keys[39]) {
	//velX = 4;  right key
	const rightSide = [];
	for (i = 5; i < 45; i++) {
	    rightSide.push(canvas.getContext('2d').getImageData(avatarX+50, avatarY+i, 1, 1).data)
	}
	if (avatarX > canvas.width - 50 || checkEquality(rightSide)) {
	    velX = 0;
	    velY = 0;
	} else if (velX < maxSpeed) {
	    velX += 1.0;
	}
    }

    if (keys[40]) {
	//velY = 4;  down key	
	const bottomSide = [];
	for (i = 5; i < 45; i++) {
	    bottomSide.push(canvas.getContext('2d').getImageData(avatarX+i, avatarY+50, 1, 1).data)
	}
	if (avatarY > canvas.height - 50 || checkEquality(bottomSide)) {
	    velX = 0;
	    velY = 0;
	} else if (velY < maxSpeed) {
	    velY += 1.0;
	}
    }

    if (keys[38]) {
	//velY = 4;  up key
	const topSide = [];
	for (i = 5; i < 45; i++) {
	    topSide.push(canvas.getContext('2d').getImageData(avatarX+i, avatarY, 1, 1).data)
	}
	if (avatarY < 0 || checkEquality(topSide)) {
	    velX = 0;
	    velY = 0;
	} else if (velY > -maxSpeed) {
	    velY -= 1.0;
	}
    }
}

/* Returns an array containing the cells in sequential order from start to end
   making up the path through the maze */
function mazeSolver(rows = defaultRows, cols = defaultCols) {
    var stack = [];
    var visited = makeArray(rows, cols, false);
    stack.push(startCell);
    visited[startCell[COL]][startCell[ROW]] = true;
    return solveHelper(stack, visited, maze);
}

function solveHelper(stack, visited, maze) {
    while (stack.length !== 0) {
	var curr = stack.pop();
	var validNeighbors = noWallUnvisitedNeighbors(curr, visited);
	if (validNeighbors.length !== 0) {
	    stack.push(curr);

	    //Choose one of valid neighbors
	    var next = validNeighbors[getRandomInt(validNeighbors.length)];
	    visited[next[COL]][next[ROW]] = true;
	    stack.push(next);
	    if (next[ROW] === endCell[ROW] && next[COL] === endCell[COL]) {
		return stack;
	    }
	}
    }
}

function noWallUnvisitedNeighbors(cell, visited) {
    var validNeighbors = [];
    var tempCell;
    var currRow = cell[ROW];
    var currCol = cell[COL];

    // Check cell on top
    if (currRow !== 0 && maze[currCol][currRow].walls.indexOf('top') === -1) {
	tempCell = [currCol, currRow - 1];
	if (!visited[currCol][currRow - 1]) {
	    validNeighbors.push(tempCell);
	}
    }

    // Check cell below
    if (currRow !== visited[currCol].length - 1 && maze[currCol][currRow].walls.indexOf('bot') === -1) {
	tempCell = [currCol, currRow + 1];
	if (!visited[currCol][currRow + 1]) {
	    validNeighbors.push(tempCell);
	}
    }

    // Check cell to left
    if (currCol !== 0 && maze[currCol][currRow].walls.indexOf('left') === -1) {
	tempCell = [currCol - 1, currRow];
	if (!visited[currCol - 1][currRow]) {
	    validNeighbors.push(tempCell);
	}
    }

    // Check cell to right
    if (currCol !== visited.length - 1 && maze[currCol][currRow].walls.indexOf('right') === -1) {
	tempCell = [currCol + 1, currRow];
	if (!visited[currCol + 1][currRow]) {
	    validNeighbors.push(tempCell);
	}
    }

    return validNeighbors;
}

init();
