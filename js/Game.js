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
