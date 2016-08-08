var gameCanvas;
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

function createPieces() {
  for (r = 0; r < board.length; r++) {
    for (c = 0; c < tileColumnCount; c++) {
      var currentPiece = board[r][c];
      if (currentPiece != undefined) {
        var piece = pieceDescriptions[currentPiece];
        pieces.push(new Piece(grid.tiles[c][r], piece.color));
      }
    }
  }
}

window.onload = function() {
  gameCanvas = new Canvas(window.innerHeight, window.innerHeight);
  ctx = gameCanvas.element.ctx;
  gameCanvas.append();

  game = new Game();
  console.log(game);
  grid = new Grid(tileRowCount, tileColumnCount);

  createPieces();

  gameCanvas.element.addEventListener("click", function(e) {
    pieces.forEach(function(element) {
      element.selected = false;
      var coordinates = new Point(e.x, e.y);
      if (element.isPointInside(coordinates)) {
        console.log(element);
        element.selected = true;
        game.selectedPiece = element;
        console.log(game);
      }
    })
  });

  draw();

  pieces[0].move(grid.tiles[0][0]);

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
