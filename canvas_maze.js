// Canvas variables
const canvas = document.getElementById('canvas1', { alpha: false }); // maze canvas
const canvas2 = document.getElementById('canvas2', { alpha: false }); // avatar canvas
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Maze dimension variables
const defaultRows = 10;
const defaultCols = 10;
let maze = []; // 2d array of "cells" containing info about walls
let puzzleCells = [];
let solvePath = [];
const COL = 0;
const ROW = 1;
let mazeRows = 10;
let mazeCols = 10;

// Cell variables
let startCell;
let endCell;
let cellWidth = canvas.width / (mazeCols + 1);
let cellHeight = canvas.height / (mazeRows + 1);

// Design variables
let widthOffset = cellWidth / 2;
let heightOffset = cellHeight / 2;
let wallThickness = 8;
let borderThickness = 10;
let avatarWidth = parseInt(cellWidth * .8);
let avatarHeight = parseInt(cellHeight * .8);
let currModal;
let inModal = false;

/* Window Resizing */
window.addEventListener('resize', resizeMaze);

function getCursorPosition(canvas, event) {
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	// console.log('x: ' + x + ' y: ' + y);
}

function resizeMaze() {
	let oldWidth = canvas.width;
	let oldHeight = canvas.height;
	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight;
	cellWidth = canvas.width / (mazeCols + 1);
	cellHeight = canvas.height / (mazeRows + 1);
	widthOffset = cellWidth / 2;
	heightOffset = cellHeight / 2;
	avatarWidth = parseInt(cellWidth * .8);
	avatarHeight = parseInt(cellHeight * .8);
	avatarPosition(avatarX * canvas.width / oldWidth, avatarY * canvas.height / oldHeight);
	drawMaze();
}

function init() {
	generateMaze();
	gameLoop();
	canvas2.addEventListener('click', function (e) { getCursorPosition(canvas, e); }, false);
}

const form = document.querySelector('form');
form.onsubmit = function () {
	mazeRows = parseInt(form.maze_rows.value);
	mazeCols = parseInt(form.maze_cols.value);
	removeElementsByClass('modal');
	generateMaze(mazeRows, mazeCols);
	resizeMaze();

	// Positions avatar at the start cell
	avatarPosition(startCell[COL] * cellWidth + cellWidth * 0.6, startCell[ROW] * cellHeight + cellHeight * 0.6);
	return false;
};

function generateMaze(r = defaultRows, c = defaultCols) {
	makeBlankMaze(r, c);
	mazeGenBacktracking(r, c);
	mazeSolver(r, c);
	getPuzzleLocations();
	makeEndModal();
	drawMaze();

	//console.log(maze);
	// Positions avatar at the start cell
	avatarPosition(startCell[COL] * cellWidth + cellWidth * 0.6, startCell[ROW] * cellHeight + cellHeight * 0.6);
}

// Creates an empty grid with start and end cells in HTML file and returns the maze
function makeBlankMaze(rows = defaultRows, cols = defaultCols) {
	maze = [];
	for (let c = 0; c < cols; c++) {
		maze.push([]);
		for (let r = 0; r < rows; r++) {
			maze[c].push({});
		}
	}

	fillWalls(rows, cols);
	return makeStartEndCells(rows, cols);
}

// Fills the maze with walls and borders
function fillWalls(rows = defaultRows, cols = defaultCols) {
	for (let c = 0; c < cols; c++) {
		for (let r = 0; r < rows; r++) {
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
	displayPuzzleLocations();
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
	let rows = maze[0].length;
	let cols = maze.length;
	for (let c = 0; c < maze.length; c++) {
		for (let r = 0; r < maze[c].length; r++) {
			let topLeft = [c * cellWidth, r * cellHeight];
			ctx.beginPath();
			ctx.strokeStyle = 'orange';
			ctx.lineWidth = wallThickness;

			// Draws the top border
			if (maze[c][r].walls.indexOf('top') > -1) {
				if (maze[c][r].borders.indexOf('top') > -1) {
					ctx.lineWidth = borderThickness;
				}

				ctx.moveTo(topLeft[0] + widthOffset - ctx.lineWidth / 2, topLeft[1] + heightOffset);
				ctx.lineTo(topLeft[0] + cellWidth + widthOffset + ctx.lineWidth / 2, topLeft[1] + heightOffset);
				ctx.stroke();
				ctx.beginPath();
				ctx.strokeStyle = 'orange';
				ctx.lineWidth = wallThickness;
			}

			// Draws the bottom border
			if (maze[c][r].walls.indexOf('bot') > -1) {
				if (maze[c][r].borders.indexOf('bot') > -1) {
					ctx.lineWidth = borderThickness;
				}

				ctx.moveTo(topLeft[0] + widthOffset - ctx.lineWidth / 2, topLeft[1] + cellHeight + heightOffset);
				ctx.lineTo(topLeft[0] + cellWidth + widthOffset + ctx.lineWidth / 2, topLeft[1] + cellHeight + heightOffset);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = wallThickness;
			}

			// Draws the left border
			if (maze[c][r].walls.indexOf('left') > -1) {
				if (maze[c][r].borders.indexOf('left') > -1) {
					ctx.lineWidth = borderThickness;
				}

				ctx.moveTo(topLeft[0] + widthOffset, topLeft[1] + heightOffset - ctx.lineWidth / 2);
				ctx.lineTo(topLeft[0] + widthOffset, topLeft[1] + cellHeight + heightOffset + ctx.lineWidth / 2);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = wallThickness;
			}

			// Draws the right border
			if (maze[c][r].walls.indexOf('right') > -1) {
				if (maze[c][r].borders.indexOf('right') > -1) {
					ctx.lineWidth = borderThickness;
				}

				ctx.moveTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + heightOffset - ctx.lineWidth / 2);
				ctx.lineTo(topLeft[0] + cellWidth + widthOffset, topLeft[1] + cellHeight + heightOffset + ctx.lineWidth / 2);
				ctx.stroke();
				ctx.beginPath();
				ctx.lineWidth = wallThickness;
			}
		}
	}
}

// Displays start and end cells
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
	const mazeOrient = getRandomInt(4);
	let tempIdx;
	switch (mazeOrient) {
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
	const stack = [];
	const visited = makeArray(rows, cols, false);
	stack.push(startCell);
	visited[startCell[COL]][startCell[ROW]] = true;
	backtrackGenHelper(stack, visited);
}

function backtrackGenHelper(stack, visited) {
	while (stack.length !== 0) {
		const curr = stack.pop();
		const unvisited = unvisitedNeighbors(curr, visited);
		if (unvisited.length !== 0) {
			stack.push(curr);

			//Choose one of unvisited neighbors
			const next = unvisited[getRandomInt(unvisited.length)];
			removeWall(curr, next);
			visited[next[COL]][next[ROW]] = true;
			stack.push(next);
		}
	}
}

// Returns a rows by cols sized array filled with fillValue
function makeArray(rows, cols, fillValue) {
	const temp = [];
	for (let c = 0; c < cols; c++) {
		temp.push([]);
		for (let r = 0; r < rows; r++) {
			temp[c].push(fillValue);
		}
	}

	return temp;
}

// Takes two cells and removes the adjacent wall. Doesn't return anything.
function removeWall(start, end) {
	const relativePosition = [end[COL] - start[COL], end[ROW] - start[ROW]];
	let tempIdx;
	switch (relativePosition.join(' ')) {
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
	const unvisited = [];
	const currRow = cell[ROW];
	const currCol = cell[COL];
	let tempCell;

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

/* Avatar Movement */

(function () {
	const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

document.addEventListener('keydown', function (e) {
    e.preventDefault();
    console.log(e.key);
    console.log(e.keyCode);
    if (e.key != undefined) {
	keys[e.key] = true;
    } else if (e.keyIdentifier != undefined) {
	keys[e.keyIdentifier] = true;
    } else if (e.keyCode != undefined) {
	keys[e.keyCode] = true;
    }
    
}
);

document.addEventListener('keyup', function (e) {
    velX = 0;
    velY = 0;
    if (e.key != undefined) {
	keys[e.key] = false;
    } else if (e.keyIdentifier != undefined) {
	keys[e.keyIdentifier] = false;
    } else if (e.keyCode != undefined) {
	keys[e.keyCode] = false;
    }
});


let avatarX = 400;
let avatarY = 300;
let velX = 0;
let velY = 0;
const keys = [];
let maxSpeed = 4; // change to be proportional to maze size

// Returns the [COL, ROW] of where avatar is located
function getAvatarPosition() {
	const c = Math.floor((avatarX - widthOffset) / cellWidth);
	const r = Math.floor((avatarY - heightOffset) / cellHeight);
	console.log([avatarX, avatarY]);
	console.log([c, r]);
	return [c, r];
}

function avatarPosition(a, b) {
	avatarX = a;
	avatarY = b;
}

function gameLoop() {
	if (!inModal) {
		whatKey();
	}
	canvas2.width = window.innerWidth;
	canvas2.height = window.innerHeight;

	avatarX += velX;
	Math.round(avatarX);
	avatarY += velY;
	Math.round(avatarY);

	//console.log(Math.round(avatarX), avatarY);
	if (velX || velY) {
		displayPuzzleModal(checkOnPuzzle());
		checkEnd();
	}

	ctx2.fillRect(avatarX, avatarY, avatarWidth, avatarHeight);
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

	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}

	return true;
}

function checkEquality(pix, colorArray = [255, 165, 0, 255]) {
	for (j = 0; j < pix.length; j++) {
		if (arraysEqual(pix[j], colorArray)) { return true; }
		// if (arraysEqual(pix[j], [0, 0, 0, 255])) { return true; }
	}

	return false;
}

function whatKey() {
    //console.log(keys);
	if (keys[37] || keys["ArrowLeft"]) {
		//velX = -4;  left key
		const leftSide = [];
		for (i = wallThickness; i < avatarHeight - wallThickness; i++) {
			leftSide.push(canvas.getContext('2d').getImageData(avatarX, avatarY + i, 1, 1).data);
		}

		if (avatarX < 0 || checkEquality(leftSide)) {
			velX = 0;
			velY = 0;
		} else if (velX > -maxSpeed) {
			velX -= 1.0;
		}
	}

	if (keys[39] || keys["ArrowRight"]) {
		//velX = 4;  right key
		const rightSide = [];
		for (i = wallThickness; i < avatarHeight - wallThickness; i++) {
			rightSide.push(canvas.getContext('2d').getImageData(avatarX + avatarWidth, avatarY + i, 1, 1).data);
		}

		// console.log(rightSide);
		if (avatarX > canvas.width - avatarWidth || checkEquality(rightSide)) {
			velX = 0;
			velY = 0;
		} else if (velX < maxSpeed) {
			velX += 1.0;
		}
	}

	if (keys[40] || keys["ArrowDown"]) {
		//velY = 4;  down key
		const bottomSide = [];
		for (i = wallThickness; i < avatarWidth - wallThickness; i++) {
			bottomSide.push(canvas.getContext('2d').getImageData(avatarX + i, avatarY + avatarHeight, 1, 1).data);
		}

		if (avatarY > canvas.height - avatarHeight || checkEquality(bottomSide)) {
			velX = 0;
			velY = 0;
		} else if (velY < maxSpeed) {
			velY += 1.0;
		}
	}

	if (keys[38] || keys["ArrowUp"]) {
		//velY = 4;  up key
		const topSide = [];
		for (i = wallThickness; i < avatarWidth - wallThickness; i++) {
			topSide.push(canvas.getContext('2d').getImageData(avatarX + i, avatarY, 1, 1).data);
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
	const stack = [];
	const visited = makeArray(rows, cols, false);
	stack.push(startCell);
	visited[startCell[COL]][startCell[ROW]] = true;
	solvePath = solveHelper(stack, visited, maze);
	console.log(solvePath);
}

function solveHelper(stack, visited, maze) {
	while (stack.length !== 0) {
		const curr = stack.pop();
		const validNeighbors = noWallUnvisitedNeighbors(curr, visited);
		if (validNeighbors.length !== 0) {
			stack.push(curr);

			//Choose one of valid neighbors
			const next = validNeighbors[getRandomInt(validNeighbors.length)];
			visited[next[COL]][next[ROW]] = true;
			stack.push(next);
			if (next[ROW] === endCell[ROW] && next[COL] === endCell[COL]) {
				return stack;
			}
		}
	}
}

/* Returns an array of cells neighboring the selected cell that have no wall in between
   and is unvisited */
function noWallUnvisitedNeighbors(cell, visited) {
	const validNeighbors = [];
	const currRow = cell[ROW];
	const currCol = cell[COL];
	let tempCell;

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

// Returns an array of cells neighboring the selected cell that have no wall in between
function noWallNeighbors(cell) {
	const validNeighbors = [];
	const currRow = cell[ROW];
	const currCol = cell[COL];
	let tempCell;

	// Check cell on top
	if (currRow !== 0 && maze[currCol][currRow].walls.indexOf('top') === -1) {
		tempCell = [currCol, currRow - 1];
		validNeighbors.push(tempCell);
	}

	// Check cell below
	if (currRow !== visited[currCol].length - 1 && maze[currCol][currRow].walls.indexOf('bot') === -1) {
		tempCell = [currCol, currRow + 1];
		validNeighbors.push(tempCell);
	}

	// Check cell to left
	if (currCol !== 0 && maze[currCol][currRow].walls.indexOf('left') === -1) {
		tempCell = [currCol - 1, currRow];
		validNeighbors.push(tempCell);
	}

	// Check cell to right
	if (currCol !== visited.length - 1 && maze[currCol][currRow].walls.indexOf('right') === -1) {
		tempCell = [currCol + 1, currRow];
		validNeighbors.push(tempCell);
	}

	return validNeighbors;
}

/* Returns an array of cells that will spawn puzzles when avatar steps on it
   Location of puzzles should be as even as possible
   Puzzles should help indicate that the player is going in the right direction
   i.e. after passing a cell that has noWallNeighbors length of 3
*/
function getPuzzleLocations(numPuzzles = 3) {
	puzzleCells = [];
	let zoneLength = solvePath.length / (numPuzzles + 1);
	let puzzlesAdded = 0;
	for (let i = 0; i < solvePath.length && puzzlesAdded < numPuzzles; i++) {
		if (i === parseInt(zoneLength * (puzzlesAdded + 1))) {
			puzzleCells.push(solvePath[i]);
			puzzlesAdded++;
		}
	}
	// console.log(puzzleCells);
	makePuzzles();
}

// Shows where puzzles will spawn
function displayPuzzleLocations() {
	for (let i = 0; i < puzzleCells.length; i++) {
		ctx.fillStyle = 'rgba(20, 20, 255, 0.8)';
		ctx.fillRect(puzzleCells[i][COL] * cellWidth + widthOffset, puzzleCells[i][ROW] * cellHeight + heightOffset, cellWidth, cellHeight);
	}
}

// Returns index of puzzle cell that the avatar is currently on or -1 if not on puzzle
function checkOnPuzzle() {
	for (let i = 0; i < puzzleCells.length; i++) {
		const cell = checkInCell(puzzleCells[i]);
		if (cell !== undefined) {
			// console.log(cell);
			return i;
		}
	}

	return -1;
}

// Returns true if avatar is on the endCell
function checkEnd() {
	if (checkInCell(endCell)) {
		const modal = document.getElementById('endModal');
		const modalBtn = document.getElementById('endModalBtn');
		if (modal.getAttribute("solved") === "false") {
			openModal(modal, modalBtn);
		}
	}
}

// Returns the cell the avatar is on or undefined if it isn't on that cell
function checkInCell(cell) {
	const leftBound = cell[COL] * cellWidth + widthOffset;
	const rightBound = (cell[COL] + 1) * cellWidth + widthOffset;
	const topBound = cell[ROW] * cellHeight + heightOffset;
	const botBound = (cell[ROW] + 1) * cellHeight + heightOffset;
	// console.log(cell);
	// console.log([leftBound, rightBound, topBound, botBound]);
	const middle = [avatarX + avatarWidth / 2, avatarY + avatarHeight / 2];
	// console.log(middle);
	if (middle[COL] > leftBound && middle[COL] < rightBound && middle[ROW] > topBound && middle[ROW] < botBound) {
		// console.log(true);
		return cell;
	}
	return;
}

// Creates modals for the puzzles
function makePuzzles() {
	const body = document.getElementsByTagName('BODY')[0];
	for (let i = 0; i < puzzleCells.length; i++) {
		const modal = document.createElement('DIV');
		modal.classList.add('modal');
		modal.style.display = 'none';
		modal.id = 'puzzle' + i;
		modal.setAttribute('solved', false);

		const modalContent = document.createElement('DIV');
		modalContent.classList.add('modal-content');
		const modalHeader = document.createElement('DIV');
		modalHeader.classList.add('modal-header');
		const modalButton = document.createElement('SPAN');
		modalButton.classList.add('closeBtn');
		modalButton.innerHTML = '&times;';
		modalButton.id = 'puzzleBtn' + i;
		// modalButton.addEventListener('click', openModal);
		// modalButton.addEventListener('click', closeModal);
		modalHeader.appendChild(modalButton);
		const modalBody = document.createElement('DIV');
		modalBody.classList.add('modal-body');
		modalBody.textContent = "Puzzle " + i;
		const puzzleCanvas = document.createElement('CANVAS');
		puzzleCanvas.id = 'puzzleCanvas' + i;
		// puzzleCanvas.style.resize = 'both';
		modalBody.appendChild(puzzleCanvas);
		const modalFooter = document.createElement('DIV');
		modalFooter.classList.add('modal-footer');
		modalContent.appendChild(modalHeader);
		modalContent.appendChild(modalBody);
		modalContent.appendChild(modalFooter);
		modal.appendChild(modalContent);
		body.appendChild(modal);
	}
}

// Creates the end modal
function makeEndModal() {
	const body = document.getElementsByTagName('BODY')[0];
	const modal = document.createElement('DIV');
	modal.classList.add('modal');
	modal.id = 'endModal';
	modal.setAttribute('solved', false);
	const modalContent = document.createElement('DIV');
	modalContent.classList.add('modal-content');
	const modalHeader = document.createElement('DIV');
	modalHeader.classList.add('modal-header');
	const modalButton = document.createElement('SPAN');
	modalButton.classList.add('closeBtn');
	modalButton.innerHTML = '&times;';
	modalButton.id = 'endModalBtn';
	modalHeader.appendChild(modalButton);
	const modalBody = document.createElement('DIV');
	modalBody.classList.add('modal-body');
	modalBody.textContent = 'Great job! You solved the maze!';
	const modalFooter = document.createElement('DIV');
	modalFooter.classList.add('modal-footer');
	modalContent.appendChild(modalHeader);
	modalContent.appendChild(modalBody);
	modalContent.appendChild(modalFooter);
	modal.appendChild(modalContent);
	body.appendChild(modal);
}

function removeElementsByClass(className) {
	const elements = document.getElementsByClassName(className);
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}
}

//function to open modalBtn
function openModal(modal, button) {
	modal.style.display = 'block';
	modal.style.width = window.innerWidth + 'px';
	modal.style.height = window.innerHeight + 'px';
	button.addEventListener('click', closeModal);
	// button.style.display = 'block';
	currModal = modal;
	inModal = true;
	velX = 0;
	velY = 0;
}

function closeModal() {
	currModal.style.display = 'none';
	currModal.setAttribute("solved", true);
	inModal = false;
}


function displayPuzzleModal(index) {
	if (index > -1) {
		const modalId = 'puzzle' + index;
		const buttonId = 'puzzleBtn' + index;
		const modal = document.getElementById(modalId);
		const button = document.getElementById(buttonId);
		// console.log(modal.getAttribute("solved"));
		if (modal.getAttribute("solved") === "false") {
			openModal(modal, button);
			// canvas.style.height = window.innerWidth + 'px';
			// canvas.style.height = window.innerHeight + 'px';
		}
	}
}

init();


/* Character creation */
const character_select = document.getElementById('character-select');
character_select.style.display = "block";

// Skin tone select
const skin_select = document.getElementById("skin");
const skin_route = '';

const isFirst = true;
function select(color) {
	console.log(color);
	body = document.getElementById("skin-a");
	function switchSkin(c) {
		switch (c) {

			case "#ffe0b4":
				body.setAttribute("src", "images/body/b1.png");
				break;

			case "#f8d998":
				body.setAttribute("src", "images/body/b2.png");
				break;

			case "#b26644":
				body.setAttribute("src", "images/body/b3.png");
				break;

			case "#935f37":
				body.setAttribute("src", "images/body/b4.png");
				break;

			case "#7f4422":
				body.setAttribute("src", "images/body/b5.png");
				break;

			case "#3c200a":
				body.setAttribute("src", "images/body/b6.png");
				break;


		}
	}

	if (isFirst) {
		skin_tone = document.getElementById(color);
		skin_tone.style.border = "1px solid  #f94e30 ";
		switchSkin(color);
		isFirst = false;
	} else {
		skin_tone.style.border = "0px";
		skin_tone = document.getElementById(color);
		skin_tone.style.border = "1px solid  #f94e30 ";
		switchSkin(color);

	}
	//avatar.style.background = color;
	//character_select.style.display = "none";
}

// Hair select
const hair_select = document.getElementById("hair-select");
const hair_back = document.getElementById("hair-back");
const hair_forward = document.getElementById("hair-forward");
const MAX_HAIR = 18;
const MIN_HAIR = 1;
const current_hair = document.getElementById("current-hair");
let current_n = 1;
let route;
let color = "black";

function switchHair(n) {
	if (current_n === MAX_HAIR) {
		if (n === "forward") {
			current_n = MIN_HAIR;
			route = "images/hair/h" + current_n + color + ".png";
			current_hair.setAttribute("src", route);
			current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
		}
		if (n === "back") {
			current_n--;
			route = "images/hair/h" + current_n + color + ".png";
			current_hair.setAttribute("src", route);
			current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
		}
	}
	else if (current_n === MIN_HAIR) {
		if (n === "forward") {
			current_n++;
			route = "images/hair/h" + current_n + color + ".png";
			current_hair.setAttribute("src", route);
			current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
		}
		if (n === "back") {
			current_n = MAX_HAIR;
			route = "images/hair/h" + current_n + color + ".png";
			current_hair.setAttribute("src", route);
			current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
		}
	}
	else if (n === "forward") {
		current_n++;
		route = "images/hair/h" + current_n + color + ".png";
		current_hair.setAttribute("src", route);
		current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
	else if (n === "back") {
		current_n--;
		route = "images/hair/h" + current_n + color + ".png";
		current_hair.setAttribute("src", route);
		current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
}

function switchColor(c) {
	color = c;
	route = "images/hair/h" + current_n + color + ".png";
	current_hair.setAttribute("src", route);
	current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
}

function selectHair(image) {
	const hair = document.getElementById("hair-a");
	const hair_s = document.getElementById("hair-shading");

	switch (image) {

		case "images/hair/h1black.png":
			hair.setAttribute("src", "images/hair/h1black.png");
			hair_s.setAttribute("src", "images/hair/h1 color map.png");
			break;

		case "images/hair/h2black.png":
			hair.setAttribute("src", "images/hair/h2black.png");
			hair_s.setAttribute("src", "images/hair/h2 color map.png");
			break;

		case "images/hair/h3black.png":
			hair.setAttribute("src", "images/hair/h3black.png");
			hair_s.setAttribute("src", "images/hair/h3 color map.png");
			break;

		case "images/hair/h4black.png":
			hair.setAttribute("src", "images/hair/h4black.png");
			hair_s.setAttribute("src", "images/hair/h4 color map.png");
			break;

		case "images/hair/h5black.png":
			hair.setAttribute("src", "images/hair/h5black.png");
			hair_s.setAttribute("src", "images/hair/h5 color map.png");
			break;

		case "images/hair/h6black.png":
			hair.setAttribute("src", "images/hair/h6black.png");
			hair_s.setAttribute("src", "images/hair/h6 color map.png");
			break;

		case "images/hair/h7black.png":
			hair.setAttribute("src", "images/hair/h7black.png");
			hair_s.setAttribute("src", "images/hair/h7 color map.png");
			break;

		case "images/hair/h8black.png":
			hair.setAttribute("src", "images/hair/h8black.png");
			hair_s.setAttribute("src", "images/hair/h8 color map.png");
			break;

		case "images/hair/h9black.png":
			hair.setAttribute("src", "images/hair/h9black.png");
			hair_s.setAttribute("src", "images/hair/h9 color map.png");
			break;

		case "images/hair/h10black.png":
			hair.setAttribute("src", "images/hair/h10black.png");
			hair_s.setAttribute("src", "images/hair/h10 color map.png");
			break;

		case "images/hair/h11black.png":
			hair.setAttribute("src", "images/hair/h11black.png");
			hair_s.setAttribute("src", "images/hair/h11 color map.png");
			break;

		case "images/hair/h12black.png":
			hair.setAttribute("src", "images/hair/h12black.png");
			hair_s.setAttribute("src", "images/hair/h12 color map.png");
			break;

		case "images/hair/h13black.png":
			hair.setAttribute("src", "images/hair/h13black.png");
			hair_s.setAttribute("src", "images/hair/h13 color map.png");
			break;

		case "images/hair/h14black.png":
			hair.setAttribute("src", "images/hair/h14black.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h15black.png":
			hair.setAttribute("src", "images/hair/h15black.png");
			hair_s.setAttribute("src", "images/hair/h15 color map.png");
			break;

		case "images/hair/h16black.png":
			hair.setAttribute("src", "images/hair/h16black.png");
			hair_s.setAttribute("src", "images/hair/h16 color map.png");
			break;

		case "images/hair/h17black.png":
			hair.setAttribute("src", "images/hair/h17black.png");
			hair_s.setAttribute("src", "images/hair/h17 color map.png");
			break;

		case "images/hair/h1blond.png":
			hair.setAttribute("src", "images/hair/h1blond.png");
			hair_s.setAttribute("src", "images/hair/h1 color map.png");
			break;

		case "images/hair/h2blond.png":
			hair.setAttribute("src", "images/hair/h2blond.png");
			hair_s.setAttribute("src", "images/hair/h2 color map.png");
			break;

		case "images/hair/h3blond.png":
			hair.setAttribute("src", "images/hair/h3blond.png");
			hair_s.setAttribute("src", "images/hair/h3 color map.png");
			break;

		case "images/hair/h4blond.png":
			hair.setAttribute("src", "images/hair/h4blond.png");
			hair_s.setAttribute("src", "images/hair/h4 color map.png");
			break;

		case "images/hair/h5blond.png":
			hair.setAttribute("src", "images/hair/h5blond.png");
			hair_s.setAttribute("src", "images/hair/h5 color map.png");
			break;

		case "images/hair/h6blond.png":
			hair.setAttribute("src", "images/hair/h6blond.png");
			hair_s.setAttribute("src", "images/hair/h6 color map.png");
			break;

		case "images/hair/h7blond.png":
			hair.setAttribute("src", "images/hair/h7blond.png");
			hair_s.setAttribute("src", "images/hair/h7 color map.png");
			break;

		case "images/hair/h8blond.png":
			hair.setAttribute("src", "images/hair/h8blond.png");
			hair_s.setAttribute("src", "images/hair/h8 color map.png");
			break;

		case "images/hair/h9blond.png":
			hair.setAttribute("src", "images/hair/h9blond.png");
			hair_s.setAttribute("src", "images/hair/h9 color map.png");
			break;

		case "images/hair/h10blond.png":
			hair.setAttribute("src", "images/hair/h10blond.png");
			hair_s.setAttribute("src", "images/hair/h10 color map.png");
			break;

		case "images/hair/h11blond.png":
			hair.setAttribute("src", "images/hair/h11blond.png");
			hair_s.setAttribute("src", "images/hair/h11 color map.png");
			break;

		case "images/hair/h12blond.png":
			hair.setAttribute("src", "images/hair/h12blond.png");
			hair_s.setAttribute("src", "images/hair/h12 color map.png");
			break;

		case "images/hair/h13blond.png":
			hair.setAttribute("src", "images/hair/h13blond.png");
			hair_s.setAttribute("src", "images/hair/h13 color map.png");
			break;

		case "images/hair/h14blond.png":
			hair.setAttribute("src", "images/hair/h14blond.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h15blond.png":
			hair.setAttribute("src", "images/hair/h15blond.png");
			hair_s.setAttribute("src", "images/hair/h15 color map.png");
			break;

		case "images/hair/h16blond.png":
			hair.setAttribute("src", "images/hair/h16blond.png");
			hair_s.setAttribute("src", "images/hair/h16 color map.png");
			break;

		case "images/hair/h17blond.png":
			hair.setAttribute("src", "images/hair/h17blond.png");
			hair_s.setAttribute("src", "images/hair/h17 color map.png");
			break;

		case "images/hair/h1brown.png":
			hair.setAttribute("src", "images/hair/h1brown.png");
			hair_s.setAttribute("src", "images/hair/h1 color map.png");
			break;

		case "images/hair/h2brown.png":
			hair.setAttribute("src", "images/hair/h2brown.png");
			hair_s.setAttribute("src", "images/hair/h2 color map.png");
			break;

		case "images/hair/h3brown.png":
			hair.setAttribute("src", "images/hair/h3brown.png");
			hair_s.setAttribute("src", "images/hair/h3 color map.png");
			break;

		case "images/hair/h4brown.png":
			hair.setAttribute("src", "images/hair/h4brown.png");
			hair_s.setAttribute("src", "images/hair/h4 color map.png");
			break;

		case "images/hair/h5brown.png":
			hair.setAttribute("src", "images/hair/h5brown.png");
			hair_s.setAttribute("src", "images/hair/h5 color map.png");
			break;

		case "images/hair/h6brown.png":
			hair.setAttribute("src", "images/hair/h6brown.png");
			hair_s.setAttribute("src", "images/hair/h6 color map.png");
			break;

		case "images/hair/h7brown.png":
			hair.setAttribute("src", "images/hair/h7brown.png");
			hair_s.setAttribute("src", "images/hair/h7 color map.png");
			break;

		case "images/hair/h8brown.png":
			hair.setAttribute("src", "images/hair/h8brown.png");
			hair_s.setAttribute("src", "images/hair/h8 color map.png");
			break;

		case "images/hair/h9brown.png":
			hair.setAttribute("src", "images/hair/h9brown.png");
			hair_s.setAttribute("src", "images/hair/h9 color map.png");
			break;

		case "images/hair/h10brown.png":
			hair.setAttribute("src", "images/hair/h10brown.png");
			hair_s.setAttribute("src", "images/hair/h10 color map.png");
			break;

		case "images/hair/h11brown.png":
			hair.setAttribute("src", "images/hair/h11brown.png");
			hair_s.setAttribute("src", "images/hair/h11 color map.png");
			break;

		case "images/hair/h12brown.png":
			hair.setAttribute("src", "images/hair/h12brown.png");
			hair_s.setAttribute("src", "images/hair/h12 color map.png");
			break;

		case "images/hair/h13brown.png":
			hair.setAttribute("src", "images/hair/h13brown.png");
			hair_s.setAttribute("src", "images/hair/h13 color map.png");
			break;

		case "images/hair/h14brown.png":
			hair.setAttribute("src", "images/hair/h14brown.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h15brown.png":
			hair.setAttribute("src", "images/hair/h15brown.png");
			hair_s.setAttribute("src", "images/hair/h15 color map.png");
			break;

		case "images/hair/h16brown.png":
			hair.setAttribute("src", "images/hair/h16brown.png");
			hair_s.setAttribute("src", "images/hair/h16 color map.png");
			break;

		case "images/hair/h17brown.png":
			hair.setAttribute("src", "images/hair/h17brown.png");
			hair_s.setAttribute("src", "images/hair/h17 color map.png");
			break;

		case "images/hair/h1ginger.png":
			hair.setAttribute("src", "images/hair/h1ginger.png");
			hair_s.setAttribute("src", "images/hair/h1 color map.png");
			break;

		case "images/hair/h2ginger.png":
			hair.setAttribute("src", "images/hair/h2ginger.png");
			hair_s.setAttribute("src", "images/hair/h2 color map.png");
			break;

		case "images/hair/h3ginger.png":
			hair.setAttribute("src", "images/hair/h3ginger.png");
			hair_s.setAttribute("src", "images/hair/h3 color map.png");
			break;

		case "images/hair/h4ginger.png":
			hair.setAttribute("src", "images/hair/h4ginger.png");
			hair_s.setAttribute("src", "images/hair/h4 color map.png");
			break;

		case "images/hair/h5ginger.png":
			hair.setAttribute("src", "images/hair/h5ginger.png");
			hair_s.setAttribute("src", "images/hair/h5 color map.png");
			break;

		case "images/hair/h6ginger.png":
			hair.setAttribute("src", "images/hair/h6ginger.png");
			hair_s.setAttribute("src", "images/hair/h6 color map.png");
			break;

		case "images/hair/h7ginger.png":
			hair.setAttribute("src", "images/hair/h7ginger.png");
			hair_s.setAttribute("src", "images/hair/h7 color map.png");
			break;

		case "images/hair/h8ginger.png":
			hair.setAttribute("src", "images/hair/h8ginger.png");
			hair_s.setAttribute("src", "images/hair/h8 color map.png");
			break;

		case "images/hair/h9ginger.png":
			hair.setAttribute("src", "images/hair/h9ginger.png");
			hair_s.setAttribute("src", "images/hair/h9 color map.png");
			break;

		case "images/hair/h10ginger.png":
			hair.setAttribute("src", "images/hair/h10ginger.png");
			hair_s.setAttribute("src", "images/hair/h10 color map.png");
			break;

		case "images/hair/h11ginger.png":
			hair.setAttribute("src", "images/hair/h11ginger.png");
			hair_s.setAttribute("src", "images/hair/h11 color map.png");
			break;

		case "images/hair/h12ginger.png":
			hair.setAttribute("src", "images/hair/h12ginger.png");
			hair_s.setAttribute("src", "images/hair/h12 color map.png");
			break;

		case "images/hair/h13ginger.png":
			hair.setAttribute("src", "images/hair/h13ginger.png");
			hair_s.setAttribute("src", "images/hair/h13 color map.png");
			break;

		case "images/hair/h14ginger.png":
			hair.setAttribute("src", "images/hair/h14ginger.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h15ginger.png":
			hair.setAttribute("src", "images/hair/h15ginger.png");
			hair_s.setAttribute("src", "images/hair/h15 color map.png");
			break;

		case "images/hair/h16ginger.png":
			hair.setAttribute("src", "images/hair/h16ginger.png");
			hair_s.setAttribute("src", "images/hair/h16 color map.png");
			break;

		case "images/hair/h17ginger.png":
			hair.setAttribute("src", "images/hair/h17ginger.png");
			hair_s.setAttribute("src", "images/hair/h17 color map.png");
			break;

		case "images/hair/h18black.png":
			hair.setAttribute("src", "images/hair/h18.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h18ginger.png":
			hair.setAttribute("src", "images/hair/h18.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h18blond.png":
			hair.setAttribute("src", "images/hair/h18.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

		case "images/hair/h18brown.png":
			hair.setAttribute("src", "images/hair/h18.png");
			hair_s.setAttribute("src", "images/blank.png");
			break;

	}
}


// Clothes Select
const clothes_select = document.getElementById("clothes-select");
const pants_back = document.getElementById("pants-back");
const pants_forward = document.getElementById("pants-forward");
const MAX_PANTS = 4;
const MIN_PANTS = 1;
const MAX_SHIRT = 18;
const MIN_SHIRT = 1;
const current_pants = document.getElementById("current-pants");
const current_shirt = document.getElementById("current-shirt");
let current_p = 1;
let current_s = 1;


function switchPants(p) {
	if (current_p == MAX_PANTS) {
		if (p === "forward") {
			current_p = MIN_PANTS;
			current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
			current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
		}
		if (p === "back") {
			current_p--;
			current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
			current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
		}
	}
	else if (current_p == MIN_PANTS) {
		if (p === "forward") {
			current_p++;
			current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
			current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
		}
		if (p === "back") {
			current_p = MAX_PANTS;
			current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
			current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
		}
	}
	else if (p === "forward") {
		current_p++;
		current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
		current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
	}
	else if (p === "back") {
		current_p--;
		current_pants.setAttribute("src", "images/pants/p" + current_p + ".png");
		current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p" + current_p + ".png" + "\")");
	}
}

function switchShirt(s) {
	if (current_s == MAX_SHIRT) {
		if (s === "forward") {
			current_s = MIN_SHIRT;
			current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
			current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
		}
		if (s === "back") {
			current_s--;
			current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
			current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
		}
	}
	else if (current_s == MIN_SHIRT) {
		if (s === "forward") {
			current_s++;
			current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
			current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
		}
		if (s === "back") {
			current_s = MAX_SHIRT;
			current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
			current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
		}
	}
	else if (s === "forward") {
		current_s++;
		current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
		current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
	}
	else if (s === "back") {
		current_s--;
		current_shirt.setAttribute("src", "images/shirt/s" + current_s + ".png");
		current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s" + current_s + ".png" + "\")");
	}
}



function selectClothes(clothes) {
	pants = document.getElementById("pants-a");
	shirt = document.getElementById("shirt-a");

	switch (clothes) {

		case "images/shirt/s1.png":
			shirt.setAttribute("src", "images/shirt/s1.png");
			break;

		case "images/shirt/s2.png":
			shirt.setAttribute("src", "images/shirt/s2.png");
			break;

		case "images/shirt/s3.png":
			shirt.setAttribute("src", "images/shirt/s3.png");
			break;

		case "images/shirt/s4.png":
			shirt.setAttribute("src", "images/shirt/s4.png");
			break;

		case "images/shirt/s5.png":
			shirt.setAttribute("src", "images/shirt/s5.png");
			break;

		case "images/shirt/s6.png":
			shirt.setAttribute("src", "images/shirt/s6.png");
			break;

		case "images/shirt/s7.png":
			shirt.setAttribute("src", "images/shirt/s7.png");
			break;

		case "images/shirt/s8.png":
			shirt.setAttribute("src", "images/shirt/s8.png");
			break;

		case "images/shirt/s9.png":
			shirt.setAttribute("src", "images/shirt/s9.png");
			break;

		case "images/shirt/s10.png":
			shirt.setAttribute("src", "images/shirt/s10.png");
			break;

		case "images/shirt/s11.png":
			shirt.setAttribute("src", "images/shirt/s11.png");
			break;

		case "images/shirt/s12.png":
			shirt.setAttribute("src", "images/shirt/s12.png");
			break;

		case "images/shirt/s13.png":
			shirt.setAttribute("src", "images/shirt/s13.png");
			break;

		case "images/shirt/s14.png":
			shirt.setAttribute("src", "images/shirt/s14.png");
			break;

		case "images/shirt/s15.png":
			shirt.setAttribute("src", "images/shirt/s15.png");
			break;

		case "images/shirt/s16.png":
			shirt.setAttribute("src", "images/shirt/s16.png");
			break;

		case "images/shirt/s17.png":
			shirt.setAttribute("src", "images/shirt/s17.png");
			break;

		case "images/shirt/s18.png":
			shirt.setAttribute("src", "images/shirt/s18.png");
			break;



		case "images/pants/p1.png":
			pants.setAttribute("src", "images/pants/p1.png");
			break;

		case "images/pants/p2.png":
			pants.setAttribute("src", "images/pants/p2.png");
			break;

		case "images/pants/p3.png":
			pants.setAttribute("src", "images/pants/p3.png");
			break;

		case "images/pants/p4.png":
			pants.setAttribute("src", "images/pants/p4.png");
			break;

	}

}


// Eyes Select
const eyes_back = document.getElementById("eyes-back");
const eyes_forward = document.getElementById("eyes-forward");
const MAX_EYES = 6;
const MIN_EYES = 1;
const current_eyes = document.getElementById("current-eyes");
let current_e = 1;

function switchEyes(e) {
	if (current_e == MAX_EYES) {
		if (e === "forward") {
			current_e = MIN_EYES;
			current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
			current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
		}
		if (e === "back") {
			current_e--;
			current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
			current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
		}
	}
	else if (current_e == MIN_EYES) {
		if (e === "forward") {
			current_e++;
			current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
			current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
		}
		if (e === "back") {
			current_e = MAX_EYES;
			current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
			current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
		}
	}
	else if (e === "forward") {
		current_e++;
		current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
		current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
	}
	else if (e === "back") {
		current_e--;
		current_eyes.setAttribute("src", "images/eyes/e" + current_e + ".png");
		current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e" + current_e + ".png" + "\")");
	}
}

function selectEyes(ey) {
	eye = document.getElementById("eyes-a");

	switch (ey) {

		case "images/eyes/e1.png":
			eye.setAttribute("src", "images/eyes/e1.png");
			break;

		case "images/eyes/e2.png":
			console.log("hi");
			eye.setAttribute("src", "images/eyes/e2.png");
			break;

		case "images/eyes/e3.png":
			eye.setAttribute("src", "images/eyes/e3.png");
			break;

		case "images/eyes/e4.png":
			eye.setAttribute("src", "images/eyes/e4.png");
			break;

		case "images/eyes/e5.png":
			eye.setAttribute("src", "images/eyes/e5.png");
			break;

		case "images/eyes/e6.png":
			eye.setAttribute("src", "images/eyes/e6.png");
			break;
	}

}


// Accessories select
const acc_back = document.getElementById("acc-back");
const acc_forward = document.getElementById("acc-forward");
const MAX_ACC = 6;
const MIN_ACC = 1;
const current_acc = document.getElementById("current-acc");
let current_a = 1;

function switchAcc(a) {
	if (current_a == MAX_ACC) {
		if (a === "forward") {
			current_a = MIN_ACC;
			current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
			current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
		}
		if (a === "back") {
			current_a--;
			current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
			current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
		}
	}
	else if (current_a == MIN_ACC) {
		if (a === "forward") {
			current_a++;
			current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
			current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
		}
		if (a === "back") {
			current_a = MAX_ACC;
			current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
			current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
		}
	}
	else if (a === "forward") {
		current_a++;
		current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
		current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
	}
	else if (a === "back") {
		current_a--;
		current_acc.setAttribute("src", "images/accessories/a" + current_a + ".png");
		current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a" + current_a + ".png" + "\")");
	}
}


function selectAcc(ac) {
	acc = document.getElementById("acc-a");

	switch (ac) {

		case "images/accessories/a1.png":
			acc.setAttribute("src", "images/accessories/aa1.png");
			break;

		case "images/accessories/a2.png":
			acc.setAttribute("src", "images/accessories/a2.png");
			break;

		case "images/accessories/a3.png":
			acc.setAttribute("src", "images/accessories/a3.png");
			break;

		case "images/accessories/a4.png":
			acc.setAttribute("src", "images/accessories/a4.png");
			break;

		case "images/accessories/a5.png":
			acc.setAttribute("src", "images/accessories/a5.png");
			break;

		case "images/accessories/a6.png":
			acc.setAttribute("src", "images/accessories/a6.png");
			break;


	}

}

function start() {
	/*
	  ctx2.clearRect(avatarX, avatarY, avatarWidth, avatarHeight);
	  const imageObj1 = new Image();
	  const imageObj2 = new Image();
	  const imageObj3 = new Image();
	  imageObj1.src = "images/hair/h12ginger.png";
	  imageObj1.onload = function() {
	  ctx2.drawImage(imageObj1, 0, 0, 100, 90);
	  imageObj2.src = "images/eyes/e2.png";
	  imageObj2.onload = function() {
	  ctx2.drawImage(imageObj2, 0, 0, 100, 90);
	  }
	  imageObj3.src = "images/pants/p3.png";
	  imageObj3.onload = function() {
	  ctx.drawImage(imageObj3, 0, 0, 100, 90);
	  const img = canvas2.toDataURL("image/png");
	  document.write('<img src="' + img + '" style="image-rendering:auto; image-rendering:crisp-edges; image-rendering:pixelated;" />');
	  }
	  };*/
	character_select.style = "none";
}
