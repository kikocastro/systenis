var _ = require("lodash");

module.exports = function(models) {
  var Produto = models.Produto;

  return {
    index: function(scope) {
      return Produto.all().then(function(produtos) {
        scope.produtos = produtos;
      });
    },
    new: function(scope) {

    },
    edit: function(scope) {
      var produtoId = scope.params.id;

      return Produto.find(produtoId).then(function(produto) {

        scope.produto = produto;
      });
    },
    update: function(req, res) {
      var editedProduto = req.body.produto;
      var permittedParams = getPermittedParams();

      return Produto.find(editedProduto.id)
        .then(function(produto) {

          _.each(permittedParams, function(param) {
            produto[param] = editedProduto[param];
          });

          return produto.save();
        })
        .then(function(produto) {
          res.redirect("/intranet/produtos/" + produto.id);
        });
    },
    create: function(req, res, next) {
      var produto = req.body.produto;

      return Produto.create(produto).then(function(produto) {
        res.redirect("/intranet/produtos/" + produto.id);

      }, function(err) {
        next(err);
      });
    },
    show: function(scope) {
      var produtoId = scope.params.id;

      return Produto.find(produtoId).then(function(produto) {
        scope.produto = produto;
      });
    },
    destroy: function(req, res, next) {
      var produtoId = req.params.id;

      return Produto.find(produtoId)
        .then(function(produto) {
          return produto.delete();
        })
        .then(function(produto) {
          res.redirect("/intranet/produtos/");
        });
    }

  };

};

///////////////
// Helpers
///////////////

function getPermittedParams() {

  var permittedParams = [
    "nome",
    "cores",
    "fabricante",
    "peso",
    "quantidade_estoque",
    "tamanho",
    "preco",
    "imagem"
  ];

  return permittedParams;
}
