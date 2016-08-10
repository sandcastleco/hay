/*
Class: Game
Properties:
Description:
*/

function Game() {
  this.selectedPiece = null;
}
Game.prototype = (function() {
  function selectPiece(piece) {
    piece.selected = true;
    this.selectedPiece = piece;
  }

  function clearSelection() {
    searchPieces(function(piece) {
      piece.selected = false;
    });
  }

  return {
    selectPiece: selectPiece,
    clearSelection: clearSelection
  }
})();
