String.prototype.calc = function() {
  var string = this;
  var defRadix = 10;
  var stringLength = string.length;

  if(stringLength === 0) {
    return stringLength;
  }

  
  var parsedNumber = parseInt(string, defRadix).toString()
  if(parsedNumber.length === stringLength) {
    return parseInt(string, defRadix);
  }


  var regex = /[\d]+/gm;
  var digitMatches = string.match(regex);
  var sum = 0;
  
  if(digitMatches.length) {
    
    for(var i = 0, j = digitMatches.length; i < j; i++) {
      var currentNumber = parseInt(digitMatches[i], defRadix);
      if(currentNumber.toString().length > 3) {
        continue;
      }
      sum += currentNumber;
    }
    
    return sum;
  }
  
};

