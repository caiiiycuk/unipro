// u$n - Date.now
// u$e - storage:time start
// u$d - storage:time delta
// u$r - storage:return
// u$k - storage:stack
// u$t - timings:[total, self, count]
// u$l - timings:local

var readSymbols = require('./symbols.js').readSymbols;
var UglifyJS = require('uglify-js');
var fs = require('fs');

exports.transformjs = function(jsfile, outfile, symbolsfile, onsuccess) {
  if (!onsuccess) {
    onsuccess = function(contents) {
      fs.writeFile(outfile, contents, 'utf8', function(err) {
        if (err) throw err;
      });
    }
  }

  var transform = function(symbolsmap) {
    fs.readFile(jsfile, 'utf8', function(err, data) {
      if (err) throw err;

      var ast = UglifyJS.parse(data);

      var varDefenitions = UglifyJS.parse('var u$l = (u$t[u$f] = (u$t[u$f] || [0, 0, 0])), u$e = u$n(), u$d;').body[0].definitions;
      var pushZeroStack = UglifyJS.parse('u$k.push(0);').body[0];
      var deltaTime = UglifyJS.parse('u$d = u$n() - u$e;').body[0];
      var pushTimeStack = UglifyJS.parse('u$k[u$k.length - 2] += u$d;').body[0];
      var recordTotalTiming = UglifyJS.parse('u$l[0] += u$d;').body[0];
      var recordSelfTiming = UglifyJS.parse('u$l[1] += (u$d - u$k.pop());').body[0];
      var recordCount = UglifyJS.parse('u$l[2] += 1;').body[0];

      var uniprofTransformer = new UglifyJS.TreeTransformer(null, function(node) {
        if (node instanceof UglifyJS.AST_Defun) {
          var fullname = symbolsmap[node.name.name] || node.name.name;
          var vars = new UglifyJS.AST_Var({
            definitions: [
              new UglifyJS.AST_VarDef({
                name: new UglifyJS.AST_SymbolVar({
                  name: 'u$f'
                }),
                value: new UglifyJS.AST_String({
                  value: fullname
                })
              })
            ]
          });

          vars.definitions = vars.definitions.concat(varDefenitions);

          var returnTransformer = new UglifyJS.TreeTransformer(function(node, descend) {
            node = node.clone();
            if (node instanceof UglifyJS.AST_Return) {
              var value = node.value;
              if (value == null) {
                return new UglifyJS.AST_BlockStatement({
                  body: [deltaTime, pushTimeStack, recordTotalTiming, recordSelfTiming, recordCount, node]
                });
              }

              var reteval = new UglifyJS.AST_SimpleStatement({
                body: new UglifyJS.AST_Assign({
                  operator: '=',
                  left: new UglifyJS.AST_SymbolRef({
                    name: 'u$r'
                  }),
                  right: value
                })
              });

              var retexpr = new UglifyJS.AST_Return({
                value: new UglifyJS.AST_SymbolRef({
                  name: 'u$r'
                })
              });

              return new UglifyJS.AST_BlockStatement({
                body: [reteval, deltaTime, pushTimeStack, recordTotalTiming, recordSelfTiming, recordCount, retexpr]
              });
            }

            if (!(node instanceof UglifyJS.AST_Lambda)) {
              descend(node, this);
            }
            return node;
          });


          var lastReturn = node.body[node.body.length - 1] instanceof UglifyJS.AST_Return;
          for (var i = 0; i < node.body.length; ++i) {
            node.body[i] = node.body[i].transform(returnTransformer);
          }

          node.body.unshift(vars);
          node.body.unshift(pushZeroStack);

          if (!lastReturn) {
            node.body.push(deltaTime);
            node.body.push(pushTimeStack);
            node.body.push(recordTotalTiming);
            node.body.push(recordSelfTiming);
            node.body.push(recordCount);
          }
        }

        return node;
      });

      var transformed = ast.transform(uniprofTransformer);
      // var compressor = UglifyJS.Compressor({});
      // transformed.figure_out_scope();
      // transformed = transformed.transform(compressor);

      // transformed.figure_out_scope();
      // transformed.compute_char_frequency();
      // transformed.mangle_names();

      var contents = transformed.print_to_string();
      // var stream = UglifyJS.OutputStream({
      //   'beautify': true
      // });
      // transformed.print(stream);
      // var contents = stream.toString('UTF-8');

      onsuccess(contents);
    });
  };

  if (symbolsfile) {
    readSymbols(symbolsfile, function(symbolsmap) {
      transform(symbolsmap);
    }, function(error) {
      throw error;
    });
  } else {
    transform({});
  }

};