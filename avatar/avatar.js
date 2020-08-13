//import mergeImages from 'merge-images';
//const mergeImages = require('merge-images');

// Character creation
var character_select = document.getElementById('character-select');
character_select.style.display = "block";

/*var spann = document.getElementsByClassName("close")[0];
  spann.onclick = function() {
  character_select.style.display = "none";
  }*/


// Skin tone select
var skin_select = document.getElementById("skin");

var isFirst = true;
function select(color) {
    console.log(color);
    body = document.getElementById("skin-a");
    function switchSkin(c) {
	switch(c){
	    
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

	case "#5f3310":
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
var hair_select = document.getElementById("hair-select");
var hair_back = document.getElementById("hair-back");
var hair_forward = document.getElementById("hair-forward");
var MAX_HAIR = 18;
var MIN_HAIR = 1;
var current_n = 1; //change to 0 when add bald
var current_hair = document.getElementById("current-hair");
var color = "";

function switchHair(n){
    if (current_n == MAX_HAIR){
	if (n === "forward"){
	    current_n = MIN_HAIR;
	    route = "images/hair/h" + current_n + color + ".png";
	    current_hair.setAttribute("src", route);
	    current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
	if (n === "back"){
	    current_n--;
	    route = "images/hair/h" + current_n + color + ".png";
	    current_hair.setAttribute("src", route);
	    current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
    }
    else if (current_n == MIN_HAIR){
	if (n === "forward"){
	    current_n++;
	    route = "images/hair/h" + current_n + color + ".png";
	    current_hair.setAttribute("src", route);
	    current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
	if (n === "back"){
	    current_n = MAX_HAIR;
	    route = "images/hair/h" + current_n + color + ".png";
	    current_hair.setAttribute("src", route);
	    current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
	}
    }
    else if (n === "forward"){
	current_n++;
	route = "images/hair/h" + current_n + color + ".png";
	current_hair.setAttribute("src", route);
	current_hair.setAttribute("onclick", "selectHair(\"" + route + "\")");
    }
    else if (n === "back"){
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


// old interface
function switchImage(c) {	
    for(i = 0; i < 5; i++) {
	ii = i+1;
	route = "images/hair/h" + ii + c + ".png";
	hair_pics[i].setAttribute("src", route);
	hair_pics[i].setAttribute("onclick",  "selectHair(\"" + route + "\")");
	console.log(hair_pics[i]);
    }
}

function switchColor2(color) {
    hair_pics = document.getElementsByClassName("hair-pic");
    
    switch(color){

    case "black":
        switchImage("black");
	break;

    case "blond":
	switchImage("blond");
	break;

    case "brown":
	switchImage("brown");
	break;
    }
}

function selectHair(image) {
    var hair = document.getElementById("hair-a");
    //console.log(hair);
    switch(image){


    case "images/hair/h1.png":
	hair.setAttribute("src", "images/hair/h1.png");
	break;

    case "images/hair/h2.png":
	hair.setAttribute("src", "images/hair/h2.png");
	break;

    case "images/hair/h3.png":
	hair.setAttribute("src", "images/hair/h3.png");
	break;

    case "images/hair/h4.png":
	hair.setAttribute("src", "images/hair/h4.png");
	break;

    case "images/hair/h5.png":
	hair.setAttribute("src", "images/hair/h5.png");
	break;

    case "images/hair/h6.png":
	hair.setAttribute("src", "images/hair/h6.png");
	break;

    case "images/hair/h7.png":
	hair.setAttribute("src", "images/hair/h7.png");
	break;
    case "images/hair/h8.png":
	hair.setAttribute("src", "images/hair/h8.png");
	break;

    case "images/hair/h9.png":
	hair.setAttribute("src", "images/hair/h9.png");
	break;

    case "images/hair/h10.png":
	hair.setAttribute("src", "images/hair/h10.png");
	break;

    case "images/hair/h11.png":
	hair.setAttribute("src", "images/hair/h11.png");
	break;

    case "images/hair/h12.png":
	hair.setAttribute("src", "images/hair/h12.png");
	break;

    case "images/hair/h13.png":
	hair.setAttribute("src", "images/hair/h13.png");
	break;

    case "images/hair/h14.png":
	hair.setAttribute("src", "images/hair/h14.png");
	break;

    case "images/hair/h15.png":
	hair.setAttribute("src", "images/hair/h15.png");
	break;

    case "images/hair/h16.png":
	hair.setAttribute("src", "images/hair/h16.png");
	break;

    case "images/hair/h17.png":
	hair.setAttribute("src", "images/hair/h17.png");
	break;

    case "images/hair/h18.png":
	hair.setAttribute("src", "images/hair/h18b.png");
	break;
	
    case "images/hair/h1black.png":
	console.log(hair);
	hair.setAttribute("src", "images/hair/h1black.png");
	break;
	
    case "images/hair/h2black.png":
	console.log(hair);
	hair.setAttribute("src", "images/hair/h2black.png");
	break;

    case "images/hair/h3black.png":
	//console.log(hair.getAttribute("src"));
	hair.setAttribute("src", "images/hair/h3black.png");
	break;
	
    case "images/hair/h4black.png":
	//console.log(hair.getAttribute("src"));
	hair.setAttribute("src", "images/hair/h4black.png");
	break;

    case "images/hair/h5black.png":
	//console.log(hair.getAttribute("src"));
	hair.setAttribute("src", "images/hair/h5black.png");
	break;

    case "images/hair/h1blond.png": 
	hair.setAttribute("src", "images/hair/h1blond.png");
	break;
	
    case "images/hair/h2blond.png":
	hair.setAttribute("src", "images/hair/h2blond.png");
	break;

    case "images/hair/h3blond.png": 
	hair.setAttribute("src", "images/hair/h3blond.png");
	break;
	
    case "images/hair/h4blond.png":
	hair.setAttribute("src", "images/hair/h4blond.png");
	break;

    case "images/hair/h5blond.png":
	hair.setAttribute("src", "images/hair/h5blond.png");
	break;

    case "images/hair/h1brown.png": 
	hair.setAttribute("src", "images/hair/h1brown.png");
	break;
	
    case "images/hair/h2brown.png":
	hair.setAttribute("src", "images/hair/h2brown.png");
	break;

    case "images/hair/h3brown.png": 
	hair.setAttribute("src", "images/hair/h3brown.png");
	break;
	
    case "images/hair/h4brown.png":
	hair.setAttribute("src", "images/hair/h4brown.png");
	break;

    case "images/hair/h5brown.png":
	hair.setAttribute("src", "images/hair/h5brown.png");
	break;
    }
}


// Clothes Select
var clothes_select = document.getElementById("clothes-select");
var pants_back = document.getElementById("pants-back");
var pants_forward = document.getElementById("pants-forward");
var current_p = 1;
var current_s = 1;
var current_pants = document.getElementById("current-pants");
var current_shirt = document.getElementById("current-shirt");


function switchPants(p){
    if (current_p == 4){
	if (p === "forward"){
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
	if (p === "back"){
	    current_p--;
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
    }
    else if (current_p == 1){
	if (p === "forward"){
	    current_p++;
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
	if (p === "back"){
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
    }
    else if (p === "forward"){
	current_p++;
	current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
    }
    else if (p === "back"){
	current_p--;
	current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
    }
}

function switchShirt(s){
    if (current_s == 4){
	if (s === "forward"){
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
	if (s === "back"){
	    current_s--;
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
    }
    else if (current_s == 1){
	if (s === "forward"){
	    current_s++;
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
	if (s === "back"){
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
    }
    else if (s === "forward"){
	current_s++;
	current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
    }
    else if (s === "back"){
	current_s--;
	current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
    }
}



function selectClothes(clothes) {
    pants = document.getElementById("pants-a");
    shirt = document.getElementById("shirt-a");
    
    switch(clothes){
	
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

function selectEyes(ey) {
    eye = document.getElementById("eyes-a");

    switch(ey){

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

var c = document.getElementById("merge");
var ctx=c.getContext("2d");
var imageObj1 = new Image();
var imageObj2 = new Image();
imageObj1.src = "images/arrowleft.png"
ctx.drawImage(imageObj1, 0, 0, 328, 526);
imageObj2.src = "images/arrowright.png";
ctx.drawImage(imageObj2, 0, 0, 328, 526);
var img = c.toDataURL("image/png");
//console.log(img);
//document.write('<img src="' + img + '" width="328" height="526" id="help"/>');
document.getElementById("test").setAttribute("src", img);



console.log(document.getElementById("help"));

//console.log(mergeImages(['/body.png', '/eyes.png', '/mouth.png'])
//	    .then(b64 => document.querySelector('img').src = b64));
