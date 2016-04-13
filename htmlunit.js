var argv = require('optimist').argv;

var HTMLUnit = require('./bin/core');

var htmlunit = new HTMLUnit(argv._)




htmlunit.stackOfTests('Testing on file test.html', function(test){
  test.include('div');
  test.include('body');
  test.include('html');
  test.include('footer');
  test.include('head');

  test.tag('html').notIncludeOn('body');
  test.tag('nav').includeOn('body');
});

