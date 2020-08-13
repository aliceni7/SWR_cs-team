var c=document.getElementById("merge");
var ctx=c.getContext("2d");
var imageObj1 = new Image();
var imageObj2 = new Image();
var imageObj3 = new Image();
imageObj1.src = "b1.png"
imageObj1.onload = function() {
    ctx.drawImage(imageObj1, 0, 0, 100, 90);
    imageObj2.src = "h3blond.png";
    imageObj2.onload = function() {
	ctx.drawImage(imageObj2, 0, 0, 100, 90);
    }
    imageObj3.src = "p3.png";
    imageObj3.onload = function() {
	ctx.drawImage(imageObj3, 0, 0, 100, 90);
	var img = c.toDataURL("image/png");
	document.write('<img src="' + img + '" style="image-rendering:auto; image-rendering:crisp-edges; image-rendering:pixelated;" />');
    }
};
