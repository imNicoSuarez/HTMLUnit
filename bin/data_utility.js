'use strict';

// Require Libraries
var htmlparser = require("htmlparser2"),
    fs         = require('fs'),
    _          = require('lodash');


// Require Modules
var BaseObject = require('./base');



var DataUtility = {};

DataUtility.loadFile = function(files, callback) {

  for (var i = 0; i <  files.length; i++) {
    var file = files[i];
    var data = fs.readFileSync(file, 'utf8');

    parserFile(data, function(dataDom){
      callback(dataDom);
    });
  }

}

DataUtility.searchOnData = function(textSearch, data) {
  var result = []

  for (var i = 0; i < data.length; i++) {

    if (data[i].name == textSearch) {
       result.push(data[i]);
    }

    if (data[i].children.length > 0) {
      result.push(DataUtility.searchOnData(textSearch, data[i].children));
    }
  }

  return _.flattenDeep(result);
}



module.exports = DataUtility;


/* ---- Private Method ---- */

// Pareser File
function parserFile(file, callback) {
  var handler = new htmlparser.DomHandler(function (error, dom) {
    callback(dataFormatter(dom));
  });

  var parser = new htmlparser.Parser(handler);
  parser.write(file);
  parser.done();
}


// Data formatter.
function dataFormatter(dom, parent){
  var tags = [];

  for (var i = 0; i < dom.length; i++) {
    var object = dom[i]
    if (object.type == 'tag') {
      tags.push(new BaseObject({type: object.type,
                 name: object.name,
                 attribs:  object.attribs,
                 children: dataFormatter(object.children, object.name),
                 parent: parent || null
               }));
    }
  }

  return tags;
}