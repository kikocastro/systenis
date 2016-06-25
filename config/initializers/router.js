module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var AuthenticationAdmin = conf.middleware.AuthenticationFor("Admin");
  var AuthenticationCliente = conf.middleware.AuthenticationFor("Cliente");

  app.get("/", controllers.Public.index);
  app.get("/internal", controllers.Public.internal);

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


};
