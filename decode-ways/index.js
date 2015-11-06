// https://leetcode.com/problems/decode-ways/

var cache = {};

function numDecodingsInternal(s){
  if (s.length <= 1)
      return 1;

  var str1 = s.substr(1),
      str2 = s.substr(2);
  var headNum = Number( s.substr(0,2) );

  cache[str1] = cache[str1] || numDecodingsInternal(str1);

  if (headNum <= 26){
    cache[str2] = cache[str2] || numDecodingsInternal(str2);

    return cache[str1] + cache[str2];
  }
  else{
    return cache[str1];
  }
}

/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s){
  s = s.replace("0","");
  if (s.length === 0)
    return 0;

  return numDecodingsInternal(s);
};

module.exports = numDecodings;
