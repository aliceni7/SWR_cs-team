var dragItem = document.getElementById('dragElement');
var dropLoc = document.getElementById('jigsaw_container');

// this event will be fired when the user starts dragging
dragItem.ondragstart = function (event) {
  event.dataTransfer.setData('key', event.target.id);
  console.log('Dragging');
};

// this event will be fired when an element selection is being dragged over to a valid drop location
dropLoc.ondragover = function (event) {
  event.preventDefault();
  console.log('Drag over');
};

// this event will be fired when you drop the dragged item on a valid drop location
dropLoc.ondrop = function (event) {
  var dropItem = event.dataTransfer.getData('key');
  event.preventDefault();
  console.log(event);
  console.log('Dropped');
  console.log(dropItem);
  var myElement = document.getElementById(dropItem);
  console.log(myElement);
  var myNewElement = document.createElement('img');
  myNewElement.src = myElement.src;
  dropLoc.appendChild(myNewElement);
};
