// https://leetcode.com/problems/wildcard-matching/

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var sCursor = 0;

  for(var pCursor = 0; pCursor < p.length; pCursor++){
    var c = p[pCursor];

    switch(c){
    case '?':
      sCursor++;
      break;
    case '*':
      // iterate through all possibilities for wildcard

      /*** Optimization
       */
      // compact all adjacent wildcards
      while(p[pCursor] === '*')
        pCursor++;

      // allow equality so empty string is tested
      while( sCursor <= s.length ){
        if ( isMatch(s.substr(sCursor), p.substr(pCursor)) )
          return true;

        sCursor++;
      }
      return false;

    default:
      if (s[sCursor] !== c)
        return false;
      else
        sCursor++;
    }
  }

  if(sCursor === s.length)
    return true;
  else
    return false;
};

// WARNING: cheated version with regexp
function isMatchCheating(s, p){
  p = '^' + p.replace(/\?/, '.')
    .replace(/\*+/g, '.*') + '$'; // compress multiple stars into one

  console.log("new pattern is: " + p);

  return s.search(p) > -1;
}

exports.isMatch = isMatch;
