/*
Class: Piece
Properties:
Description:
*/

function Piece(tile, fill, player, stroke) {
  this.tile = tile;
  this.position = new Point(tile.position.x + tile.width / 2, tile.position.y + tile.width / 2);
  this.width = tile.width / 3;
  this.fill = fill || "#000";
  this.stroke = stroke || "#7E7E7E";
  this.selected = false;
  this.player = player;
}
Piece.prototype = (function() {

  function draw() {
    this.tile.occupied = true;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.width, 0, Math.PI*2);
    if (this.selected) {
      ctx.fillStyle = "blue";
    } else {
      ctx.fillStyle = this.fill;
    }
    ctx.strokeStyle = this.stroke;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  function isPointInside(coordinates) {
    var position = this.tile.position;
    return (coordinates.x >= position.x && coordinates.x <= position.x + this.tile.width && coordinates.y >= position.y && coordinates.y <= position.y + this.tile.height);
  }

  function setPosition(tile) {
    return new Point(tile.position.x + tile.width / 2, tile.position.y + tile.width / 2)
  }

  function move(tile) {
    this.tile.occupied = false;
    this.tile = tile;
    this.position = setPosition(tile);
    writePieces(pieces);
  }

  return {
    draw: draw,
    move: move,
    isPointInside: isPointInside
  }
})();

// /*
//  * Piece prototype
//  */
//
// function Piece(id, tileX, tileY, fill, stroke, width, height) {
//   this.id = id;
//   this.tile = tiles[tileX][tileY];
//   this.x = this.tile.x + this.tile.width / 2;
//   this.y = this.tile.y + this.tile.height / 2;
//   this.fill = fill || "#000";
//   this.stroke = stroke || "#7E7E7E";
//   this.width = width || pieceWidth;
//   this.height = height || pieceWidth;
//   this.selected = false;
//   this.validMoves = [];
// }
// Piece.prototype.move = function(tile) {
//   this.tile.occupied = false;
//   this.tile = tile;
//   this.x = this.tile.x + this.tile.width / 2;
//   this.y = this.tile.y + this.tile.height / 2;
//   this.selected = false;
//   for (var i = 0; i < this.validMoves.length; i++) {
//     this.validMoves[i].valid = false;
//   }
// }
// Piece.prototype.isPointInside = function(coordinates) {
//   return (coordinates.x >= this.tile.x && coordinates.x <= this.tile.x + this.tile.width && coordinates.y >= this.tile.y && coordinates.y <= this.tile.y + this.tile.height);
// }
// Piece.prototype.findValidMoves = function() {
//   if (this.id == "pig" || this.id == "farmer" || this.id == "horse") {
//     var column = this.tile.column;
//     var row = this.tile.row;
//     var moveGrid = [[column, row - 1], [column + 1, row - 1], [column + 1, row], [column + 1, row + 1], [column, row + 1], [column - 1, row + 1], [column - 1, row], [column - 1, row - 1]];
//     for (var i = 0; i < moveGrid.length; i++) {
//       for (var c = 0; c < tileColumnCount; c++) {
//         for (r = 0; r < tileRowCount; r++) {
//           var tile = tiles[c][r];
//           if (tile.column == moveGrid[i][0] && tile.row == moveGrid[i][1] && tile.occupied == false) {
//             tile.valid = true;
//             this.validMoves.push(tile);
//           }
//         }
//       }
//     }
//   } else if (this.id == "chicken") {
//     var column = this.tile.column;
//     var row = this.tile.row;
//     var moveGrid = [[column, row - 2], [column + 2, row - 2], [column + 2, row], [column + 2, row + 2], [column, row + 2], [column - 2, row + 2], [column - 2, row], [column - 2, row - 2]];
//     for (var i = 0; i < moveGrid.length; i++) {
//       for (var c = 0; c < tileColumnCount; c++) {
//         for (r = 0; r < tileRowCount; r++) {
//           var tile = tiles[c][r];
//           if (tile.column == moveGrid[i][0] && tile.row == moveGrid[i][1] && tile.occupied == false) {
//             tile.valid = true;
//             this.validMoves.push(tile);
//           }
//         }
//       }
//     }
//   } else if (this.id == "cow") {
//     var column = this.tile.column;
//     var row = this.tile.row;
//     console.log(column, row);
//     for (var r = row-1; r >= 0; r--) {
//       var tile = tiles[column][r];
//       var previousTile = tiles[column][r+1];
//       if (tile.occupied) {
//         if (!previousTile.occupied) {
//           previousTile.valid = true;
//           this.validMoves.push(previousTile);
//         }
//         break;
//       }
//     }
//     for (var r = row+1; r < tileRowCount; r++) {
//       var tile = tiles[column][r];
//       var previousTile = tiles[column][r-1];
//       if (tile.occupied) {
//         if (!previousTile.occupied) {
//           previousTile.valid = true;
//           this.validMoves.push(previousTile);
//         }
//         break;
//       }
//     }
//     for (var c = column-1; c >= 0; c--) {
//       var tile = tiles[c][row];
//       console.log(tile);
//       var previousTile = tiles[c+1][row];
//       if (tile.occupied) {
//         if (!previousTile.occupied) {
//           previousTile.valid = true;
//           this.validMoves.push(previousTile);
//         }
//         break;
//       }
//       if (tile.column == 0) {
//         tile.valid = true;
//         this.validMoves.push(tile);
//       }
//     }
//     for (var c = column+1; c < tileColumnCount; c++) {
//       var tile = tiles[c][row];
//       var previousTile = tiles[c-1][row];
//       if (tile.occupied == true) {
//         if(!previousTile.occupied) {
//           previousTile.valid = true;
//           this.validMoves.push(previousTile);
//         }
//         break;
//       }
//       if (tile.column == tileColumnCount-1) {
//         tile.valid = true;
//         this.validMoves.push(tile);
//       }
//     }
//   }
// }
