var path = require("path");

module.exports = function(app) {
  var conf = {
    appDir: path.join(__dirname, ".."),
    app: app,
    DAO: {}
  };

  console.log("Initializing the DB");
  return require(path.join(__dirname, "initializers", "db"))(conf)
    .then(function(Db) {
      conf.Db = Db;

      console.log("Initializing DAOS");
      return require(path.join(__dirname, "initializers", "daos"))(conf);
    })
    .then(function(dao) {
      conf.DAO = dao;

      console.log("Initializing models");
      return require(path.join(__dirname, "initializers", "models"))(conf);
    })
    .then(function(models) {
      conf.models = models;

      console.log("Initializing services");
      return require(path.join(__dirname, "initializers", "services"))(conf);
    })
    .then(function(services) {
      // console.log(services);
      conf.services = services;

      console.log("Initializing controllers");
      return require(path.join(__dirname, "initializers", "controllers"))(conf);
    })
    .then(function(controllers) {
      conf.controllers = controllers;

      console.log("Initializing middleware");
      return require(path.join(__dirname, "initializers", "middleware"))(conf);
    })
    .then(function(middleware) {
      conf.middleware = middleware;

      console.log("Initializing the router");
      return require(path.join(__dirname, "initializers", "router"))(conf);
    });
};
