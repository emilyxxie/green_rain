// todo: add more symbols, numbers and letters
var symbols = [];
var g = 200;
var b = 60;
// var symbolsLength;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  background(0);
  xStart = 0;
  createSymbolStream(xStart, g, b);
  symbolsLength = symbols.length;
}

function draw() {
  // console.log(symbols.length);
  background(0);
  for (var i = 0; i < symbolsLength; i++) {
    var stream = symbols[i];
    var streamLength = stream.length;
    for (var j = 0; j < streamLength; j++) {
      var symbol = stream[j];
      fill(symbol.r, symbol.g, symbol.b);
      textSize(24);
      text(symbol.character, symbol.x, symbol.y);
      symbol.convertSymbol();
      symbol.scroll();
      if (symbol.y > height) {
        symbol.y = 0;
      }
      symbol.convertInterval++;
    }
      // var symbol = symbols[i];
      // fill(symbol.r, symbol.g, symbol.b);
      // textSize(24);
      // text(symbol.character, symbol.x, symbol.y);
      // symbol.convertSymbol();
      // symbol.scroll();
      // // if (symbol.y > height) {
      // //   // resetSymbolStream();
      // // }
      // symbol.convertInterval++;
  }
}

// function appendSymbolStream(i, j) {
//   arrasymbols[i];
// }

// function resetSymbolStream(i, j) {
//   symbols[i].splice(0, 1);
// }

function createSymbolStream(xStart, g, b) {
  var yStart = random();
  var stream = [];
  for (var i = 0; i < random(15, 200); i++) {
    // create a 2D array
    if (yStart == 0) {
      stream.push(
        new Symbol(xStart, yStart, 255, 255, 255)
      );
    } else {
      stream.push(
        new Symbol(xStart, yStart, 0, g, b)
      );
      g -= 8;
      b -= 8;
    }
    yStart -= 24;
  }
  symbols.push(stream);
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
    this.y += 1.8;
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


