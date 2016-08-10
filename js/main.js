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
          player = null;
        }
        pieces.push(new Piece(grid.tiles[c][r], piece.color, player));
      }
    }
  }
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

  createPieces();

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
