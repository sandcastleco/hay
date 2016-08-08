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

  return {
    selectPiece: selectPiece
  }
})();
