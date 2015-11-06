// https://leetcode.com/problems/decode-ways/

var numDecodings = function(s){
  if (s.length <= 1)
    return 1;

  var headNum = Number( s.substr(0,2) );

  if (headNum <= 26){
    return numDecodings(s.substr(2)) + numDecodings(s.substr(1));
  }
  else{
    return numDecodings(s.substr(1));
  }
};

module.exports = numDecodings;

