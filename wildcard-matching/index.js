// https://leetcode.com/problems/wildcard-matching/
// p doesn't contain stars
function indexOfWithoutStars(s, p){
  var res = s.match(p.replace(/\?/g, '.'));

  return res ? res.index : -1;
}

function endsWithWithoutStars(s, p){
  var res = s.match( p.replace(/\?/g, '.') + '$' );

  return res ? res.index : -1;
}

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  var pa = p.split('*').filter(substr => substr),
      subPat = null;

  // handle special cases
  if (p === '*')
    return true;
  if (p === '')
    return (s === '');

  // Handle the case p starts or ends with NO leading or ending star
  if( p[0] !== '*' ){
    subPat = pa.shift();
    if( indexOfWithoutStars(s, subPat) !== 0 )
      return false;
    else{
      s = s.substring(subPat.length)
    }
  }

  if( !p.endsWith('*') ){
    if( pa.length > 0 ){
      subPat = pa.pop();
      if( endsWithWithoutStars(s, subPat) === -1)
        return false;
      else{
        s = s.substr(0, s.length - subPat.length);
      }
    }
    // case like 'ab'
    else if (s.length === 0)
      return true;
    else
      return false;
  }

  return isMatchSubPats(s, pa, 0);
};

function isMatchSubPats(s, pa, idx){
  var subPat = null,
      subPatMatchIdx = -1;

  if ( idx === pa.length )
    return true;

  subPat = pa[idx];
  subPatMatchIdx = indexOfWithoutStars(s, subPat);

  if ( subPatMatchIdx > - 1 )
    // Theorem: if the first index doesn't create a match, no later index will
    // create a match
    return isMatchSubPats(s.substr( subPatMatchIdx + subPat.length), pa, idx + 1);
  else
    return false;
}

// WARNING: cheated version with regexp
function isMatchCheating(s, p){
  p = '^' + p.replace(/\?/, '.')
    .replace(/\*+/g, '.*') + '$'; // compress multiple stars into one

  console.log("new pattern is: " + p);

  return s.search(p) > -1;
}

exports.isMatch = isMatch;
