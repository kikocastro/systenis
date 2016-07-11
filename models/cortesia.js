var q = require("q");

module.exports = function(daos, BasicModel) {
  var cortesiaDao = daos.Cortesia;
  var Cortesia = new BasicModel(cortesiaDao);

  return Cortesia;
};
