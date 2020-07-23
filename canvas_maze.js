// Global variables
var defaultRows = 8;
var defaultCols = 8;
var maze = []; //will be a 2d array of "cells" containing info about walls
var startCell, endCell;
var ROW = 0;
var COL = 1;

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function init(){
  makeBlankMaze();
  mazeGenBacktracking();
  drawWalls();
  console.log(maze);
  // console.log(mazeSolver());
}

// Creates an empty grid with start and end cells in HTML file and returns the maze
function makeBlankMaze(rows = defaultRows, cols = defaultCols){
    maze = [];
    for (var r = 0; r < rows; r++){
      maze.push([]);
      for(var c = 0; c < cols; c++){
        maze[r].push({});
      }
    }
    // console.log(maze);
    fillWalls();
    return makeStartEndCells(rows, cols);
}

// Fills the maze with walls and borders
function fillWalls(rows = defaultRows, cols = defaultCols){
  for (var r = 0; r < rows; r++){
    for (var c = 0; c < cols; c++){
      maze[r][c].walls = ['top', 'bot', 'left', 'right'];
      maze[r][c].borders = [];
      // console.log(r);
      // console.log(c);
      if (r === 0){
        maze[r][c].borders.push('topBorder');
      }
      if (r === maze.length - 1){
        maze[r][c].borders.push('botBorder');
      }
      if (c === 0){
        maze[r][c].borders.push('leftBorder');
      }
      if (c === maze[r].length - 1){
        maze[r][c].borders.push('rightBorder');
      }
    }
  }
  // console.log(maze);
}

// Draws the walls on the canvas
function drawWalls(){

}

// Returns a random integer between 0 and the given maximum (noninclusive) parameter
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Determines startCell and endCell
function makeStartEndCells(rows = defaultRows, cols = defaultCols){
  var mazeOrient = getRandomInt(4);
  var tempIdx;
  switch(mazeOrient){
    case 0: //start left end right
      startCell = [getRandomInt(rows), 0];
      tempIdx = maze[startCell[ROW]][startCell[COL]].walls.indexOf('left');
      maze[startCell[ROW]][startCell[COL]].walls.splice(tempIdx, 1);

      endCell = [getRandomInt(rows), cols - 1];
      tempIdx = maze[endCell[ROW]][endCell[COL]].walls.indexOf('right');
      maze[endCell[ROW]][endCell[COL]].walls.splice(tempIdx, 1);
      break;
    case 1: // start right end left
      startCell = [getRandomInt(rows), cols - 1];
      tempIdx = maze[startCell[ROW]][startCell[COL]].walls.indexOf('right');
      maze[startCell[ROW]][startCell[COL]].walls.splice(tempIdx, 1);

      endCell = [getRandomInt(rows), 0];
      tempIdx = maze[endCell[ROW]][endCell[COL]].walls.indexOf('left');
      maze[endCell[ROW]][endCell[COL]].walls.splice(tempIdx, 1);
      break;
    case 2: //start top end bot
      startCell = [0, getRandomInt(cols)];
      tempIdx = maze[startCell[ROW]][startCell[COL]].walls.indexOf('top');
      maze[startCell[ROW]][startCell[COL]].walls.splice(tempIdx, 1);

      endCell = [rows - 1, getRandomInt(cols)];
      tempIdx = maze[endCell[ROW]][endCell[COL]].walls.indexOf('bot');
      maze[endCell[ROW]][endCell[COL]].walls.splice(tempIdx, 1);
      break;
    default: // start bot end top
      startCell = [rows - 1, getRandomInt(cols)];
      tempIdx = maze[startCell[ROW]][startCell[COL]].walls.indexOf('bot');
      maze[startCell[ROW]][startCell[COL]].walls.splice(tempIdx, 1);

      endCell = [0, getRandomInt(cols)];
      tempIdx = maze[endCell[ROW]][endCell[COL]].walls.indexOf('top');
      maze[endCell[ROW]][endCell[COL]].walls.splice(tempIdx, 1);
      break;
  }
  console.log(startCell);
  console.log(endCell);
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
function mazeGenBacktracking(rows = defaultRows, cols = defaultCols){
  var stack = [];
  var visited = makeArray(rows, cols, false);
  stack.push(startCell);
  visited[startCell[ROW]][startCell[COL]] = true;
  // console.log(visited);
  backtrackGenHelper(stack, visited, maze);
}

function backtrackGenHelper(stack, visited, maze){
  while (stack.length !== 0){
    var curr = stack.pop();
    var unvisited = unvisitedNeighbors(curr, visited);
    // console.log(unvisited);
    if (unvisited.length !== 0){
      stack.push(curr);
      //Choose one of unvisited neighbors
      var next = unvisited[getRandomInt(unvisited.length)];
      // console.log(next);
      removeWall(curr, next);
      visited[next[ROW]][next[COL]] = true;
      // console.log(visited);
      stack.push(next);
    }
  }
}

// Returns a rows by cols sized array filled with fillValue
function makeArray(rows, cols, fillValue){
  var temp = [];
  for (var r = 0; r < rows; r++){
    temp.push([]);
    for(var c = 0; c < cols; c++){
      temp[r].push(fillValue);
    }
  }
  // console.log(temp);
  return temp;
}

// Takes two cells and removes the adjacent wall. Doesn't return anything.
function removeWall(start, end){
  var relativePosition = [end[ROW] - start[ROW], end[COL] - start[COL]];
  var tempIdx;
  switch (relativePosition.join(' ')){
    // start is on top of end
    case "1 0":
      // console.log("1");
      tempIdx = maze[start[ROW]][start[COL]].walls.indexOf('bot');
      maze[start[ROW]][start[COL]].walls.splice(tempIdx, 1);

      tempIdx = maze[end[ROW]][end[COL]].walls.indexOf('top');
      maze[end[ROW]][end[COL]].walls.splice(tempIdx, 1);

      break;
    // start is below end
    case "-1 0":
      // console.log("2");
      tempIdx = maze[start[ROW]][start[COL]].walls.indexOf('top');
      maze[start[ROW]][start[COL]].walls.splice(tempIdx, 1);

      tempIdx = maze[end[ROW]][end[COL]].walls.indexOf('bot');
      maze[end[ROW]][end[COL]].walls.splice(tempIdx, 1);
      break;
    // start is to the left of end
    case "0 1":
      // console.log("2");
      tempIdx = maze[start[ROW]][start[COL]].walls.indexOf('right');
      maze[start[ROW]][start[COL]].walls.splice(tempIdx, 1);
      // end.style.borderLeft = "0px";
      tempIdx = maze[end[ROW]][end[COL]].walls.indexOf('left');
      maze[end[ROW]][end[COL]].walls.splice(tempIdx, 1);
      break;
    // start is to the right of end
    case "0 -1":
      // console.log("2");
      tempIdx = maze[start[ROW]][start[COL]].walls.indexOf('left');
      maze[start[ROW]][start[COL]].walls.splice(tempIdx, 1);
      // end.style.borderRight = "0px";
      tempIdx = maze[end[ROW]][end[COL]].walls.indexOf('right');
      maze[end[ROW]][end[COL]].walls.splice(tempIdx, 1);
      break;
  }
}
// Returns an array of unvisited neighboring cells
function unvisitedNeighbors(cell, visited){
  var unvisited = [];
  var tempCell;
  var currRow = cell[ROW];
  var currCol = cell[COL];
  // Check cell on top
  if (currRow !== 0){
    if (!visited[currRow - 1][currCol]){
      tempCell = [currRow - 1, currCol];
      unvisited.push(tempCell);
    }
  }
  // Check cell below
  if (currRow !== visited.length - 1){
    if (!visited[currRow + 1][currCol]){
      tempCell = [currRow + 1, currCol];
      unvisited.push(tempCell);
    }
  }
  // Check cell to left
  if (currCol !== 0){
    if (!visited[currRow][currCol - 1]){
      tempCell = [currRow, currCol - 1];
      unvisited.push(tempCell);
    }
  }
  // Check cell to right
  if (currCol !== visited[currRow].length - 1){
    if (!visited[currRow][currCol + 1]){
      tempCell = [currRow, currCol + 1];
      unvisited.push(tempCell);
    }
  }
  return unvisited;
}


//Returns an array containing the cells in sequential order from start to end making up the path through the maze
function mazeSolver(rows = defaultRows, cols = defaultCols){
  var stack = [];
  var visited = makeArray(rows, cols, false);
  stack.push(startCell);
  visited[startCell[ROW]][startCell[COL]] = true;
  return solveHelper(stack, visited, maze);
}

function solveHelper(stack, visited, maze){
  while (stack.length !== 0){
    var curr = stack.pop();
    var validNeighbors = noWallUnvisitedNeighbors(curr, visited);
    // console.log(unvisited);
    if (validNeighbors.length !== 0){
      stack.push(curr);
      //Choose one of valid neighbors
      var next = validNeighbors[getRandomInt(validNeighbors.length)];
      visited[next[ROW]][next[COL]] = true;
      stack.push(next);
      if (next[ROW] === endCell[ROW] && next[COL] === endCell[COL]){
        return stack;
      }
    }
  }
}

function noWallUnvisitedNeighbors(cell, visited){
  var validNeighbors = [];
  var tempCell;
  var currRow = cell[ROW];
  var currCol = cell[COL];
  // Check cell on top
  if (currRow !== 0 && !maze[currRow][currCol].walls.indexOf('top')){
    tempId = "cell_r" + (currRow - 1) + "_c" + currCol;
    // console.log(tempId);
    tempCell = [currRow - 1, currCol];
    // console.log(visited[currRow - 1][currCol]);
    if (!visited[currRow - 1][currCol]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell below
  if (currRow !== visited.length - 1 && !maze[currRow][currCol].walls.indexOf('bot')){
    tempCell = [currRow + 1, currCol];
    if (!visited[currRow + 1][currCol]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell to left
  if (currCol !== 0 && !maze[currRow][currCol].walls.indexOf('left')){
    tempCell = [currRow, currCol - 1];
    if (!visited[currRow][currCol - 1]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell to right
  if (currCol !== visited[currRow].length - 1 && !maze[currRow][currCol].walls.indexOf('right')){
    tempCell = [currRow, currCol + 1];
    if (!visited[currRow][currCol + 1]){
      validNeighbors.push(tempCell);
    }
  }
  return validNeighbors;
}

init();
