module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationCliente = conf.middleware.AuthenticationFor("Cliente");
  var AuthenticationFuncionario = conf.middleware.AuthenticationFor("Funcionario");

  app.get("/", controllers.Public.index);
  app.get("/produtos/:id", controllers.Public.show);

  ////////////////////
  // Cliente
  ////////////////////

  // Sign up
  app.get("/cliente/clientes/new", controllers.Cliente.Clientes.new);
  app.post("/cliente/clientes", controllers.Cliente.Clientes.create);

  //Sign in
  app.get("/cliente/sessions/new", controllers.Cliente.Sessions.new);
  app.post("/cliente/sessions", controllers.Cliente.Sessions.create);

  //Logoff
  app.get("/cliente/sessions/delete", controllers.Cliente.Sessions.delete);

  // carrinho
  app.get("/cliente/carrinho", AuthenticationCliente(controllers.Cliente.Carrinho.show));
  app.post("/cliente/carrinho/create", AuthenticationCliente(controllers.Cliente.Carrinho.create));
  app.post("/cliente/carrinho/update", AuthenticationCliente(controllers.Cliente.Carrinho.update));
  
  // item
  app.post("/cliente/itens/:id/update", AuthenticationCliente(controllers.Cliente.Item.update));
  app.get("/cliente/itens/:id/delete", AuthenticationCliente(controllers.Cliente.Item.destroy));
  
  ////////////////////
  // Funcionario
  ////////////////////

  //Sign in
  app.get("/intranet", controllers.Funcionario.Sessions.new);
  app.post("/funcionario/sessions", controllers.Funcionario.Sessions.create);

  // Logoff
  app.get("/funcionario/sessions/delete", controllers.Funcionario.Sessions.delete);

  // Intranet

  // clientes
  app.get("/intranet/clientes", AuthenticationFuncionario(controllers.Funcionario.Clientes.index));
  app.post("/intranet/clientes", AuthenticationFuncionario(controllers.Funcionario.Clientes.create));
  app.get("/intranet/clientes/new", AuthenticationFuncionario(controllers.Funcionario.Clientes.new));
  app.get("/intranet/clientes/:id", AuthenticationFuncionario(controllers.Funcionario.Clientes.show));
  app.post("/intranet/clientes/:id", AuthenticationFuncionario(controllers.Funcionario.Clientes.update));
  app.get("/intranet/clientes/:id/edit", AuthenticationFuncionario(controllers.Funcionario.Clientes.edit));
  app.get("/intranet/clientes/:id/delete", AuthenticationFuncionario(controllers.Funcionario.Clientes.destroy));

  // produtos
  app.get("/intranet/produtos", AuthenticationFuncionario(controllers.Funcionario.Produtos.index));
  app.post("/intranet/produtos", AuthenticationFuncionario(controllers.Funcionario.Produtos.create));
  app.get("/intranet/produtos/new", AuthenticationFuncionario(controllers.Funcionario.Produtos.new));
  app.get("/intranet/produtos/:id", AuthenticationFuncionario(controllers.Funcionario.Produtos.show));
  app.post("/intranet/produtos/:id", AuthenticationFuncionario(controllers.Funcionario.Produtos.update));
  app.get("/intranet/produtos/:id/edit", AuthenticationFuncionario(controllers.Funcionario.Produtos.edit));
  app.get("/intranet/produtos/:id/delete", AuthenticationFuncionario(controllers.Funcionario.Produtos.destroy));

};
