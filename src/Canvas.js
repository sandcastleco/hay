/*
Class: Canvas
Properties: width (number), height (number)
Description: Creates a full screen HTML5 canvas that adjusts to the pixel ratio of the current device's screen
*/

function Canvas(width, height) {
  this.pixelRatio = getDevicePixelRatio();
  this.width = width * this.pixelRatio;
  this.height = height * this.pixelRatio;
  this.element = this.createCanvas();
}

Canvas.prototype = (function() {

  function createCanvas() {
    var canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.width = this.width / this.pixelRatio + "px";
    canvas.style.height = this.height / this.pixelRatio + "px";
    canvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    canvas.ctx = canvas.getContext("2d");
    return canvas;
  }

  function draw() {
    document.body.appendChild(this.element);
  }

  return {
    createCanvas: createCanvas,
    draw: draw
  }
})();
