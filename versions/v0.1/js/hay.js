var canvas = document.getElementById("hay");
var ctx = canvas.getContext("2d");

var tiles = [];
var tileWidth = canvas.width/8;
var tileHeight = canvas.height/8;
var tileColumnCount = 8;
var tileRowCount = 8;
for (c = 0; c < tileColumnCount; c++) {
  tiles[c] = [];
  for (r = 0; r < tileRowCount; r++) {
    tiles[c][r] = {x: 0, y: 0, type: 0};
  }
}

var pieceWidth = tileWidth / 3;

var pieces = [
  farmer = {
    initialX: 4,
    initialY: 7,
    color: "green"
  },
  horse = {
    initialX: 3,
    initialY: 7,
    color: "tan"
  },
  pig1 = {
    initialX: 2,
    initialY: 7,
    color: "pink"
  },
  pig2 = {
    initialX: 5,
    initialY: 7,
    color: "pink"
  },
  chicken1 = {
    initialX: 1,
    initialY: 7,
    color: "white"
  },
  chicken2 = {
    initialX: 6,
    initialY: 7,
    color: "white"
  },
  cow1 = {
    initialX: 0,
    initialY: 7,
    color: "black"
  },
  cow2 = {
    initialX: 7,
    initialY: 7,
    color: "black"
  },
  hay1 = {
    initialX: 0,
    initialY: 6,
    color: "yellow"
  },
  hay2 = {
    initialX: 1,
    initialY: 6,
    color: "yellow"
  },
  hay3 = {
    initialX: 2,
    initialY: 6,
    color: "yellow"
  },
  hay4 = {
    initialX: 3,
    initialY: 6,
    color: "yellow"
  },
  hay5 = {
    initialX: 4,
    initialY: 6,
    color: "yellow"
  },
  hay6 = {
    initialX: 5,
    initialY: 6,
    color: "yellow"
  },
  hay7 = {
    initialX: 6,
    initialY: 6,
    color: "yellow"
  },
  hay8 = {
    initialX: 7,
    initialY: 6,
    color: "yellow"
  }
];

function drawPieces() {
  for (i = 0; i < pieces.length; i++) {
    var piece = pieces[i];
    var pieceX = piece.initialX * tileWidth + tileWidth/2;
    var pieceY = piece.initialY * tileHeight + tileHeight/2;
    ctx.beginPath();
    ctx.arc(pieceX, pieceY, pieceWidth, 0, Math.PI*2);
    ctx.fillStyle = piece.color;
    ctx.strokeStyle = "#7e7e7e";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

function drawTiles() {
  for(c=0; c < tileColumnCount; c++) {
    for (r = 0; r < tileRowCount; r++) {
      var tileX = c * tileWidth;
      var tileY = r * tileHeight;
      tiles[c][r].x = tileX;
      tiles[c][r].y = tileY;
      ctx.beginPath();
      ctx.rect(tileX, tileY, tileWidth, tileHeight);
      if (c%2 == r%2) {
        ctx.fillStyle = "#E7E7E7";
      } else {
        ctx.fillStyle = "#FFF";
      }
      ctx.fill();
    }
  }
}

function draw() {
  drawTiles();
  drawPieces();
}

draw();
