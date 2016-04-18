//  TODO
//  shouldHaveContent
//  shouldHaveClass

'use strict';

var colors  = require('colors');

var dataUtility = require('./data_utility');

var TestBase = function(dataDom){
  loadData(dataDom);
}

// REFACTOR
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


// REFACTOR
TestBase.prototype.tag = function(name) {
  var object = {data: dataUtility.searchOnData(name, TestBase.prototype.dataDom)};

  object.includeOn =  function(parent) {
    TestBase.prototype.totalCount += 1;
    if (object.data[0] != null) {
      var incluidTags = includeOn(object.data, parent);

      if (incluidTags.length > 0) {
        TestBase.prototype.successCount += 1;
        console.log("- The %s is included on the %s \n".green, name, parent);
      } else {
        TestBase.prototype.errorCount += 1;
        console.log("- The %s is not included on the %s \n".red, name, parent);
      }
    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- Dose not exist %s and %s \n".red, name, parent)
    }

    return incluidTags;
  }

  object.notIncludeOn =  function(parent) {
    TestBase.prototype.totalCount += 1;

    if (object.data[0] != null) {
      var incluidTags = includeOn(object.data, parent);

      if (!(incluidTags.length > 0)) {
          TestBase.prototype.successCount += 1;
          console.log("- The %s is not included on the %s \n".green, name, parent);
        } else {
          TestBase.prototype.errorCount += 1;
          console.log("- The %s is included on the %s \n".red, name, parent);
        }
    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- Dose not exist %s and %s \n".red, name, parent)
    }

    return incluidTags;
  }

  object.shouldContain = function(num, tag) {
    TestBase.prototype.totalCount += 1;

    if (object.data[0] != null) {
      var childrens = dataUtility.searchOnData(tag, object.data[0].children);

      if (childrens.length == 0) {
        TestBase.prototype.errorCount += 1;
        console.log("- Dose not contain and expected %d %s \n".red, num, tag);
      }  else if (num == childrens.length) {
        TestBase.prototype.successCount += 1;
        console.log("- Contain %d of %d \n".green, childrens.length, num);
      } else {
        TestBase.prototype.errorCount += 1;
        console.log("- Contain %d and expected %d \n".red, childrens.length, num);
      }

      return {coun: childrens.length,
              childrens: childrens,
              tag: tag,
              expectedNumber: num }
    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- %s dose not exist \n".red, name)
    }
  }

  object.shouldHaveAttributes = function(attr) {
    TestBase.prototype.totalCount += 1;

    var attrContent;

    if (object.data[0] != null) {
      var objectAttr = object.data[0].attribs;
      attrContent = objectAttr[attr];

      if (attrContent != null) {
        TestBase.prototype.successCount += 1;
        console.log("- The %s contain an  attribute %s\n".green, name, attr);
      } else {
        TestBase.prototype.successCount += 1;
        console.log("- The %s not contain an attribute %s\n".green, name, attr);
      }

    } else {
      TestBase.prototype.errorCount += 1;
      console.log("- %s dose not exist \n".red, name)
    }

    return {withValue: function(value) {

      TestBase.prototype.totalCount += 1;

      var isValue = equals(value, attrContent);

      if (isValue) {
        TestBase.prototype.successCount += 1;
        console.log("- %s is equal to %s\n".green, value, attrContent);
      } else {
        TestBase.prototype.errorCount += 1;
        console.log("- %s is not equal to %s\n".red, value, attrContent);
      }

    }}

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

function equals(a, b) {
  return a == b;
}