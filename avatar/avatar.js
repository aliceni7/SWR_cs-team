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
var hair_select = document.getElementById("hair-select");
var hair_back = document.getElementById("hair-back");
var hair_forward = document.getElementById("hair-forward");
var MAX_HAIR = 18;
var MIN_HAIR = 1;
var current_n = 1;
var current_hair = document.getElementById("current-hair");
var color = "black";

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

function selectHair(image) {
    var hair = document.getElementById("hair-a");
    var hair_s = document.getElementById("hair-shading");

    switch(image){

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
var clothes_select = document.getElementById("clothes-select");
var pants_back = document.getElementById("pants-back");
var pants_forward = document.getElementById("pants-forward");
var MAX_PANTS = 4;
var MIN_PANTS = 1;
var MAX_SHIRT = 18;
var MIN_SHIRT = 1;
var current_p = 1;
var current_s = 1;
var current_pants = document.getElementById("current-pants");
var current_shirt = document.getElementById("current-shirt");


function switchPants(p){
    if (current_p == MAX_PANTS){
	if (p === "forward"){
	    current_p = MIN_PANTS;
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
	if (p === "back"){
	    current_p--;
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
    }
    else if (current_p == MIN_PANTS){
	if (p === "forward"){
	    current_p++;
	    current_pants.setAttribute("src", "images/pants/p"+ current_p + ".png");
	    current_pants.setAttribute("onclick", "selectClothes(\"" + "images/pants/p"+ current_p + ".png" + "\")");
	}
	if (p === "back"){
	    current_p = MAX_PANTS;
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
    if (current_s == MAX_SHIRT){
	if (s === "forward"){
	    current_s = MIN_SHIRT;
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
	if (s === "back"){
	    current_s--;
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
    }
    else if (current_s == MIN_SHIRT){
	if (s === "forward"){
	    current_s++;
	    current_shirt.setAttribute("src", "images/shirt/s"+ current_s + ".png");
	    current_shirt.setAttribute("onclick", "selectClothes(\"" + "images/shirt/s"+ current_s + ".png" + "\")");
	}
	if (s === "back"){
	    current_s = MAX_SHIRT;
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
var eyes_back = document.getElementById("eyes-back");
var eyes_forward = document.getElementById("eyes-forward");
var MAX_EYES = 6;
var MIN_EYES = 1;
var current_e = 1;
var current_eyes = document.getElementById("current-eyes");

function switchEyes(e){
    if (current_e == MAX_EYES){
	if (e === "forward"){
	    current_e = MIN_EYES;
	    current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	    current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
	}
	if (e === "back"){
	    current_e--;
	    current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	    current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
	}
    }
    else if (current_e == MIN_EYES){
	if (e === "forward"){
	    current_e++;
	    current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	    current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
	}
	if (e === "back"){
	    current_e = MAX_EYES;
	    current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	    current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
	}
    }
    else if (e === "forward"){
	current_e++;
	current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
    }
    else if (e === "back"){
	current_e--;
	current_eyes.setAttribute("src", "images/eyes/e"+ current_e + ".png");
	current_eyes.setAttribute("onclick", "selectEyes(\"" + "images/eyes/e"+ current_e + ".png" + "\")");
    }
}

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


// Accessories select
var acc_back = document.getElementById("acc-back");
var acc_forward = document.getElementById("acc-forward");
var MAX_ACC = 6;
var MIN_ACC = 1;
var current_a = 1;
var current_acc = document.getElementById("current-acc");

function switchAcc(a){
    if (current_a == MAX_ACC){
	if (a === "forward"){
	    current_a = MIN_ACC;
	    current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	    current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
	}
	if (a === "back"){
	    current_a--;
	    current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	    current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
	}
    }
    else if (current_a == MIN_ACC){
	if (a === "forward"){
	    current_a++;
	    current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	    current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
	}
	if (a === "back"){
	    current_a = MAX_ACC;
	    current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	    current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
	}
    }
    else if (a === "forward"){
	current_a++;
	current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
    }
    else if (a === "back"){
	current_a--;
	current_acc.setAttribute("src", "images/accessories/a"+ current_a + ".png");
	current_acc.setAttribute("onclick", "selectAcc(\"" + "images/accessories/a"+ current_a + ".png" + "\")");
    }
}


function selectAcc(ac) {
    acc = document.getElementById("acc-a");

    switch(ac){

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




