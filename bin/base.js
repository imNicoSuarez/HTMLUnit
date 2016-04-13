var BaseObject = function(tag){
  this.name = tag.name;
  this.type = tag.type;
  this.attribs = tag.attribs;
  this.children = tag.children;
  this.parent = tag.parent;
}


module.exports = BaseObject;