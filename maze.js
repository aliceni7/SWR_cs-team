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
}
makeBlankBacktrackMaze();

function mazeGenRecursiveDivision(rows = 8, cols = 8){
  document.getElementBy
}
window.onload=init;
