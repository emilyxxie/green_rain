function Stream() {
  this.symbols = [];
  this.totalSymbols = window.innerHeight/symbolSize;
  this.speed = random(5, 22);

  this.hasBegun = false;
  this.highlightedIndex = random(this.totalSymbols);
  this.setDisplayTail();
  
  this.descentSpeed = 0;
  this.setDescentSpeed();
}

Stream.prototype = {

  setDisplayTail: function() { 
    this.displayTail = random(this.totalSymbols * 0.7,this.totalSymbols * 0.9); 
  },

  setDescentSpeed: function(){
    if (random(100) > 98) {
      this.descentSpeed = 1.6;
    }else{
      this.descentSpeed = random(0.5,0.9);
    }
  },

  generateSymbols: function(x, y) {
    var opacity = 255;
    for (var i =0; i <= this.totalSymbols; i++) {
      var symbol = new Symbol(
        x,
        y
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
    }
  },

  render: function() {
    // stagger start
    if (!this.hasBegun){
      if (Math.floor(random(100)) == 0){
        this.hasBegun = true;
        this.highlightedIndex = this.symbols.length;
      }else{
        this.symbols.forEach(function (s){
          s.value = ' ';
        });
        return;
      }
    }

    // This subtraction value controls the speed of the decending lighter symbols. Higher value is faster
    this.highlightedIndex = this.highlightedIndex - this.descentSpeed;
    // This multiplier controls the delay before returning the highlighted back to the top
    if (this.highlightedIndex < -(this.displayTail * random(1.0,1.2))) { 
      // Reset back to top
      this.setDisplayTail();
      this.setDescentSpeed();
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

        fill(240,255,240);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }

      text(symbol.value, symbol.x, symbol.y);  
      symbol.setToRandomSymbol(intHightlightIndex, i, this.displayTail, symbol.value);

    };

  }
};