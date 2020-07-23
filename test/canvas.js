(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();


window.onload = function init() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    gameLoop();
}

window.addEventListener("keydown", function (e) {
    e.preventDefault();
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function (e) {
    velX = 0;
    velY = 0;
    keys[e.keyCode] = false;
});

var avatarX = 400,
    avatarY = 300,
    velX = 0,
    velY = 0,
    keys = [],
    maxSpeed = 5;

function gameLoop() {
    whatKey();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    avatarX += velX;
    avatarY += velY;

    ctx.fillRect(avatarX, avatarY, 50, 50);
    requestAnimationFrame(gameLoop);
    
}

function whatKey() {
    if (keys[37]) {
	//velX = -3;  left key
	if (avatarX < 0) {
	    velX = 0;
	    velY = 0;
	}
	else if (velX > -maxSpeed) {
	    velX -= 0.2;
	}
    }

    if (keys[39]) {
	//velX = 3;  right key
	if (avatarX > canvas.width - 50) {
	    velX = 0;
	    velY = 0;
	}
	else if (velX < maxSpeed) {
	    velX += 0.2;
	}
    }
    if (keys[40]) {
	//velY = 3;  down key
	if (avatarY > canvas.height - 50) {
	    velX = 0;
	    velY = 0;
	}
	else if (velY < maxSpeed) {
	    velY += 0.2;
	}
    }
    if (keys[38]) {
	//velY = 3;  up key
	if (avatarY < 0) {
	    velX = 0;
	    velY = 0;
	}
	else if (velY > -maxSpeed) {
	    velY -= 0.2;
	}
    }
}
