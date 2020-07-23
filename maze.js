var avatar = document.getElementById('dot');
var defaultRows = 8;
var defaultCols = 8;
var startCell, endCell;

// Character creation
var character_select = document.getElementById('character-select');
character_select.style.display = "block";
var spann = document.getElementsByClassName("close")[0];
spann.onclick = function() {
    character_select.style.display = "none";
}
var char_desc = document.getElementById("woot");
woot.innerHTML = "Customize your character.";
function select(color) {
    console.log(color);
    avatar.style.background = color;
    character_select.style.display = "none";
}


// Creates an empty grid with start and end cells in HTML file and returns the maze
function makeBlankBacktrackMaze(rows = defaultRows, cols = defaultCols){
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

// Returns a random integer between 0 and the given maximum (noninclusive) parameter
function getRandomInt(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Determines a start and end cell and returns the maze
function makeStartEndCells(rows = defaultRows, cols = defaultCols){
  var maze = document.getElementsByTagName("tbody")[0];
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
  return maze;
}

function init() {
    avatar.style.position='relative';
    avatar.style.left='20px';
    avatar.style.top='0px';
}

function dotheneedful(sibling) {
    if (sibling != null) {
	startCell.focus();
	sibling.focus();
	startCell = sibling;
	//console.log(sibling);
	sibling.style.transition = "all 2s";
	sibling.appendChild(avatar);
	//avatar.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);;
    }
}

function checkEnd(s, e) {
    if (s === e) {
      	var modal = document.getElementById("myModal");
      	var captionText = document.getElementById("caption");
      	modal.style.display = "block";
      	captionText.innerHTML = "Finished!"
      	var span = document.getElementsByClassName("close")[1];
      	span.onclick = function() {
      	    modal.style.display = "none";
      	}
    }
}

function getKeyAndMove(e){
    var key_code = e.which||e.keyCode;
    switch(key_code){
    case 37: //left arrow key
      	if (startCell.style.borderLeft === '') break;
      	var sibling = startCell.previousElementSibling;
      	checkEnd(sibling, endCell);
      	dotheneedful(sibling);
      	e.preventDefault();
      	//moveLeft();
      	break;
          case 38: //Up arrow key
      	e.preventDefault();
      	var idx = startCell.cellIndex;
      	var nextrow = startCell.parentElement.previousElementSibling;
      	console.log(startCell.style.borderBottom);
      	if (startCell.style.borderTop === '') break;
      	if (nextrow != null) {
      	    var sibling = nextrow.cells[idx];
      	    checkEnd(sibling, endCell);
      	    dotheneedful(sibling);
      	}
      	//moveUp();
      	break;
          case 39: //right arrow key
      	e.preventDefault();
      	if (startCell.style.borderRight === '') break;
      	var sibling = startCell.nextElementSibling;
      	checkEnd(sibling, endCell);
      	dotheneedful(sibling);
      	//moveRight();
      	break;
          case 40: //down arrow key
      	if (startCell.style.borderBottom === '') break;
      	var idx = startCell.cellIndex;
      	var nextrow = startCell.parentElement.nextElementSibling;
      	if (nextrow != null) {
      	    var sibling = nextrow.cells[idx];
      	    checkEnd(sibling, endCell);
      	    dotheneedful(sibling);
      	}
      	e.preventDefault();
      	//moveDown();
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
    console.log(this.screen);
    if ($("td").hasClass('b')) return;
    console.log($("td"));
    avatar.style.left=parseInt(avatar.style.left)+10 +'px';
}
function moveDown(){
    avatar.style.top=parseInt(avatar.style.top)+10 +'px';
}

// Given a cell returns an object with the given cell's row and col number
function getCoords(cell){
  var id = cell.id;
  var row = id.slice(cell.id.indexOf("_") + 2, cell.id.lastIndexOf("_"));
  var col = id.slice(cell.id.lastIndexOf("_") + 2, id.length);
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
function mazeGenBacktracking(rows = defaultRows, cols = defaultCols){
  var maze = makeBlankBacktrackMaze(rows, cols);
  var start = document.getElementsByClassName("start")[0];
  var stack = [];
  var visited = makeArray(rows, cols);
  var startCoords = getCoords(start);
  stack.push(start);
  visited[startCoords["row"]][startCoords["col"]] = true;
  backtrackGenHelper(stack, visited, maze);
}

function backtrackGenHelper(stack, visited, maze){
  while (stack.length !== 0){
    var curr = stack.pop();
    var unvisited = unvisitedNeighbors(curr, visited);
    if (unvisited.length !== 0){
      stack.push(curr);
      //Choose one of unvisited neighbors
      var next = unvisited[getRandomInt(unvisited.length)];
      var nextCoords = getCoords(next);
      removeWall(curr, next);
      visited[nextCoords["row"]][nextCoords["col"]] = true;
      stack.push(next);
    }
  }
}

// Returns a rows by cols sized array filled with falses
function makeArray(rows, cols){
  var temp = [];
  for (var r = 0; r < rows; r++){
    temp.push([]);
    for(var c = 0; c < cols; c++){
      temp[r].push(false);
    }
  }
  return temp;
}

// Takes two cells and removes the adjacent wall. Doesn't return anything
function removeWall(start, end){
  var startCoords = getCoords(start);
  var endCoords = getCoords(end);
  var relativePosition = [endCoords["row"] - startCoords["row"], endCoords["col"] - startCoords["col"]];
  switch (relativePosition.join(' ')){
    // start is on top of end
    case "1 0":
      start.style.borderBottom = "0px";
      end.style.borderTop = "0px";
      break;
    // start is below end
    case "-1 0":
      start.style.borderTop = "0px";
      end.style.borderBottom = "0px";
      break;
    // start is to the left of end
    case "0 1":
      start.style.borderRight = "0px";
      end.style.borderLeft = "0px";
      break;
    // start is to the right of end
    case "0 -1":
      start.style.borderLeft = "0px";
      end.style.borderRight = "0px";
      break;
  }
}
// Returns an array of unvisited neighboring cells
function unvisitedNeighbors(cell, visited){
  var unvisited = [];
  var currCoords = getCoords(cell);
  var tempId;
  var tempCell;
  var tempRow = currCoords["row"];
  var tempCol = currCoords["col"];
  // Check cell on top
  if (tempRow !== 0){
    tempId = "cell_r" + (tempRow - 1) + "_c" + tempCol;
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow - 1][tempCol]){
      unvisited.push(tempCell);
    }
  }
  // Check cell below
  if (tempRow !== visited.length - 1){
    tempId = "cell_r" + (tempRow + 1) + "_c" + tempCol;
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow + 1][tempCol]){
      unvisited.push(tempCell);
    }
  }
  // Check cell to left
  if (tempCol !== 0){
    tempId = "cell_r" + tempRow + "_c" + (tempCol - 1);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol - 1]){
      unvisited.push(tempCell);
    }
  }
  // Check cell to right
  if (tempCol !== visited[tempRow].length - 1){
    tempId = "cell_r" + tempRow + "_c" + (tempCol + 1);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol + 1]){
      unvisited.push(tempCell);
    }
  }
  return unvisited;
}

console.log(maze_container.classList);

mazeGenBacktracking();

// Returns an array containing the cells in sequential order from start to end making up the path through the maze
function mazeSolver(rows = defaultRows, cols = defaultCols){
  var start = document.getElementsByClassName("start")[0];
  var stack = [];
  var visited = makeArray(rows, cols);
  var startCoords = getCoords(start);
  stack.push(start);
  visited[startCoords["row"]][startCoords["col"]] = true;
  return solveHelper(stack, visited);
}

function solveHelper(stack, visited){
  while (stack.length !== 0){
    var curr = stack.pop();
    var validNeighbors = noWallUnvisitedNeighbors(curr, visited);
    if (validNeighbors.length !== 0){
      stack.push(curr);
      //Choose one of valid neighbors
      var next = validNeighbors[getRandomInt(validNeighbors.length)];
      var nextCoords = getCoords(next);
      visited[nextCoords["row"]][nextCoords["col"]] = true;
      stack.push(next);
      if (next.classList.contains("end")){
        return stack;
      }
    }
  }
}

function noWallUnvisitedNeighbors(cell, visited){
  var validNeighbors = [];
  var currCoords = getCoords(cell);
  var tempId;
  var tempCell;
  var tempRow = currCoords["row"];
  var tempCol = currCoords["col"];
  // Check cell on top
  if (tempRow !== 0 && cell.style.borderTop === "0px"){
    tempId = "cell_r" + (tempRow - 1) + "_c" + tempCol;
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow - 1][tempCol]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell below
  if (tempRow !== visited.length - 1 && cell.style.borderBottom === "0px"){
    tempId = "cell_r" + (tempRow + 1) + "_c" + tempCol;
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow + 1][tempCol]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell to left
  if (tempCol !== 0 && cell.style.borderLeft === "0px"){
    tempId = "cell_r" + tempRow + "_c" + (tempCol - 1);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol - 1]){
      validNeighbors.push(tempCell);
    }
  }
  // Check cell to right
  if (tempCol !== visited[tempRow].length - 1 && cell.style.borderRight === "0px"){
    tempId = "cell_r" + tempRow + "_c" + (tempCol + 1);
    tempCell = document.getElementById(tempId);
    if (!visited[tempRow][tempCol + 1]){
      validNeighbors.push(tempCell);
    }
  }
  return validNeighbors;
}
console.log(mazeSolver());

window.onload=init;
