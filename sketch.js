var symbols = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var yStart = 0;
  var gStart = 0;
  var r = 0;
  var g = 200;
  var b = 0;

  for (var i = 0; i < random(15, 40); i++) {
    if (yStart == 0) {
      symbols.push(
        new Symbol(10, yStart, 255, 255, 255)
      );      
    } else {
      symbols.push(
        new Symbol(10, yStart, r, g, b)
      );
      g -= 8;
    }
    yStart -= 18;
  }
}

function draw() {
  background(0);
  for (var i = 0; i < symbols.length; i++) {
    var symbol = symbols[i];

    fill(symbol.r, symbol.g, symbol.b);
    textSize(18);
    text(symbol.character, symbol.x, symbol.y);
    symbol.scroll();
  }
}

function Symbol(x, y, r, g, b) {
  this.character = String.fromCharCode(
    0x30A0 + Math.random() * (0x30FF-0x30A0+1)
  ); // '\u30A1';
  this.x = x;
  this.y = y;

  this.r = r;
  this.g = g;
  this.b = b;

  this.velocity = 0;
  this.velocityIncrement = random(0, 0.01);

  this.scroll = function() {
    this.y += 1.8;
  }
}

// function mousePressed() {
//   chars.push(new Char(mouseX, mouseY));
// }

function mouseDragged() {
  Symbol.push(new Symbol(mouseX, mouseY));
}