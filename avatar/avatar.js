// Character creation
var character_select = document.getElementById('character-select');
character_select.style.display = "block";

/*var spann = document.getElementsByClassName("close")[0];
spann.onclick = function() {
    character_select.style.display = "none";
}*/

/*var char_desc = document.getElementById("woot");
woot.innerHTML = "Customize your character";*/

function select(color) {
    console.log(color);
    avatar.style.background = color;
    character_select.style.display = "none";
}



