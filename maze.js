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
window.onload=init;

