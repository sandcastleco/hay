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
}

draw();
