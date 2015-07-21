module.exports = function(conf) {
  var controllers = conf.controllers;
  var app = conf.app;
  var Authentication = conf.middleware.Authentication;

  app.get("/", controllers.Public.index);

  /*
  *
  * Cliente
  *
  */

  // Sign up
  app.get("/cliente/clientes/new", controllers.Cliente.Clientes.new);
  app.post("/cliente/clientes/create", controllers.Cliente.Clientes.create);

  //Sign in
  app.get("/cliente/sessions/new", controllers.Cliente.Sessions.new);
  app.post("/cliente/sessions", controllers.Cliente.Sessions.create);

  //Logoff
  app.get("/cliente/sessions/delete", controllers.Cliente.Sessions.delete);


  /*
  *
  * Admin
  *
  */

  // app.get("/admin/users/new", controllers.Users.new);
  app.get("/admin/sessions/new", controllers.Admin.Sessions.new);
  app.post("/admin/sessions/", controllers.Admin.Sessions.create);
  // app.post("admin/users/create", controllers.Users.create);
  // app.get("/admin/users", Authentication(controllers.Admin.Users.index));

  /*
  *
  * Gerente
  *
  */

  //Sign in
  app.get("/gerente/sessions/new", controllers.Gerente.Sessions.new);
  app.post("/gerente/sessions", controllers.Gerente.Sessions.create);

  //Logoff
  app.get("/gerente/sessions/delete", controllers.Gerente.Sessions.delete);

};
