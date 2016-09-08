/*
Class: Tile
Properties:
Description:
*/

function Tile(coordinates, width, height, fill) {
  this.coordinates = coordinates;
  this.position = new Point(coordinates.c * width, coordinates.r * height);
  this.width = width;
  this.height = height;
  this.fill = fill || "#E7E7E7";
  this.occupied = false;
  this.valid = false;
  this.highlight = false;
}
Tile.prototype = (function() {
  function draw() {
    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    if (this.highlight && !this.occupied) {
      ctx.fillStyle = "blue";
      ctx.strokeStyle = "white";
      ctx.stroke();
    } else {
      ctx.fillStyle = this.fill;
    }
    ctx.fill();
    ctx.closePath();
  }

  function isPointInside(coordinates) {
    var position = this.position;
    return (coordinates.x >= position.x && coordinates.x <= position.x + this.width && coordinates.y >= position.y && coordinates.y <= position.y + this.height);
  }

  return {
    draw: draw,
    isPointInside: isPointInside
  }
})();

// Tile.prototype.isPointInside = function(coordinates) {
//   return (coordinates.x >= this.x && coordinates.x <= this.x + this.width && coordinates.y >= this.y && coordinates.y <= this.y + this.height);
// }
