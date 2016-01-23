// todo: add more symbols, numbers and letters
var symbols = [];
var g = 200;
var b = 60;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  createSymbolStream();
  // set global variable for performance - prevents 
  // checking length every iteration in draw()
  symbolsLength = symbols.length;
}

function draw() {
  background(0);

  for (var j = 0; j < 40; j++) { 
    fill(symbol.r, symbol.g, symbol.b);
    textSize(24);
    var symbol = symbols[j];
    text(symbol.character);
    for (var i = 0; i < symbolsLength; i++) {
      // var symbol = symbols[i];
      // fill(symbol.r, symbol.g, symbol.b);
      // textSize(24);
      // text(symbol.character, symbol.x, symbol.y);
      // symbol.convertSymbol();
      // symbol.scroll();
      // symbol.convertInterval++;
    }
  }
}

function createSymbolStream() {
  var yStart = 0;
  var xStart = 0;

  // set up a line of symbols
  for (var i = 0; i < random(15, 40); i++) {
    if (yStart == 0) {
      symbols.push(
        new Symbol(xStart, yStart, 255, 255, 255)
      );
    } else {
      symbols.push(
        new Symbol(xStart, yStart, 0, g, b)
      );
      g -= 8;
      b -= 8;
    }
    yStart -= 24;
  }
  xStart += 24;
  yStart = 0;
}


function Symbol(x, y, r, g, b) {
  this.character = String.fromCharCode(
    0x30A0 + Math.random() * (0x30FF-0x30A0+1)
  );
  this.x = x;
  this.y = y;

  this.r = r;
  this.g = g;
  this.b = b;

  // if this is the first number, always have it convert.
  this.convert = y.start ? Math.round(random(0, 5)) : 0; 
  // set the pace at which it converts
  this.convertInterval = Math.round(random(0, 400));

  this.scroll = function() {
    this.y += 2;
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


