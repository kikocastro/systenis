module.exports = function(models) {
  var Client = models.Client;

  return {
    index: function(scope) {
      scope.currentUser = scope.session.currentUser;
    },
    show: function(scope) {
    }

  };

};
