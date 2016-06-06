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
  [null, "pig", "chi", "cow", "hay", "hay", "cow", "chi", "pig", null],
  [null, null, null, null, "far", "hor", null, null, null, null],
  [],
  [],
  ["hay", null, null, "hay", "hay", "hay", "hay", null, null, "hay"],
  ["hay", null, null, "hay", "hay", "hay", "hay", null, null, "hay"],
  [],
  [],
  [null, null, null, null, "hor", "far", null, null, null, null],
  [null, "pig", "chi", "cow", "hay", "hay", "cow", "chi", "pig", null]
]
