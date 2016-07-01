module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationCliente = conf.middleware.AuthenticationFor("Cliente");
  var AuthenticationFuncionario = conf.middleware.AuthenticationFor("Funcionario");

  app.get("/", controllers.Public.index);
  app.get("/produtos/:id", controllers.Public.show);

  // carrinho
  app.get("/carrinho", controllers.Public.carrinho);
  app.post("/carrinho/update/:produto_id", controllers.Public.updateCarrinho);

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


};
