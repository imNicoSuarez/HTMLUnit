'use strict';

var colors  = require('colors');

var dataUtility = require('./data_utility');

var TestBase = function(dataDom){
  loadData(dataDom);
}


TestBase.prototype.include = function(name) {
  var result = dataUtility.searchOnData(name, TestBase.prototype.dataDom);
  TestBase.prototype.totalCount += 1;

  if (result.length > 0) {
    TestBase.prototype.successCount += 1;
    console.log("- The %s is included in the dom \n".green, name);
  } else {
    TestBase.prototype.errorCount += 1;
    console.log("- The %s is not included in the dom \n".red, name);
  }
}


module.exports = TestBase;


/* ---- Private Method ---- */

function loadData(dataDom) {
  TestBase.prototype.dataDom  = dataDom;
  TestBase.prototype.totalCount = 0;
  TestBase.prototype.successCount = 0;
  TestBase.prototype.errorCount = 0;
}