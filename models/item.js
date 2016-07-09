var q = require("q");

module.exports = function(daos, BasicModel) {
  var itemDao = daos.Item;
  var Item = new BasicModel(itemDao);

  return Item;
};
