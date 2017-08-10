var fs = require('fs');
var transformjs = require('../lib/transform.js').transformjs;

var case1out = transformjs('./test/case1.js', null, null, function(contents) {
  var expected = fs.readFileSync('./test/case1.out.js');
  if (contents == expected) {
    console.log('Case 1: Ok');
  } else {
    console.log('Case 1: Fail');
  }
});