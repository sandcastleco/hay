var canvas = document.getElementById("hay");
var ctx = canvas.getContext("2d");

var tiles = [];
var tileColumnCount = 8;
var tileRowCount = 8;
var tileWidth = canvas.width / tileColumnCount;
var tileHeight = canvas.height / tileRowCount;
var selectedPiece = null;
var pieces = [];
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
var pieceWidth = tileWidth / 3;
var board = [
  ["cow", "chi", "pig", "hor", "far", "pig", "chi", "cow"],
  ["hay", "hay", "hay", "hay", "hay", "hay", "hay", "hay"]
]

/*
 * Tile prototype
 */

function Tile(x, y, width, height, fill) {
  this.x = x * tileWidth;
  this.y = y * tileHeight;
  this.fill = fill || "#E7E7E7";
  this.width = width || tileWidth;
  this.height = height || tileHeight;
}
Tile.prototype.draw = function() {
  ctx.beginPath();
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = this.fill;
  ctx.fill();
  ctx.closePath();
}
Tile.prototype.isPointInside = function(x, y) {
  return (x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height)
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
}
Piece.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.width, 0, Math.PI*2);
  ctx.fillStyle = this.fill;
  ctx.strokeStyle = this.stroke;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
Piece.prototype.move = function(tile) {
  console.log(this.tile);
  this.tile = tile;
  console.log(this.tile);
  this.x = this.tile.x + this.tile.width / 2;
  this.y = this.tile.y + this.tile.height / 2;
  this.draw();
}
Piece.prototype.isPointInside = function(x, y) {
  return (x >= this.tile.x && x <= this.tile.x + this.tile.width && y >= this.tile.y && y <= this.tile.y + this.tile.height)
}

for (c = 0; c < tileColumnCount; c++) {
  tiles[c] = [];
  for (r = 0; r < tileRowCount; r++) {
    tiles[c][r] = new Tile(c, r);
  }
}

for (r = 0; r < board.length; r++) {
  pieces[r] = [];
  for (c = 0; c < tileColumnCount; c++) {
    var currentPiece = board[r][c];
    var piece = pieceDescriptions[currentPiece];
    pieces[r][c] = new Piece(piece.name, c, r, piece.color);
  }
}

function drawPieces() {
  for (r = 0; r < board.length; r++) {
    for (c = 0; c < tileColumnCount; c++) {
      var piece = pieces[r][c];
      piece.draw();
    }
  }
}

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

function draw() {
  drawTiles();
  drawPieces();
}

canvas.addEventListener("click", clickHandler, false);

function clickHandler(e) {
  mouseX = parseInt(e.clientX - canvas.offsetLeft);
  mouseY = parseInt(e.clientY - canvas.offsetTop);
  for (c = 0; c < tileColumnCount; c++) {
    for (r = 0; r < tileRowCount; r++) {
      var tile = tiles[c][r];
      if (tile.isPointInside(mouseX, mouseY)) {
        if (selectedPiece) {
          selectedPiece.move(tile);
          selectedPiece = null;
        } else {
          for (i = 0; i < pieces.length; i++) {
            for (j = 0; j < tileColumnCount; j++) {
              var piece = pieces[i][j];
              if (piece.isPointInside(mouseX, mouseY)) {
                console.log("You clicked on " + piece.id + "!");
                selectedPiece = piece;
              }
            }
          }
        }
      }
    }
  }
  draw();
}

draw();
