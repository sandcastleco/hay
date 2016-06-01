function getDevicePixelRatio() {
  var ctx = document.createElement("canvas").getContext("2d");
  var dpr = window.devicePixelRatio || 1;
  var bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
  return dpr / bsr;
}

function searchGrid(grid, callback) {
  for (var hexIndex in grid) {
    var currentHex = grid[hexIndex];
    callback(currentHex, grid);
  }
}
