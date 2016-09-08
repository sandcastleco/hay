var canvasElement;
var ctx;
var tileColumnCount = tileRowCount = 10;
var resetButton;

function draw() {
  // maybe a better way to do this?
  game.draw();
  requestAnimationFrame(draw);
}

// Move these into a canvas library for finding elements? Or into the canvas module?
function findClickCoordinates(e) {
  var offset = canvasElement.offsetLeft;
  var coordinates = new Point(e.x - offset, e.y);
  return coordinates
}

function searchPieces(callback) {
  game.pieces.forEach(callback);
}

function searchTiles(callback) {
  for (var c = 0; c < game.grid.columns; c++) {
    for (var r = 0; r < game.grid.rows; r++) {
      callback(game.grid.tiles[c][r]);
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

  game.state.clearSelection();

  var piece = findPieceByCoordinates(coordinates);
  var tile = findTileByCoordinates(coordinates);
  if (game.state.selectedPiece && !tile.occupied) {
    game.state.selectedPiece.move(tile);
    game.state.selectPiece(null);
    game.state.updateTurn();
  }
  if (piece && piece.player == game.state.turn) {
    game.state.selectPiece(piece);
  }
}

function moveHandler(e) {
  game.state.clearHighlight();

  var coordinates = findClickCoordinates(e);

  if (game.state.selectedPiece) {
    canvasElement.style.cursor = "pointer";
    var tile = findTileByCoordinates(coordinates);
    game.state.highlightTile(tile);
  } else {
    canvasElement.style.cursor = "default";
    var piece = findPieceByCoordinates(coordinates);
    if (piece && piece.player == game.state.turn) {
      canvasElement.style.cursor = "pointer";
    }
  }
}

window.onload = function() {

  game = new Game();
  canvasElement = game.gameCanvas.element;
  ctx = game.ctx;
  resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", function() {
    // database.ref('/pieces').remove();
    // writeTurnData(1);
    game.reset();
  });

  // TODO: Make the pieces track their position by row and column rather than tile data.
  // Is the tile updating as occupied or not accurately?
  // Move firebase related code into a module?

  // piecesRef.on('value', function(snapshot) {
  //   game.pieces = snapshot.val();
  //   if (game.pieces) {
  //     game.pieces.forEach(function(piece, index) {
  //       var newPiece = new Piece(game.grid.tiles[piece.tile.coordinates.c][piece.tile.coordinates.r], piece.fill, piece.player || "none");
  //       game.pieces[index] = newPiece;
  //     });
  //   }
  // });

  canvasElement.addEventListener("mousemove", moveHandler);
  canvasElement.addEventListener("click", clickHandler);

  draw();
}
