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
    this.turn = turn;
    writeTurn.call(this);
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
    var menu = document.getElementById("menu");
    var turnIndicator = document.getElementById("turn");
    turnIndicator.innerHTML = "Player " + this.turn;
    if (this.turn == 2) {
      console.log("turn 2");
      menu.style.top = "initial";
      menu.style.bottom = "20px";
      turnIndicator.style.color = "red";
    } else {
      menu.style.top = "20px";
      menu.style.bottom = "initial";
      turnIndicator.style.color = "blue";
    }
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
    setTurn: setTurn,
    init: init
  }
})();
