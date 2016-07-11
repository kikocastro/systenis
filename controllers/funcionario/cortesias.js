var _ = require("lodash");

module.exports = function(models) {
  var Cortesia = models.Cortesia;

  return {
    index: function(scope) {
      return Cortesia.all().then(function(cortesias) {
        scope.cortesias = cortesias;
      });
    },
    activate: function(req, res, next) {
      var cortesiaId = req.params.id;

      return Cortesia.find(cortesiaId)
        .then(function(cortesia) {
          if(cortesia[ativa] == true) {
            cortesia[ativa] = false; 
          }
          else {
            cortesia[ativa] = true;
          }
          return cortesia.save();
        })
        .then(function(cortesia) {
          res.redirect("/intranet/cortesias/" + cortesia.id);
        });
    },
    show: function(scope) {
      var cortesiaId = scope.params.id;

      return Cortesia.find(cortesiaId).then(function(cortesia) {
        scope.cortesia = cortesia;
      });
    }
  };
};
