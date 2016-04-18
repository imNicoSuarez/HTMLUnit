'use strict';

// Require Libraries
var colors  = require('colors');

// Require Modules
var dataUtility = require('./data_utility'),
    TestBase = require('./test_base');


var HTMLUnit = function(files){
  this.htmlData = []

  dataUtility.loadFile(files, function(dataDom){
    HTMLUnit.prototype.htmlData =  dataDom;
  });

};

HTMLUnit.prototype.stackOfTests = function(desciption, callback) {

  if (typeof desciption !== 'undefined')
    console.log("\n\n %s \n", desciption);

  var test = new TestBase(HTMLUnit.prototype.htmlData)

  callback(test);

  console.log("\n\n Finished %d tests were run, " +
              "%d successful".green + ' and ' +
              "%d failed".red, test.totalCount, test.successCount, test.errorCount);
}


module.exports = function(files) { return new HTMLUnit(files) }