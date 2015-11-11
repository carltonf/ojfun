var assert = require('assert');
var removeInvalidParentheses = require('../').removeInvalidParentheses;

describe('removeInvalidParentheses: ', function(){
  function parenStrVerifier(parens){
    parens.forEach(pr => {
      it(`${pr.str} -> ${pr.result.length} way(s)`, function(){
        assert.deepStrictEqual(removeInvalidParentheses( pr.str ),
                               pr.result);
      });
    });
  }

  describe('normal valid should return itself', function(){
    var parens = [
      {str: '', result: ['']},
      {str: 'n', result: ['n']},
      {str: '()', result: ['()']},
    ];

    parenStrVerifier( parens );
  });

  describe('no resolution', function(){
    var parens = [
      {str: '(', result: ['']},
      {str: '))', result: ['']},
      {str: ')(', result: ['']},
    ];

    parenStrVerifier( parens );
  });

  //
  // the other case can be considered as this one's reverse
  describe('right parens are more than left parens', function(){
    var parens = [
      {str: '())', result: ['()']},
    ];
    debugger;

    parenStrVerifier( parens );
  });

  describe('|index| is 1', function(){});

});
