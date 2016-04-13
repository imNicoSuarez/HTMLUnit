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
    console.log("- The %s is included on the dom \n".green, name);
  } else {
    TestBase.prototype.errorCount += 1;
    console.log("- The %s is not included on the dom \n".red, name);
  }
}

TestBase.prototype.tag = function(name) {
  var object = {data: dataUtility.searchOnData(name, TestBase.prototype.dataDom)};

  object.includeOn =  function(parent) {
    var incluidTags = includeOn(object.data, parent);
    TestBase.prototype.totalCount += 1;

    if (incluidTags.length > 0) {
      TestBase.prototype.successCount += 1;
      console.log("- The %s is included on the %s \n".green, name, parent);
    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- The %s is not included on the %s \n".red, name, parent);
    }
  }

  object.notIncludeOn =  function(parent) {
    var incluidTags = includeOn(object.data, parent);
    TestBase.prototype.totalCount += 1;

    if (!(incluidTags.length > 0)) {
      TestBase.prototype.successCount += 1;
      console.log("- The %s is not included on the %s \n".green, name, parent);
    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- The %s is included on the %s \n".red, name, parent);
    }
  }

  return object;
}







module.exports = TestBase;


/* ---- Private Method ---- */


function includeOn(data, parent){
  var result = [];

  for (var i = 0; i < data.length; i++) {
    var tag = data[i];

    if (tag.parent == parent) {
      result.push(tag);
    }
  }

  return result;
}

function loadData(dataDom) {
  TestBase.prototype.dataDom  = dataDom;
  TestBase.prototype.totalCount = 0;
  TestBase.prototype.successCount = 0;
  TestBase.prototype.errorCount = 0;
}