describe("StringCalculator", function() {
  require('../../lib/StringCalculator');

  it("should return 0 if string is empty", function() {
    expect("".calc()).toEqual(0);
  });

  it("should return a number from the string", function() {
    expect("3".calc()).toEqual(3);
  });

  it("should return the sum of comma separated numbers", function() {
    expect("1,2,3".calc()).toEqual(6);
  });

  it("should work with non-comma delimiters", function() {
    expect("//;\n1;2".calc()).toEqual(3);
  });

  it("should ignore numbers bigger than 1000", function() {
    expect("100,1,1000,0050".calc()).toEqual(151);
  });

});
