var assert = require('assert'),
    numDecodings = require('../');


describe('basic cases', function(){
  var decodingWays = [
    {encoding: '1', numOfWays: 1},
    {encoding: '2', numOfWays: 1},
    {encoding: '9', numOfWays: 1},
    {encoding: '12', numOfWays: 2},
    {encoding: '32', numOfWays: 1},
    {encoding: '29', numOfWays: 1},
    {encoding: '25', numOfWays: 2},
  ];

  for(var code of decodingWays){
    it(`${code.encoding} -> ${code.numOfWays}`, function(){
      assert(numDecodings(code.encoding),
             code.numOfWays);
    });  
  }
});
