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

  function append() {
    document.body.appendChild(this.element);
  }

  return {
    createCanvas: createCanvas,
    append: append
  }
})();

/*
Class: Game
Properties:
Description:
*/

function Game() {
  this.selectedPiece = null;
  this.turn = 1;
  this.init();
}
Game.prototype = (function() {
  function selectPiece(piece) {
    if (piece) {
      piece.selected = true;
    }
    this.selectedPiece = piece;
  }

  function clearSelection() {
    searchPieces(function(piece) {
      piece.selected = false;
    });
  }

  function clearHighlight() {
    searchTiles(function(tile) {
      tile.highlight = false;
    });
  }

  function highlightTile(tile) {
    tile.highlight = true;
  }

  function updateTurn() {
    if (this.turn == 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
    writeTurnData(this.turn);
    writeTurn.call(this);
  }

  function writeTurn() {
    turnRef.on('value', function(snapshot) {
      game.turn = snapshot.val();
      var turnIndicator = document.getElementById("turn");
      turnIndicator.innerHTML = "Player " + snapshot.val();
    });
  }

  function init() {
    writeTurn.call(this);
  }

  return {
    selectPiece: selectPiece,
    highlightTile: highlightTile,
    clearSelection: clearSelection,
    clearHighlight: clearHighlight,
    updateTurn: updateTurn,
    init: init
  }
})();

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
    var tileWidth = window.innerHeight / tileColumnCount;
    var tileHeight = window.innerHeight / tileRowCount;
    for (c = 0; c < this.columns; c++) {
      this.tiles[c] = [];
      for (r = 0; r < this.rows; r++) {
        var tile = new Tile({c: c, r: r}, tileWidth, tileHeight);
        this.tiles[c][r] = tile;
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

/*
Class: Point
Properties:
Description: Defines an X / Y pixel point on the canvas
*/

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype = (function() {

})();

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

var pieceDescriptions = {
  far: {
    name: "farmer",
    color: "green"
  },
  hor: {
    name: "horse",
    color: "tan"
  },
  pig: {
    name: "pig",
    color: "pink"
  },
  cow: {
    name: "cow",
    color: "black"
  },
  chi: {
    name: "chicken",
    color: "white"
  },
  hay: {
    name: "hay",
    color: "yellow"
  }
};
var board = [
  [null, "pig", "chi", "cow", "hay", "hay", "cow", "chi", "pig", null],
  [null, null, null, null, "far", "hor", null, null, null, null],
  [],
  [],
  ["hay", null, null, "hay", "hay", "hay", "hay", null, null, "hay"],
  ["hay", null, null, "hay", "hay", "hay", "hay", null, null, "hay"],
  [],
  [],
  [null, null, null, null, "hor", "far", null, null, null, null],
  [null, "pig", "chi", "cow", "hay", "hay", "cow", "chi", "pig", null]
]

var gameCanvas;
var canvasElement;
var ctx;
var game;
var grid;
var tileColumnCount = tileRowCount = 10;
var pieces = [];

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  grid.draw();

  for (var i = 0; i < pieces.length; i++) {
    pieces[i].draw();
  }

  requestAnimationFrame(draw);
}

function createCanvas() {
  gameCanvas = new Canvas(window.innerHeight, window.innerHeight);
  canvasElement = gameCanvas.element;
  ctx = canvasElement.ctx;
  gameCanvas.append();
}

function createPieces() {
  for (r = 0; r < board.length; r++) {
    for (c = 0; c < tileColumnCount; c++) {
      var currentPiece = board[r][c];
      if (currentPiece != undefined) {
        var piece = pieceDescriptions[currentPiece];
        var player;
        if (r <= 1 && currentPiece != "hay") {
          player = 1;
        } else if (r >= 8 && currentPiece != "hay") {
          player = 2;
        } else {
          player = "none";
        }
        pieces.push(new Piece(grid.tiles[c][r], piece.color, player));
      }
    }
  }
  writePieces(pieces);
}

function findClickCoordinates(e) {
  var offset = canvasElement.offsetLeft;
  var coordinates = new Point(e.x - offset, e.y);
  return coordinates
}

function searchPieces(callback) {
  pieces.forEach(callback);
}

function searchTiles(callback) {
  for (var c = 0; c < grid.columns; c++) {
    for (var r = 0; r < grid.rows; r++) {
      callback(grid.tiles[c][r]);
    }
  }
}

function findPieceByCoordinates(coordinates) {
  var foundPiece;
  searchPieces(function(piece) {
    if (piece.isPointInside(coordinates)) {
      foundPiece = piece;
      return;
    }
  });
  return foundPiece;
}

function findTileByCoordinates(coordinates) {
  var foundTile;
  searchTiles(function(tile) {
    if (tile.isPointInside(coordinates)) {
      foundTile = tile;
      return;
    }
  });
  return foundTile;
}

function clickHandler(e) {
  var coordinates = findClickCoordinates(e);

  game.clearSelection();

  var piece = findPieceByCoordinates(coordinates);
  var tile = findTileByCoordinates(coordinates);
  if (game.selectedPiece && !tile.occupied) {
    game.selectedPiece.move(tile);
    game.selectPiece(null);
    game.updateTurn();
  }
  if (piece && piece.player == game.turn) {
    game.selectPiece(piece);
  }
}

function moveHandler(e) {
  game.clearHighlight();

  var coordinates = findClickCoordinates(e);

  if (game.selectedPiece) {
    canvasElement.style.cursor = "pointer";
    var tile = findTileByCoordinates(coordinates);
    game.highlightTile(tile);
  } else {
    canvasElement.style.cursor = "default";
    var piece = findPieceByCoordinates(coordinates);
    if (piece && piece.player == game.turn) {
      canvasElement.style.cursor = "pointer";
    }
  }
}

window.onload = function() {
  createCanvas();

  game = new Game();
  grid = new Grid(tileRowCount, tileColumnCount);

  // createPieces();

  // TODO: Make the pieces track their position by row and column rather than tile data.
  // Is the tile updating as occupied or not accurately?

  piecesRef.on('value', function(snapshot) {
    pieces = snapshot.val();
    pieces.forEach(function(piece, index) {
      var newPiece = new Piece(grid.tiles[piece.tile.coordinates.c][piece.tile.coordinates.r], piece.fill, piece.player || "none");
      pieces[index] = newPiece;
    });
  });

  canvasElement.addEventListener("mousemove", moveHandler);
  canvasElement.addEventListener("click", clickHandler);

  draw();
}

// /*
//  * Accept
//  */
//
// canvas.addEventListener("click", clickHandler, false);
//
// /*
//  * Interpret & Calculate
//  */
//
// function findClickCoordinates(event) {
//   var mouseX = parseInt(event.clientX - canvas.offsetLeft);
//   var mouseY = parseInt(event.clientY - canvas.offsetTop);
//   return {x: mouseX, y: mouseY};
// }
//
// function findClickedTile(coordinates) {
//   for (var c = 0; c < tileColumnCount; c++) {
//     for (var r = 0; r < tileColumnCount; r++) {
//       var tile = tiles[c][r];
//       if (tile.isPointInside(coordinates)) {
//         return tile;
//       }
//     }
//   }
// }
//
// function findClickedPiece(coordinates) {
//   for(var i = 0; i < pieces.length; i++) {
//     var piece = pieces[i];
//     if (piece.isPointInside(coordinates)) {
//       return piece;
//     }
//   }
// }
//
// function selectPiece(piece) {
//   selectedPiece = piece;
//   selectedPiece.selected = true;
//   selectedPiece.findValidMoves();
// }
//
// function clearSelection() {
//   selectedPiece.selected = false;
//   clearValidMoves(selectedPiece);
//   selectedPiece = null;
// }
//
// function clearValidMoves(piece) {
//   for (var i = 0; i < piece.validMoves.length; i++) {
//     piece.validMoves[i].valid = false;
//   }
// }
//
// function clickHandler(e) {
//   var mouseCoordinates = findClickCoordinates(e);
//
//   var tile = findClickedTile(mouseCoordinates);
//   var piece = findClickedPiece(mouseCoordinates);
//
//   if (selectedPiece && tile.valid) {
//     selectedPiece.move(tile);
//   }
//
//   if (piece) {
//     if (selectedPiece) {
//       clearSelection();
//     } else {
//       selectPiece(piece);
//     }
//   }
//
//   draw();
// }
//
// draw();

function getDevicePixelRatio() {
  var ctx = document.createElement("canvas").getContext("2d");
  var dpr = window.devicePixelRatio || 1;
  var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
}

//# sourceMappingURL=main.js.map