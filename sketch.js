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

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;
  this.switchInterval = round(random(2, 25));
  this.setToRandomSymbol(0,0,0,' ');
}

Symbol.prototype = {
  setToRandomSymbol: function(highlightIndex, currentIndex, tailLength, currentValue) {
    var charType = round(random(2000));
      
    if (currentIndex <= highlightIndex + tailLength && currentIndex >= highlightIndex){
      //show something

      if (charType > 5 && currentValue != ' '){
        //stay the same
        this.value = currentValue;

      } else if (charType > 4) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );

      } else if (charType > 3){
        //ruuuusski
        this.value = String.fromCharCode(
          0x0400 + round(random(0, 96))
        );

      }else if (charType > 2){
        // set it to numeric
        this.value = round(random(0, 9));
      }else{

        this.value = ' ';
      }

    } else if ( currentIndex < highlightIndex || currentIndex > highlightIndex + tailLength){
      //if we're below the hightlighted symbol or we're above the tail of the stream, then show blank.
      this.value = ' ';
    }
  }
};

function Stream() {
  this.symbols = [];
  this.totalSymbols = window.innerHeight/symbolSize;
  this.speed = random(5, 22);

  this.hasBegun = false;
  this.highlightedIndex = random(this.totalSymbols);
  this.setDisplayTail();
}

Stream.prototype = {

  setDisplayTail: function() { 
    this.displayTail = random(this.totalSymbols * 0.7,this.totalSymbols * 0.9); 
  },

  generateSymbols: function(x, y) {
    var opacity = 255;
    for (var i =0; i <= this.totalSymbols; i++) {
      var symbol = new Symbol(
        x,
        y,
        this.speed,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
    }
  },

  render: function() {
    // stagger start
    if (!this.hasBegun){
      if (Math.floor(random(80)) == 0){
        this.hasBegun = true;
        this.highlightedIndex = this.symbols.length;
      }else{
        this.symbols.forEach(s => {
          s.value = ' ';
        });
        return;
      }
    }

    // This subtraction value controls the speed of the decending lighter symbols. Higher value is faster
    this.highlightedIndex = this.highlightedIndex -.6;
    // This multiplier controls the delay before returning the highlighted back to the top
    if (this.highlightedIndex < -(this.displayTail * random(1.0,1.2))) { 
      // Reset back to top
      this.setDisplayTail();
      this.highlightedIndex = this.symbols.length
    };  
    
    for (var i = 0; i < this.symbols.length; i++) {
      var symbol = this.symbols[i];
      var intHightlightIndex = Math.floor(this.highlightedIndex);
      var isHightlighted = i == intHightlightIndex;

      if (i < intHightlightIndex + (this.displayTail-2)) {
        
        symbol.opacity = 255;
      }else{ 
        // Last 2 can fade a bit
        symbol.opacity = 180;
      }

      if (isHightlighted) {

        fill(230,255,230);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }

      text(symbol.value, symbol.x, symbol.y);  
      symbol.setToRandomSymbol(intHightlightIndex, i, this.displayTail, symbol.value);

    };

  }
};