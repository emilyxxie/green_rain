var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var frameCounter = 1;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9));
      }
    }
  }

  this.rain = function() {
    console.log(frameCounter, this.speed)
    if(frameCounter % this.speed==0){
      this.y = (this.y >= height) ? 0 : this.y += symbolSize;
    }
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = floor(random(5, 30)); // frame skip

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    frameCounter++;
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
    if(frameCounter>=60){
      frameCounter = 0;
    }
  }
}

