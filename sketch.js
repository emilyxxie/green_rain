var symbols = [];
var g = 200;
var b = 60;
var colorFadeInterval = 8;
var symbolSize = 24;

function setup() {
  createCanvas(screen.availWidth, screen.availHeight);
  background(0);
  xStart = 0;
  for (var i = 0; i < width / symbolSize; i++) {
    createSymbolStream(xStart, g, b);
    xStart += symbolSize;
  }
  symbolsLength = symbols.length;
}

function draw() {
  background(0);
  symbols.forEach(function (stream, index) {
    stream.forEach(function (symbol, index) {
      fill(symbol.r, symbol.g, symbol.b);
      textFont("Consolas");
      textSize(symbolSize);
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
  var yStart = random(0, 130);
  // create a 2D array
  var stream = [];
  var first = true;

  // set stream meta data for each symbol
  var streamStart = yStart;
  var meta = {
    streamStart: streamStart,
    scrollSpeed: random(5, 10)
  };

  for (var i = 0; i < random(5, 100); i++) {
    // set first character white
    if (first) {
      stream.push(
        new Symbol(xStart, yStart, 255, 255, 255, first, meta)
      );
      first = false;
    } else {
      stream.push(
        new Symbol(xStart, yStart, 0, g, b, first, meta)
      );
      g -= colorFadeInterval;
      b -= colorFadeInterval;
    }
    yStart -= symbolSize;
  }
  symbols.push(stream);
}

function generateRandomSymbol() {
  var charOrNum = random(0, 100);
  if (charOrNum > 5) {
    // create a Katakana unicode character
    return String.fromCharCode(
      0x30A0 + Math.random() * (0x30FF-0x30A0+1)
    );
  } else {
    // set it to numeric
    return round(random(0,9));
  }
}

function Symbol(x, y, r, g, b, first, meta) {
  this.character = generateRandomSymbol();

  // set draw positions
  this.x = x;
  this.y = y;

  // set rgb color values
  this.r = r;
  this.g = g;
  this.b = b;

  // set meta data for stream
  this.meta = meta;

  // if this is the first number, always have it convert.
  this.convert = first ? 0 : Math.round(random(0, 1)); 
  this.convertInterval = Math.round(random(0, 100));

  this.scroll = function() {
    this.y += this.meta.scrollSpeed;
  }

  this.convertSymbol = function() {
    if (!this.convert && this.convertInterval == 100) {
      this.character = generateRandomSymbol();
      this.convertInterval = Math.round(random(0, 100));
    }
  }
}


