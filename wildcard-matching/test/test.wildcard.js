var assert = require('assert'),
    isMatch = require('..').isMatch;

describe('wildcard: ', function(){
  function verifier(str, pat, exp){
    it(`(${str}, ${pat}) -> ${exp}`, () => assert.strictEqual(isMatch(str, pat), exp));
  };

  describe('edge cases: ', function(){
    var tcases = [
      {str: "", pat: "", exp: true,},
      {str: "", pat: "*", exp: true,},
    ];

    tcases.forEach(tcase => verifier(tcase.str, tcase.pat, tcase.exp));
  });

  describe('from official samples: ', function(){
    var tcases = [
      {str: "aa", pat: "a", exp: false,},
      {str: "aa", pat: "aa", exp: true,},
      {str: "aaa", pat: "aa", exp: false,},
      {str: "aa", pat:  "*", exp: true,},
      {str: "aa", pat:  "a*", exp: true,},
      {str: "ab", pat:  "?*", exp: true,},
      {str: "aab", pat:  "c*a*b", exp: false,},
    ];

    tcases.forEach(tcase => verifier(tcase.str, tcase.pat, tcase.exp));
  });


  describe('complex cases: ', function(){
    var tcases = [
      {str: "aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba", pat: "a*******b",
       exp: false},

      // use regexp for this part is taking more than 10 secs
      {str: "abbabaaabbabbaabafbbabbbbbabbbabbbabaaaaababababbbabababaabbababaabbbbbbaaaabababbbaabbbbaabbbbababababbaabbaababaabbbababababbbbaaabbbbbabaaaabbababbbbaababaabbababbbbbababbbabaaaaaaaabbbbbaabaaababaaaabb",
       pat: "**aa*****ba*a*bb**aa*ab****a*aaaaaa***a*aaaa**bbabb*b*b**aaaaaaaaa*a********ba*bbb***a*ba*bb*bb**a*b*bb",
       exp: false}
    ];

    tcases.forEach(tcase => verifier(tcase.str, tcase.pat, tcase.exp));
  });
})
