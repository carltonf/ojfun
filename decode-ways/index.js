// https://leetcode.com/problems/decode-ways/

var cache = {};

// helper to get or compute value for str
function getCachedVal(str){
  if ( !(str in cache) )
    cache[str] = numDecodingsInternal(str);

  return cache[str];
}

// 0 is special! If there is a leading 0, then this branching is invalid.
//
// It appears that 0 is only valid following 1 or 2, two continuous 0s are
// considered invalid.
//
// NOTE: should make sure s is always valid
function numDecodingsInternal(s){
  if (s.startsWith('0'))
    return 0;
  if (s.length <= 1)
      return 1;

  if ( s in cache )
    return cache[s];

  var str1 = s.substr(1),
      str2 = s.substr(2);
  var headNum = Number( s.substr(0,2) );

  if (headNum > 26){
    return getCachedVal(str1);
  }
  else{
    if(headNum === 10 || headNum === 20)
      return getCachedVal(str2);
    else if ((headNum === 11 || headNum === 12)
             && str2.startsWith('0')){
      return getCachedVal(str1);
    }
    else
      return getCachedVal(str1) + getCachedVal(str2);
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

  // any 0 pair other than 10, 20 is invalid, starting with 0 is also invalid
  if (s.search(/[^12]0|^0/) > -1)
    return 0;

  return numDecodingsInternal(s);
};

module.exports = numDecodings;
