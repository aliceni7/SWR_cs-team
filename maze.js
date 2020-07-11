//init object globally
var avatar= null;
function init(){
    avatar=document.getElementById("dot");
    avatar.style.position='relative';
    avatar.style.left='0px';
    avatar.style.top='0px';
}
function getKeyAndMove(e){
    var key_code=e.which||e.keyCode;
    switch(key_code){
    case 37: //left arrow key
	e.preventDefault();
	moveLeft();
	break;
    case 38: //Up arrow key
	e.preventDefault();
	moveUp();
	break;
    case 39: //right arrow key
	e.preventDefault();
	console.log(avatar.style['left']);
	/*if (avatar.style['left'] === '50px') {
	    moveUp();
	} else {
	    moveRight();
	    }*/
	moveRight();
	break;
    case 40: //down arrow key
	e.preventDefault();
	moveDown();
	break;
    }
}
function moveLeft(){
    avatar.style.left=parseInt(avatar.style.left)-10 +'px';
}
function moveUp(){
    avatar.style.top=parseInt(avatar.style.top)-10 +'px';
}
function moveRight(){
    avatar.style.left=parseInt(avatar.style.left)+10 +'px';
}
function moveDown(){
    avatar.style.top=parseInt(avatar.style.top)+10 +'px';
}

// Creates an empty grid with start and end cells in HTML file and returns the maze
function makeBlankBacktrackMaze(rows = 8, cols = 8){
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var tablerow;
    var tabledata;
    for (var r = 0; r < rows; r++){
        tablerow = document.createElement("tr");
        for (var c = 0; c < cols; c++){
          tabledata = document.createElement("td");
          tabledata.id = "cell_r" + r + "_c" + c;
          if (r === 0){
            tabledata.classList.add("topborder");
          }
          if (c === 0){
            tabledata.classList.add("leftborder");
          }
          if (r === rows - 1){
            tabledata.classList.add("botborder");
          }
          if (c === cols - 1){
            tabledata.classList.add("rightborder");
          }
          tablerow.appendChild(tabledata);
        }
        tbody.appendChild(tablerow);
    }
    table.appendChild(tbody);
    document.getElementById("maze_container").appendChild(table);
    return makeStartEndCells(rows, cols);
}

// returns a random integer between 0 and the given maximum (noninclusive) parameter
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Determines a start and end cell and returns the maze
function makeStartEndCells(rows = 8, cols = 8){
  var maze = document.getElementsByTagName("tbody")[0];
  var startCell, endCell;
  // console.log(maze);
  // determine start and end of maze
  var mazeOrient = getRandomInt(4);
  switch(mazeOrient){
    case 0:
      var leftBorder = maze.getElementsByClassName("leftborder");
      startCell = leftBorder[getRandomInt(rows)];
      startCell.style.borderLeft = "0px";
      var rightBorder = maze.getElementsByClassName("rightborder");
      endCell = rightBorder[getRandomInt(rows)];
      endCell.style.borderRight = "0px";
      break;
    case 1:
      var rightBorder = maze.getElementsByClassName("rightborder");
      startCell = rightBorder[getRandomInt(rows)];
      startCell.style.borderRight = "0px";
      var leftBorder = maze.getElementsByClassName("leftborder");
      endCell = leftBorder[getRandomInt(rows)];
      endCell.style.borderLeft = "0px";
      break;
    case 2:
      var topBorder = maze.getElementsByClassName("topborder");
      startCell = topBorder[getRandomInt(cols)];
      startCell.style.borderTop = "0px";
      var botBorder = maze.getElementsByClassName("botborder");
      endCell = botBorder[getRandomInt(cols)];
      endCell.style.borderBottom = "0px";
      break;
    default:
      var botBorder = maze.getElementsByClassName("botborder");
      startCell = botBorder[getRandomInt(cols)];
      startCell.style.borderBottom = "0px";
      var topBorder = maze.getElementsByClassName("topborder");
      endCell = topBorder[getRandomInt(cols)];
      endCell.style.borderTop = "0px";
      break;
  }
  startCell.classList.add("start");
  endCell.classList.add("end");
  // console.log(maze);
  return maze;
}

// Given a cell returns an object with the given cell's row and col number
function getCoords(cell){
  var id = cell.id;
  var row = id.slice(cell.id.indexOf("_") + 2, cell.id.lastIndexOf("_"));
  // console.log(row);
  var col = id.slice(cell.id.lastIndexOf("_") + 2, id.length);
  // console.log(col);
  return {
    "row": parseInt(row),
    "col": parseInt(col)
  }
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
function mazeGenBacktracking(rows = 8, cols = 8){
  var maze = makeBlankBacktrackMaze(rows, cols);
  var start = document.getElementsByClassName("start")[0];
  var stack = [];
  var visited = makeVisitedArray(rows, cols);
  // console.log(visited);
  var startCoords = getCoords(start);
  stack.push(start);
  visited[startCoords["row"]][startCoords["col"]] = true;
  backtrackHelper(start, stack, visited, maze);
}

function backtrackHelper(cell, stack, visited, maze){
  while (stack.length !== 0){
    var curr = stack.pop();
    var unvisited = hasUnvisitedNeighbors(curr, visited);
    // console.log(unvisited);
    if (unvisited.length !== 0){
      stack.push(curr);
      //Choose one of unvisited neighbors
      var next = unvisited[getRandomInt(unvisited.length)];
      var nextCoords = getCoords(next);
      // console.log(next);
      removeWall(curr, next);
      visited[nextCoords["row"]][nextCoords["col"]] = true;
      stack.push(next);
    }
  }
}

// Returns a rows by cols sized array filled with falses
function makeVisitedArray(rows, cols){
  var temp = [];
  for (var r = 0; r < rows; r++){
    temp.push([]);
    for(var c = 0; c < cols; c++){
      temp[r].push(false);
    }
  }
  // console.log(temp);
  return temp;
}

// Takes two cells and removes the adjacent wall. Doesn't return anything
function removeWall(start, end){
  var startCoords = getCoords(start);
  var endCoords = getCoords(end);
  var relativePosition = [endCoords["row"] - startCoords["row"], endCoords["col"] - startCoords["col"]];
  console.log("relative position: '"+ relativePosition + "'");
  console.log(typeof relativePosition);
  switch (relativePosition.join(' ')){
    // start is on top of end
    case "1 0":
      // console.log("1");
      start.style.borderBottom = "0px";
      end.style.borderTop = "0px";
      break;
    // start is below end
    case "-1 0":
      // console.log("2");
      start.style.borderTop = "0px";
      end.style.borderBottom = "0px";
      break;
    // start is to the left of end
    case "0 1":
      // console.log("2");
      start.style.borderRight = "0px";
      end.style.borderLeft = "0px";
      break;
    // start is to the right of end
    case "0 -1":
      // console.log("2");
      start.style.borderLeft = "0px";
      end.style.borderRight = "0px";
      break;
  }
}
// Returns an array of unvisited neighboring cells
function hasUnvisitedNeighbors(cell, visited){
  var unvisited = [];
  var currCoords = getCoords(cell);
  var tempId;
  var tempCell;
  var tempRow = currCoords["row"];
  var tempCol = currCoords["col"];
  // Check cell on top
  /*
  console.log(typeof currCoords["row"]);
  console.log(currCoords["row"]);
  console.log(typeof tempRow);
  console.log(tempRow);
  */
  if (tempRow !== 0){
    tempId = "cell_r" + (tempRow - 1) + "_c" + tempCol;
    console.log(tempId);
    tempCell = document.getElementById(tempId);
    // console.log(visited[tempRow - 1][tempCol]);
    if (!visited[tempRow - 1][tempCol]){
      unvisited.push(tempCell);
    }
  }
  // Check cell below
  if (tempRow !== visited.length - 1){
    tempId = "cell_r" + (tempRow + 1) + "_c" + tempCol;
    console.log(tempId);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow + 1][tempCol]){
      unvisited.push(tempCell);
    }
  }
  // Check cell to left
  if (tempCol !== 0){
    tempId = "cell_r" + tempRow + "_c" + (tempCol - 1);
    console.log(tempId);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol - 1]){
      unvisited.push(tempCell);
    }
  }
  // Check cell to right
  if (tempCol !== visited[tempRow].length - 1){
    tempId = "cell_r" + tempRow + "_c" + (tempCol + 1);
    console.log(tempId);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol + 1]){
      unvisited.push(tempCell);
    }
  }
  return unvisited;
}

mazeGenBacktracking();

function mazeGenRecursiveDivision(rows = 8, cols = 8){

}
window.onload=init;
