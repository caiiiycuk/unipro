#!/usr/bin/env node

if (process.argv.length < 3) {
  console.log('Usage: uniprof <js-file> [out-js-file] [symbols-file]');
  console.log('');
  console.log('       js-file - script for profiling');
  console.log('       out-js-file - script that ready for profiling (if omitted than will be same as js-file)');
  console.log('       symobls-file - file to map function names (format: ');
  console.log('');
  console.log('           shortname1:fullname1');
  console.log('           shortname2:fullname2');
  console.log('           ...');
  return -1;
}

var jsfile = process.argv[2];
var outfile = (process.argv[3] || jsfile);
var symbolsfile = process.argv[4];

console.log('Processing ' + jsfile + ' -> ' + outfile + (symbolsfile ? ' (symbols: ' + symbolsfile + ')' : ''));

require('./lib/transform.js').transformjs(jsfile, outfile, symbolsfile);