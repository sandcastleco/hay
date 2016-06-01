/*
Class: Tile
Properties:
Description:
*/

function Tile(x, y, width, height, fill) {
  this.column = x;
  this.row = y;
  this.coordinates = [this.column, this.row];
  this.x = x * tileWidth;
  this.y = y * tileHeight;
  this.fill = fill || "#E7E7E7";
  this.width = width || tileWidth;
  this.height = height || tileHeight;
  this.occupied = false;
  this.valid = false;
}
Tile.prototype = (function() {
  function draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    if (this.valid) {
      ctx.fillStyle = "blue";
      ctx.strokeStyle = "white";
      ctx.stroke();
    } else {
      ctx.fillStyle = this.fill;
    }
    ctx.fill();
    ctx.closePath();
  }

  return {
    draw: draw
  }
})();

// Tile.prototype.draw = function() {
//
// }
// Tile.prototype.isPointInside = function(coordinates) {
//   return (coordinates.x >= this.x && coordinates.x <= this.x + this.width && coordinates.y >= this.y && coordinates.y <= this.y + this.height);
// }
