// https://leetcode.com/problems/decode-ways/

var cache = {};

// 0 is special! If there is a leading 0, then this branching is invalid.
//
// It appears that 0 is only valid following 1 or 2, two continuous 0s are
// considered invalid.
function numDecodingsInternal(s){
  if (s.startsWith('0'))
    return 0;

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
  // for recursion, the empty string is a good end point indicating a valid
  // decoding way
  if (s.length === 0)
    return 0;

  return numDecodingsInternal(s);
};

module.exports = numDecodings;
