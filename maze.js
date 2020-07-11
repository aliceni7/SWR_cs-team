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
    "row": row,
    "col": col
  }
}
/* Pseudocode
    Choose the initial cell, mark it as visited and push it to the stack
      While the stack is not empty
        Pop a cell from the stack and make it a current cell
        If the current cell has any neighbours which have not been visited
          Push the current cell to the stack
          Choose one of the unvisited neighbours
          Remove the wall between the current cell and the chosen cell
          Mark the chosen cell as visited and push it to the stack
*/
function mazeGenBacktracking(rows = 8, cols = 8){
  var maze = makeBlankBacktrackMaze(rows, cols);
  var start = document.getElementsByClassName("start")[0];
  console.log(getCoords(start));
  var stack = [];
  stack.push(start);
  console.log(stack);
}
function backtrackHelper(cell){

}
mazeGenBacktracking();
function mazeGenRecursiveDivision(rows = 8, cols = 8){

}
window.onload=init;
