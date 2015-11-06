var assert = require('assert'),
    numDecodings = require('../');


describe('basic cases', function(){
  var decodingWays = [
    {encoding: '', numOfWays: 0},
    {encoding: '1', numOfWays: 1},
    {encoding: '2', numOfWays: 1},
    {encoding: '9', numOfWays: 1},
    {encoding: '12', numOfWays: 2},
    {encoding: '32', numOfWays: 1},
    {encoding: '29', numOfWays: 1},
    {encoding: '25', numOfWays: 2},
  ];

  decodingWays.forEach(function(code){
    it(`${code.encoding} -> ${code.numOfWays}`, function(){
      assert.strictEqual(numDecodings(code.encoding),
                         code.numOfWays);
    });  
  });
});
