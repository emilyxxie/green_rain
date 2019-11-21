var streams = [];
var fadeInterval = 1.6;
var symbolSize = 40;

function setup() {
  createCanvas(
  window.innerWidth,
  window.innerHeight
  );

  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, window.innerHeight);
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



