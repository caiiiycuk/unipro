var fs = require('fs');

exports.readSymbols = function(file, success, error) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) error(err);
    
    var symbolsmap = {};
    var lines = data.split("\n");

    for (var i = 0; i < lines.length; ++i) {
      var tuple = lines[i].split(':');
      var symbol = tuple[0];
      var name = tuple[1];
      symbolsmap[symbol] = name;
    }

    success(symbolsmap)
  });
};