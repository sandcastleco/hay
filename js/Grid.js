/*
Class: Grid
Properties:
Description:
*/

function Grid(rows, columns) {
  this.rows = rows;
  this.columns = columns;
  this.tiles = [];
  this.init();
}
Grid.prototype = (function() {
  function draw() {
    for(c = 0; c < this.columns; c++) {
      for (r = 0; r < this.rows; r++) {
        var tile = this.tiles[c][r];
        if (c%2 == r%2) {
          tile.fill = "#E7E7E7";
        } else {
          tile.fill = "#FFF";
        }
        tile.draw();
      }
    }
  }

  function init() {
    for (c = 0; c < this.columns; c++) {
      this.tiles[c] = [];
      for (r = 0; r < this.rows; r++) {
        this.tiles[c][r] = new Tile(c, r);
      }
    }
  }

  return {
    init: init,
    draw: draw
  }
})();

// Tile.prototype.isPointInside = function(coordinates) {
//   return (coordinates.x >= this.x && coordinates.x <= this.x + this.width && coordinates.y >= this.y && coordinates.y <= this.y + this.height);
// }
