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
  ["cow", "chi", "hay", "hay", "hay", "hay", "hay", "hay", "chi", "cow"],
  ["pig", "cow", "chi", "pig", "hor", "far", "pig", "chi", "cow", "pig"],
  [],
  [],
  [null, null, null, "hay", "hay", "hay", "hay", null, null, null],
  [null, null, null, "hay", "hay", "hay", "hay", null, null, null],
  [],
  [],
  ["pig", "cow", "chi", "pig", "hor", "far", "pig", "chi", "cow", "pig"],
  ["cow", "chi", "hay", "hay", "hay", "hay", "hay", "hay", "chi", "cow"]
]
