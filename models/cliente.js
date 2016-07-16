var q = require("q");
var _ = require("lodash");

module.exports = function(daos, BasicModel, models) {
  var clienteDao = daos.Cliente;
  var Cliente = new BasicModel(clienteDao);
  
  Cliente.prototype.setCarrinho = function() {
    var self = this;
    var Carrinho = models().Carrinho;
    var Item = models().Item;

    console.log("setting carrinho");
    
    return Carrinho.where({cliente_id: self.id})
    .then(function(carrinho) {
      var carrinho = _.first(carrinho);

      self.carrinho = carrinho || {};

      return Item.where({carrinho_id: carrinho.id});
    })
    .then(function(itens) {

      if(!itens) {
        itens = [];
      }

      self.carrinho.itens = itens;
      self.carrinho.totalItens = _.sum(_.map(itens, 'quantidade'));

      return self;
    });
  };

  Cliente.prototype.setEnderecos = function() {
    var self = this;
    var Endereco = models().Endereco;
    
    return Endereco.where({cliente_id: self.id})
      .then(function(enderecos) {
        return _.merge(self, {enderecos: enderecos});
      });
  };

  return Cliente;
};
