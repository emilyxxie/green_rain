function Symbol(x, y) {
  this.x = x;
  this.y = y;

  this.opacity = 0;
  this.setToRandomSymbol(0,0,0,' ');
}

Symbol.prototype = {
  setToRandomSymbol: function(highlightIndex, currentIndex, tailLength, currentValue) {
    var changeType = random(2000);
    var charType = random(10);
      
    if (currentIndex <= highlightIndex + tailLength && currentIndex >= highlightIndex){
      //show something

      if (changeType > 6 && currentValue != ' '){
        //stay the same
        this.value = currentValue;

      } else if (charType > 9) {
        // Arabic
        this.value = String.fromCharCode(
          0x0620 + round(random(0, 26))
        );
      } else if (charType > 2) {
        // Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );

      } else if (charType > 2){
        //ruuuusski
        this.value = String.fromCharCode(
          0x0400 + round(random(0, 96))
        );

      }else if (charType > 1){
        // set it to numeric
        this.value = round(random(0, 9));
      }else{

        this.value = ' ';
      }

    } else if ( currentIndex < highlightIndex || currentIndex > highlightIndex + tailLength){
      //if we're below the hightlighted symbol or we're above the tail of the stream, then show blank.
      this.value = ' ';
    }
  },
  giveHighlight:function(){
    // rect(this)
  }
};