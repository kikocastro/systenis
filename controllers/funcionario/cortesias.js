var _ = require("lodash");

module.exports = function(models) {
  var Cortesia = models.Cortesia;
  var Produto = models.Produto;

  return {
    index: function(scope) {
      return Cortesia.all().then(function(cortesias) {
        scope.cortesias = cortesias;
      });
    },
    activate: function(req, res, next) {
      var cortesiaId = req.params.id;
      var temCortesiaAtiva = false;
      
       return Cortesia.where({ativa:true})
        .then(function(cortesias) {
          if(cortesias.length > 0) {
            temCortesiaAtiva = true;
          }
        })
        .then(function() {
          return Cortesia.find(cortesiaId)
        })
        .then(function(cortesia) {
          if(cortesia.ativa == false && temCortesiaAtiva == false) {
            cortesia.ativa = true; 
          }
          else {
            cortesia.ativa = false;
          }
          return cortesia.save();
        })
        .then(function(cortesia) {
          res.redirect("/intranet/cortesias/");
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
