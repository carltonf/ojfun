var assert = require('assert');
var calculateInBalanceIndex = require('../').calculateInBalanceIndex;

describe('calculateInBalanceIndex: ', function(){
  // default the index to 0
  function parenIndexesVerifier(pi){
    pi.forEach(parenIdx => {
      it(`${parenIdx.parens} -> ${parenIdx.index}`, function(){
        assert.strictEqual(calculateInBalanceIndex( parenIdx.parens.split('') ),
                           parenIdx.index || 0);
      });
    })
  }

  describe('return 0 for balanced', function(){
    var parenIndexes = [
      {parens: ''},
      {parens: '()'},
      {parens: '()()'},
      {parens: '(())'},
    ];
    parenIndexesVerifier( parenIndexes );
  });

  describe('left more than right parens', function(){
    var parenIndexes = [
      {parens: '(()', index: 1},
      {parens: '(', index: 1},
      {parens: '(((', index: 3},
      {parens: '((()(', index: 3},
    ];

    parenIndexesVerifier( parenIndexes );
  });

  describe('right more than left parens', function(){
    var parenIndexes = [
      {parens: ')', index: -1},
      {parens: '()))', index: -2},
      {parens: '))', index: -2},
      {parens: ')())', index: -2},
    ];

    parenIndexesVerifier( parenIndexes );
  });
});
