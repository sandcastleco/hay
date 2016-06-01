var gameCanvas;
var ctx;
var grid;
var tileColumnCount = tileRowCount = 10;
var tileWidth = window.innerHeight / tileColumnCount;
var tileHeight = window.innerHeight / tileRowCount;
var pieces = [];

function draw() {
  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  grid.draw();

  for (var i = 0; i < pieces.length; i++) {
    pieces[i].draw();
  }

  requestAnimationFrame(draw);
}

window.onload = function() {
  gameCanvas = new Canvas(window.innerHeight, window.innerHeight);
  ctx = gameCanvas.element.ctx;
  gameCanvas.draw();

  grid = new Grid(tileRowCount, tileColumnCount);

  piece = new Piece(grid.tiles[0][0]);

  // Create piece objects
  for (r = 0; r < board.length; r++) {
    for (c = 0; c < tileColumnCount; c++) {
      var currentPiece = board[r][c];
      console.log(currentPiece);
      if (currentPiece != undefined) {
        var piece = pieceDescriptions[currentPiece];
        pieces.push(new Piece(grid.tiles[c][r], piece.color));
      }
    }
  }

  draw();

}

// var canvas = document.getElementById("hay");
// var ctx = canvas.getContext("2d");
//
// var tiles = [];
// var tileColumnCount = 10;
// var tileRowCount = 10;
// var tileWidth = canvas.width / tileColumnCount;
// var tileHeight = canvas.height / tileRowCount;
//
// var pieces = [];
// var selectedPiece = null;
// var pieceWidth = tileWidth / 3;
// var pieceDescriptions = {
//   far: {
//     name: "farmer",
//     color: "green"
//   },
//   hor: {
//     name: "horse",
//     color: "tan"
//   },
//   pig: {
//     name: "pig",
//     color: "pink"
//   },
//   cow: {
//     name: "cow",
//     color: "black"
//   },
//   chi: {
//     name: "chicken",
//     color: "white"
//   },
//   hay: {
//     name: "hay",
//     color: "yellow"
//   }
// };
// var board = [
//   ["cow", "chi", "hay", "hay", "hay", "hay", "hay", "hay", "chi", "cow"],
//   ["pig", "cow", "chi", "pig", "hor", "far", "pig", "chi", "cow", "pig"],
//   [],
//   [],
//   [null, null, null, "hay", "hay", "hay", "hay", null, null, null],
//   [null, null, null, "hay", "hay", "hay", "hay", null, null, null],
//   [],
//   [],
//   ["pig", "cow", "chi", "pig", "hor", "far", "pig", "chi", "cow", "pig"],
//   ["cow", "chi", "hay", "hay", "hay", "hay", "hay", "hay", "chi", "cow"]
// ]
//
//
//
//
// // Create piece objects
// for (r = 0; r < board.length; r++) {
//   for (c = 0; c < tileColumnCount; c++) {
//     var currentPiece = board[r][c];
//     if (currentPiece != undefined) {
//       var piece = pieceDescriptions[currentPiece];
//       pieces.push(new Piece(piece.name, c, r, piece.color));
//     }
//   }
// }
//
// /*
//  * Present
//  */
//
// function drawTiles() {
//   for(c=0; c < tileColumnCount; c++) {
//     for (r = 0; r < tileRowCount; r++) {
//       var tile = tiles[c][r];
//       if (c%2 == r%2) {
//         tile.fill = "#E7E7E7";
//       } else {
//         tile.fill = "#FFF";
//       }
//       tile.draw();
//     }
//   }
// }
//
// function drawPieces() {
//   for (var i = 0; i < pieces.length; i++) {
//     pieces[i].draw();
//   }
// }
//
// function draw() {
//   drawTiles();
//   drawPieces();
// }
//
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
