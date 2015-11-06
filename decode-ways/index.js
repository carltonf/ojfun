// https://leetcode.com/problems/decode-ways/

var cache = {};

var numDecodings = function(s){
  if (s.length === 0)
    return 0;
  if (s.length === 1)
    return 1;

  var headNum = Number( s.substr(0,2) );

  cache[s.substr(1)] = cache[s.substr(1)] || numDecodings(s.substr(1));

  if (headNum <= 26){
    cache[s.substr(2)] = cache[s.substr(1)] || numDecodings(s.substr(2));

    return cache[s.substr(1)] + cache[s.substr(2)];
  }
  else{
    return numDecodings(s.substr(1));
  }
};

module.exports = numDecodings;

