// https://leetcode.com/problems/remove-invalid-parentheses/

// Theorem1: the current parens string is balanced iff the overall score is 0
// and the score of every substr(0, l) is positive.
//
// Theorem2: the abs val of the score is the minimum number of invalid
// parenthesizes. (Easily proved by Theorem1)

// left paren: 1, right: -1, the total sum is the index
//
// @pa: parens array
function calculateScore(s){
  var score = 0;

  for(var c of s){
    switch(c){
    case '(':
      score++;
      break;
    case ')':
      score--;
      break;
    default:
      ; // simply ignore any other chars
    }
  }

  return score;
}

function reverseParenStr(s){
  var res = '';

  s = s.split('').reverse().join('');
  for(var c of s){
    switch(c){
    case '(':
      res += ')';
      break;
    case ')':
      res += '(';
      break;
    default:
      res += c
    }
  }

  return res;
}

/**
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function(s) {
  var score = calculateScore(s),
      removeNum = score < 0 ? (- score) : score,
      reversedp = false;
      res = [];

  // convert the case where RParens are more than LParens
  if (score > 0){
    s = reverseParenStr(s);
    reversedp = true;
  }

  res = removeInvalidParenthesesInternal(0, s, 0, removeNum);

  if (reversedp){
    res = res.map(sol => reverseParenStr(sol));
  }
  
  // adjust output format
  if (res.length === 0){
    res = [''];
  }

  return res;
};

function removeInvalidParenthesesInternal(startIdx, s, curScore, removeNum){
  var res = [];

  // end condition
  if (removeNum === 0){
    if ((curIndex + calculateScore(pa.slice(startIdx))) === 0){
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

module.exports.calculateScore = calculateScore;
module.exports.reverseParenStr = reverseParenStr;
module.exports.removeInvalidParentheses = removeInvalidParentheses;
