String.prototype.calc = function() {
  var _ = require('lodash');
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
  
  if(digitMatches.length) {
    var sum = 0;

    _.each(digitMatches, function(currentNumber) {
      currentNumber = parseInt(currentNumber, defRadix);

      if(currentNumber.toString().length > 3) {
        return;
      }

      sum += currentNumber;
    });
    
    return sum;
  }
  
};

