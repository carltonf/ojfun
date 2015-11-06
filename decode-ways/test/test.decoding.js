var assert = require('assert'),
    numDecodings = require('../');

function verifyDecodingWays(code){
  it(`${code.encoding} -> ${code.numOfWays}`, function(){
    assert.strictEqual(numDecodings(code.encoding),
                       code.numOfWays,
                       code.msg || '');
  })
}

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

  decodingWays.forEach(verifyDecodingWays);
});

describe('complex cases', function(){
  var decodingWays = [
    {encoding: "4673351343232714528787622144828949686814115978657763689251918941228645575658338815495647817194659970",
     numOfWays: 0,
     msg: "Complex and long, test for time efficiency, the ending is 70, so a invalid encoding."},
    {encoding: "4673351343232714528787622144828949686814115978657763689251918941228645575658338815495647817194659305",
     numOfWays: 0},
  ];

  decodingWays.forEach(verifyDecodingWays);
})

describe('handling zeros', function(){
  var decodingWays = [
    {encoding: '0', numOfWays: 0},
    {encoding: '10', numOfWays: 1},
    {encoding: '01', numOfWays: 0},
    {encoding: '00', numOfWays: 0},
    {encoding: '100', numOfWays: 0},
    {encoding: '101', numOfWays: 1},
    {encoding: '110', numOfWays: 1},
  ];

  decodingWays.forEach(verifyDecodingWays);
})
