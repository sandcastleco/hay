var canvas = document.getElementById("hay");
var ctx = canvas.getContext("2d");

var tiles = [];
var tileColumnCount = 8;
var tileRowCount = 8;
var tileWidth = canvas.width / tileColumnCount;
var tileHeight = canvas.height / tileRowCount;

var pieces = [];
var selectedPiece = null;
var pieceWidth = tileWidth / 3;
var pieceDescriptions = {
  far: {
    name: "farmer",
    color: "green"
  },
  hor: {
    name: "horse",
    color: "tan"
  },
  pig: {
    name: "pig",
    color: "pink"
  },
  cow: {
    name: "cow",
    color: "black"
  },
  chi: {
    name: "chicken",
    color: "white"
  },
  hay: {
    name: "hay",
    color: "yellow"
  }
};
var board = [
  ["cow", "chi", "pig", "hor", "far", "pig", "chi", "cow"],
  ["hay", "hay", "hay", "hay", "hay", "hay", "hay", "hay"],
  [],
  [],
  [],
  [],
  ["hay", "hay", "hay", "hay", "hay", "hay", "hay", "hay"],
  ["cow", "chi", "pig", "hor", "far", "pig", "chi", "cow"]
]

/*
 * Tile prototype
 */

function Tile(x, y, width, height, fill) {
  this.column = x;
  this.row = y;
  this.coordinates = [this.column, this.row];
  this.x = x * tileWidth;
  this.y = y * tileHeight;
  this.fill = fill || "#E7E7E7";
  this.width = width || tileWidth;
  this.height = height || tileHeight;
  this.occupied = false;
  this.valid = false;
}
Tile.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  if (this.valid) {
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "white";
    ctx.stroke();
  } else {
    ctx.fillStyle = this.fill;
  }
  ctx.fill();
  ctx.closePath();
}
Tile.prototype.isPointInside = function(coordinates) {
  return (coordinates.x >= this.x && coordinates.x <= this.x + this.width && coordinates.y >= this.y && coordinates.y <= this.y + this.height);
}

/*
 * Piece prototype
 */

function Piece(id, tileX, tileY, fill, stroke, width, height) {
  this.id = id;
  this.tile = tiles[tileX][tileY];
  this.x = this.tile.x + this.tile.width / 2;
  this.y = this.tile.y + this.tile.height / 2;
  this.fill = fill || "#000";
  this.stroke = stroke || "#7E7E7E";
  this.width = width || pieceWidth;
  this.height = height || pieceWidth;
  this.selected = false;
  this.validMoves = [];
}
Piece.prototype.draw = function() {
  this.tile.occupied = true;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
  if (this.selected) {
    ctx.fillStyle = "blue";
  } else {
    ctx.fillStyle = this.fill;
  }
  ctx.strokeStyle = this.stroke;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
Piece.prototype.move = function(tile) {
  this.tile.occupied = false;
  this.tile = tile;
  this.x = this.tile.x + this.tile.width / 2;
  this.y = this.tile.y + this.tile.height / 2;
  this.selected = false;
  for (var i = 0; i < this.validMoves.length; i++) {
    this.validMoves[i].valid = false;
  }
}
Piece.prototype.isPointInside = function(coordinates) {
  return (coordinates.x >= this.tile.x && coordinates.x <= this.tile.x + this.tile.width && coordinates.y >= this.tile.y && coordinates.y <= this.tile.y + this.tile.height);
}
Piece.prototype.findValidMoves = function() {
  var column = this.tile.column;
  var row = this.tile.row;
  var moveGrid = [[column, row - 1], [column + 1, row - 1], [column + 1, row], [column + 1, row + 1], [column, row + 1], [column - 1, row + 1], [column - 1, row], [column - 1, row - 1]];
  for (var i = 0; i < moveGrid.length; i++) {
    for (var c = 0; c < tileColumnCount; c++) {
      for (r = 0; r < tileRowCount; r++) {
        var tile = tiles[c][r];
        if (tile.column == moveGrid[i][0] && tile.row == moveGrid[i][1] && tile.occupied == false) {
          tile.valid = true;
          this.validMoves.push(tile);
        }
      }
    }
  }
}

// Create tile objects
for (c = 0; c < tileColumnCount; c++) {
  tiles[c] = [];
  for (r = 0; r < tileRowCount; r++) {
    tiles[c][r] = new Tile(c, r);
  }
}

// Create piece objects
for (r = 0; r < board.length; r++) {
  for (c = 0; c < tileColumnCount; c++) {
    var currentPiece = board[r][c];
    if (currentPiece != undefined) {
      var piece = pieceDescriptions[currentPiece];
      pieces.push(new Piece(piece.name, c, r, piece.color));
    }
  }
}

/*
 * Present
 */

function drawTiles() {
  for(c=0; c < tileColumnCount; c++) {
    for (r = 0; r < tileRowCount; r++) {
      var tile = tiles[c][r];
      if (c%2 == r%2) {
        tile.fill = "#E7E7E7";
      } else {
        tile.fill = "#FFF";
      }
      tile.draw();
    }
  }
}

function drawPieces() {
  for (var i = 0; i < pieces.length; i++) {
    pieces[i].draw();
  }
}

function draw() {
  drawTiles();
  drawPieces();
}

/*
 * Accept
 */

canvas.addEventListener("click", clickHandler, false);

/*
 * Interpret & Calculate
 */

function findClickCoordinates(event) {
  var mouseX = parseInt(event.clientX - canvas.offsetLeft);
  var mouseY = parseInt(event.clientY - canvas.offsetTop);
  return {x: mouseX, y: mouseY};
}

function findClickedTile(coordinates) {
  for (var c = 0; c < tileColumnCount; c++) {
    for (var r = 0; r < tileColumnCount; r++) {
      var tile = tiles[c][r];
      if (tile.isPointInside(coordinates)) {
        return tile;
      }
    }
  }
}

function findClickedPiece(coordinates) {
  for(var i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    if (piece.isPointInside(coordinates)) {
      return piece;
    }
  }
}

function selectPiece(piece) {
  selectedPiece = piece;
  selectedPiece.selected = true;
  selectedPiece.findValidMoves();
}

function clearSelection() {
  selectedPiece.selected = false;
  clearValidMoves(selectedPiece);
  selectedPiece = null;
}

function clearValidMoves(piece) {
  for (var i = 0; i < piece.validMoves.length; i++) {
    piece.validMoves[i].valid = false;
  }
}

function clickHandler(e) {
  var mouseCoordinates = findClickCoordinates(e);

  var tile = findClickedTile(mouseCoordinates);
  var piece = findClickedPiece(mouseCoordinates);

  if (selectedPiece && tile.valid) {
    selectedPiece.move(tile);
  }

  if (piece) {
    if (selectedPiece) {
      clearSelection();
    }
    selectPiece(piece);
  }

  draw();
}

draw();
