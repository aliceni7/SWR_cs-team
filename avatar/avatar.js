// Character creation
var character_select = document.getElementById('character-select');
character_select.style.display = "block";

/*var spann = document.getElementsByClassName("close")[0];
spann.onclick = function() {
    character_select.style.display = "none";
}*/

/*var char_desc = document.getElementById("woot");
woot.innerHTML = "Customize your character";*/


// Skin tone select
var skin_select = document.getElementById("skin");

var isFirst = true;
function select(color) {
    console.log(color);
    if (isFirst) {
	skin_tone = document.getElementById(color);
	skin_tone.style.border = "1px solid  #f94e30 ";
	isFirst = false;
    } else {
	skin_tone.style.border = "0px";
	skin_tone = document.getElementById(color);
	skin_tone.style.border = "1px solid  #f94e30 ";
    }
    //avatar.style.background = color;
    //character_select.style.display = "none";
}
