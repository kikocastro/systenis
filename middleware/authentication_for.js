module.exports = function(conf) {

  return function(modelName) {
    var Model = conf.models[modelName];

    return function(cb) {
      return function(req, res, next) {
        var session = req.session;

        if (session.isLogged) {
          Model.find(session.userId).then(function(user) {
            user.permissions = getPermissions(user.papel);
            console.log('** athentication for middleware', user);
            req.currentUser = user;
            return cb(req, res, next);
          }, function() {
            return res.redirect("/" + modelName.toLowerCase() + "/sessions/new");
          }).catch(function(err) {
            next(err);
          });
        } else {
          return res.redirect("/" + modelName.toLowerCase() + "/sessions/new");
        }
      };
    }

    ///////////

    function getPermissions(papel) {
      var permissions = {
        admin: ['produtos', 'pedidos', 'status_de_pedido', 'funcionarios', 'clientes', 'devolucoes', 'relatorios', 'cortesias', 'listar_alertas', 'listar_alertas', 'cancelar_compra', 'devolucao', 'usuarios'],
        comercial: ['status_de_pedido', 'cancelar_compra', 'devolucao', 'produtos'],
        saida: ['status_de_pedido', 'listar_alertas'],
        supervisor_de_saida: ['status_de_pedido', 'listar_alertas', 'listar_alertas']
      };

      return permissions[papel];
    }
  }
};
