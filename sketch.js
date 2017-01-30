var symbolStreams = [];
var symbolSize = 14;
var fadeInterval = 1.6;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  createSymbolStreams();
  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  // make background semi-opaque to lend a slightly "blurry" feeling
  background(0, 170);
  symbolStreams.forEach(function (symbolStream) {
    symbolStream.render();
  });
}

function createSymbolStreams() {
  xStart = 0;
  yStart = random(-100, 0);
  for (var i = 0; i <= width / symbolSize; i++) {
    symbolStream = new SymbolStream(xStart, yStart);
    symbolStream.addSymbols();
    symbolStreams.push(symbolStream);
    xStart += symbolSize;
  }
}

function SymbolStream(x, y) {
  this.speed = random(5, 22);
  this.totalSymbols = round(random(5, 30));
  this.symbols = [];

  this.addSymbols = function() {
    var opacity = 255;
    var first = boolean(round(random(0, 1)));
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, opacity, this.speed, first);
      symbol.getRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      opacity -= (255 / this.totalSymbols) / fadeInterval
      first = false;
    }
  }

  this.render = function() {
    r = 0;
    g = 255;
    b = 65;
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(r, g, b, symbol.opacity);
      }
      text(symbol.symbol, symbol.x, symbol.y);
      symbol.rain();
      symbol.getRandomSymbol();
    });
  }
}

function Symbol(x, y, opacity, speed, first) {
  this.x = x;
  this.y = y;

  this.opacity = opacity;
  this.speed = speed;
  this.switchInterval = round(random(2, 30));
  this.symbol;
  this.first = first;

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y + speed;
  }

  this.getRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0 || frameCount == 0) {
      var katakana = round(random(0, 5));
      if (katakana > 1) {
      // create a Katakana unicode character
        this.symbol = String.fromCharCode(
          0x30A0 + Math.random() * (0x30FF-0x30A0+1)
        );
      } else {
        // set it to numeric
        this.symbol = round(random(0,9));
      }
    }
  }
}
