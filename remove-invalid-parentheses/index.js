// https://leetcode.com/problems/remove-invalid-parentheses/

// Theorem1: when index is 0, the current parens are balanced.
//
// Theorem2: the abs val of the index is the minimum number of invalid
// parenthesizes. (Easily proved by Theorem1)

// left paren: 1, right: -1, the total sum is the index
//
// @pa: parens array
function calculateInBalanceIndex(pa){
  return pa.reduce(function(index, p){
    switch(p){
    case '(':
      return index + 1;
    case ')':
      return index - 1;
    default:
      // simply ignore
      return index;
      // throw new Error(p +" should NOT occur!")
    }
  }, 0);
}

// create a more compact format, other than pa

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  var pa = s.split(''),
      paLen = pa.length,
      index = calculateInBalanceIndex(pa),
      removeNum = index < 0 ? (-index) : index,
      reversedp = false;
      res = [];

  // if (index === 0)
  //   return [s];

  // convert the case where RParens are more thna LParens
  if (index > 0){
    pa.reverse();
    pa = pa.map(paren => {
      if(paren === '(')
        return ')';
      else
        return '(';
    });

    reversedp = true;
  }

  res = removeInvalidParenthesesInternal(0, pa, 0, removeNum);

  if (reversedp){
    res = res.map(sol => {
      return sol.split('').reverse().map(paren => {
        if(paren === '(')
          return ')';
        else
          return '(';
      }).join('');
    });
  }

  
  // adjust output format
  if (res.length === 0){
    res = [''];
  }

  return res;
};

function removeInvalidParenthesesInternal(startIdx, pa, curIndex, removeNum){
  var res = [];

  // end condition
  if (removeNum === 0){
    if ((curIndex + calculateInBalanceIndex(pa.slice(startIdx))) === 0){
      debugger;
      
      // make sure at each position index is non-negative
      for(var i = startIdx; i < pa.length; i++){
        if(pa[i] === '('){
          curIndex++;
        }
        else
          curIndex--;

        if (curIndex < 0)
          return res;
      }

      return [pa.slice(startIdx).join('')];
    }
    else
      return res;
  }
  else if (startIdx >= pa.length)
    return res;

  var begRParenGroup = pa.indexOf(')', startIdx);
      

  if (begRParenGroup === -1)
    return res;

  var endRParenGroup = pa.indexOf('(', begRParenGroup);
  endRParenGroup = endRParenGroup > -1 ? endRParenGroup : pa.length;

  var totalRParenGroup = endRParenGroup - begRParenGroup,
      totalLParenGroup = begRParenGroup - startIdx,
      minRParen2Remove = null, maxRParen2Remove;

  // update curIndex to the begRParenGroup (not inclusive)
  curIndex = curIndex + totalLParenGroup;

  // after taking in all right parens the index can't be smaller than 0
  minRParen2Remove = curIndex - totalRParenGroup > 0 ? 0 : totalRParenGroup - curIndex;
  maxRParen2Remove = Math.min(removeNum, totalRParenGroup);

  if (maxRParen2Remove < minRParen2Remove)
    return res;

  // i is the idx into pa
  //
  // remove all right parens starting from begRParenGroup up to (NOT inclusive)
  // i, so the initial point and end boundary are all inclusive
  for (var i = begRParenGroup + minRParen2Remove; i <= begRParenGroup + maxRParen2Remove; i++){
    var chosenPart = pa.slice(startIdx, begRParenGroup).join('')
          + pa.slice(i, endRParenGroup).join('');

    res = res.concat(
      removeInvalidParenthesesInternal(
        endRParenGroup, pa,
        curIndex - (endRParenGroup - i),
        removeNum - (i - begRParenGroup)
      ).map(retRes => chosenPart + retRes)
    );
  }

  return res;
}

module.exports.calculateInBalanceIndex = calculateInBalanceIndex;
module.exports.removeInvalidParentheses = removeInvalidParentheses;
