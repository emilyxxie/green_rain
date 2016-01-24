// todo: add more symbols, numbers and letters
var symbols = [];
var g = 200;
var b = 60;
// var symbolsLength;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  background(0);
  xStart = 0;
  for (var i = 0; i < width / 24; i++) {
  // for (var i = 0; i < 2; i++) {
    createSymbolStream(xStart, g, b);
    xStart += 24;
  }
  symbolsLength = symbols.length;
}

function draw() {
  background(0);
  symbols.forEach(function (stream, index) {
    stream.forEach(function (symbol, index) {
      fill(symbol.r, symbol.g, symbol.b);
      textSize(24);
      text(symbol.character, symbol.x, symbol.y);
      symbol.scroll();
      symbol.convertSymbol();
      symbol.convertInterval++;
      if (symbol.y > height) {
        symbol.y = symbol.meta.streamStart;
      }
    });
  });
}

function createSymbolStream(xStart, g, b) {
  var yStart = random(0, 100);
  var stream = [];
  var first = true;

  // set stream meta data for each symbol
  var streamStart = yStart;
  // var scrollSpeed = 
  var meta = {
    streamStart: streamStart,
    scrollSpeed: random(4, 8)
  };

  for (var i = 0; i < random(5, 40); i++) {
    // create a 2D array
    if (first) {
      stream.push(
        new Symbol(xStart, yStart, 255, 255, 255, first, meta)
      );
      first = false;
    } else {
      stream.push(
        new Symbol(xStart, yStart, 0, g, b, first, meta)
      );
      g -= 8;
      b -= 8;
    }
    yStart -= 24;
  }
  symbols.push(stream);
}


function Symbol(x, y, r, g, b, first, meta) {
  this.character = String.fromCharCode(
    0x30A0 + Math.random() * (0x30FF-0x30A0+1)
  );
  this.x = x;
  this.y = y;

  this.r = r;
  this.g = g;
  this.b = b;

  this.meta = meta;

  // if this is the first number, always have it convert.
  this.convert = first ? 0 : Math.round(random(0, 1)); 
  // set the pace at which it converts
  this.convertInterval = Math.round(random(0, 400));

  this.scroll = function() {
    // this.y += 1.8;
    this.y += this.meta.scrollSpeed;
  }

  this.convertSymbol = function() {
    if (!this.convert && this.convertInterval == 400) {
      this.character = String.fromCharCode(
        0x30A0 + Math.random() * (0x30FF-0x30A0+1)
      );
      this.convertInterval = Math.round(random(0, 200));
    }
  }

}


