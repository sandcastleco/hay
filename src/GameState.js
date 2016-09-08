/*
Class: GameState
Properties:
Description:
*/

function GameState() {
  this.selectedPiece = null;
  this.turn = 1;
  this.init();
}
GameState.prototype = (function() {
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

  function setTurn(turn) {
    console.log(turn);
    this.turn = turn;
  }

  function updateTurn() {
    if (this.turn == 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
    // writeTurnData(this.turn);
    writeTurn.call(this);
  }

  function writeTurn() {
    var turnIndicator = document.getElementById("turn");
    turnIndicator.innerHTML = "Player " + this.turn;
    // turnRef.on('value', function(snapshot) {
    //   game.turn = snapshot.val();
    //   var turnIndicator = document.getElementById("turn");
    //   turnIndicator.innerHTML = "Player " + snapshot.val();
    //   setTurn(snapshot.val());
    // });
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
