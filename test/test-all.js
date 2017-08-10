var fs = require('fs');
var transformjs = require('../lib/transform.js').transformjs;

transformjs({
  'jsfile': './test/case1.js',
  'beautify': true,
  'callback': function(contents) {
    var expected = fs.readFileSync('./test/case1.out.js');
    if (contents == expected) {
      console.log('Case 1: Ok');
    } else {
      console.log('Case 1: Fail');
      console.log('Contents:');
      console.log(contents);
    }
  }
});