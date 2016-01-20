var chars = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  chars.push(new Char(10, 10));
}

function draw() {
  background(0);
  for (var i = 0; i < chars.length; i++) {
    fill(255);
    textSize(18);
    text(chars[i].character, chars[i].x, chars[i].y);
    chars[i].scroll();
  }
}

function Char(x, y) {
  this.character = String.fromCharCode(
    0x30A0 + Math.random() * (0x30FF-0x30A0+1)
  ); // '\u30A1';
  this.x = x;
  this.y = y;
  this.velocity = 0;

  this.scroll = function() {
    this.velocity += 0.015;
    this.y += this.velocity;
  }
}

// function mousePressed() {
//   chars.push(new Char(mouseX, mouseY));
// }

function mouseDragged() {
  chars.push(new Char(mouseX, mouseY));
}