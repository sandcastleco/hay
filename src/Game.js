/*
Class: Game
Properties:
Description:
*/

function Game() {
  this.state = new GameState();
  this.gameCanvas = new Canvas(window.innerHeight, window.innerHeight);
  this.ctx = this.gameCanvas.element.ctx;
  this.grid = new Grid(tileColumnCount, tileRowCount);
  this.pieces = [];
  this.init();
}
Game.prototype = (function() {
  function _createCanvas() {
    this.gameCanvas.draw();
  }

  function _createPieces() {
    this.pieces = [];
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
          if (player == 1 || currentPiece == "hay") {
            var piece = new Piece(this.grid.tiles[c][r], piece.color, player);
          } else {
            var piece = new Piece(this.grid.tiles[c][r], '#FFF', player, piece.color);
          }
          this.pieces.push(piece);
        }
      }
    }
    // writePieces(this.pieces);
  }

  function draw() {
    game.ctx.clearRect(0, 0, game.gameCanvas.width, game.gameCanvas.height);
    game.grid.draw();
    for (var i = 0; i < game.pieces.length; i++) {
      game.pieces[i].draw();
    }
  }

  function init() {
    _createCanvas.call(this);
    _createPieces.call(this);
  }

  return {
    init: init,
    draw: draw,
    reset: _createPieces
  }
})();
