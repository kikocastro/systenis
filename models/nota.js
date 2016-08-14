var q = require("q");

module.exports = function(daos, BasicModel) {
  var notaDao = daos.Nota;
  var Nota = new BasicModel(notaDao);

  return Nota;
};
