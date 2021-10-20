let drag = false;
let strokeColor = 'black';
let line_width = 2;
let savedImageData;
let canvas;
let dimension;
let canvasWidth = 1350;
let canvasHeight = 530;
var clicks;
var i;

let colorrnd = getRndColor();
console.log(colorrnd);
var rectangle =[];


class ShapeBoundingBox {
  constructor(left, top, width, height) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
}

class MouseDownPos {
  constructor(x, y) {
    this.x = x,
      this.y = y;
  }
}


class Location {
  constructor(x, y) {
    this.x = x,
      this.y = y;
  }
}


let shapeBoundingBox = new ShapeBoundingBox(0, 0, 0, 0);
let mousedown = new MouseDownPos(0, 0);
let loc = new Location(0, 0);

document.addEventListener('DOMContentLoaded', setupCanvas);
document.addEventListener('dblclick', DeleteRect);

function setupCanvas() {
  canvas = document.getElementById('canvas');
  dimension = canvas.getContext('2d');
  dimension.strokeStyle = getRndColor();
  dimension.lineWidth = line_width;

  canvas.addEventListener('mousedown', ReactMouseDown,false);
  canvas.addEventListener('mouseup', ReactMouseUp,false);
  canvas.addEventListener('mousemove', ReactMouseMove,false);
 //canvas.addEventListener('ondblclick', DeleteRect,false);
 
};


function GetMousePosition(x, y) {
  let canvasSizeData = canvas.getBoundingClientRect();
  return {
    x: (x - canvasSizeData.left) * (canvas.width / canvasSizeData.width),
    y: (y - canvasSizeData.top) * (canvas.height / canvasSizeData.height)
  };
}


function SaveCanvasImage() {

  savedImageData = dimension.getImageData(0, 0, canvas.width, canvas.height);
   rectangle.push(savedImageData);
   console.log(rectangle.length);
   console.log('dimension', dimension)
}

function RedrawCanvasImage() {
  dimension.putImageData(savedImageData, 0, 0);
}

function UpdateRubberbandSizeData(loc) {

  shapeBoundingBox.width = Math.abs(loc.x - mousedown.x);
  shapeBoundingBox.height = Math.abs(loc.y - mousedown.y);

  if (loc.x > mousedown.x) {
    shapeBoundingBox.left = mousedown.x;
  }
  else {
    shapeBoundingBox.left = loc.x;
  }


  if (loc.y > mousedown.y) {
    shapeBoundingBox.top = mousedown.y;
  } else {
    shapeBoundingBox.top = loc.y;
  }

}

function UpdateRubberbandOnMove(loc) {
  UpdateRubberbandSizeData(loc);
  drawRubberbandShape(loc);
}

function drawRubberbandShape(loc) {
 for(var i=0;i<rectangle.length;i++){
  dimension.strokeStyle = 'black';
  dimension.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
  dimension.fillStyle = getRndColor();
  dimension.fillRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
  rectangle[i];
console.log(rectangle[i]);

}
}

function DeleteRect(){
console.log('delete', canvas.offsetLeft, canvas.offsetTop, canvas.width, canvas.height)
dimension.clearRect(canvas.left, canvas.top, canvas.width, canvas.height);
}
		


function ReactMouseDown(e) {
  loc = GetMousePosition(e.clientX, e.clientY);
  SaveCanvasImage();
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  drag = true;

}

function ReactMouseMove(e) {
  loc = GetMousePosition(e.clientX, e.clientY);
};

function ReactMouseUp(e) {
  loc = GetMousePosition(e.clientX, e.clientY);
  RedrawCanvasImage();
  UpdateRubberbandOnMove(loc);
  drag = false;


}

function getRndColor() {

    var r = 255 * Math.random() | 0,
    g = 255 * Math.random() | 0,
    b = 255 * Math.random() | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function clear_canvas() {

  dimension.clearRect(0, 0, canvas.width, canvas.height);

}// JavaScript source code