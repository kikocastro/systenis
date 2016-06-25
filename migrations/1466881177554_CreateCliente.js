exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "nome VARCHAR(40) NOT NULL",
    "sobrenome VARCHAR(40) NOT NULL",
    "telefone VARCHAR(40)",
    "sexo VARCHAR(40)",
    "email VARCHAR(80) NOT NULL UNIQUE",
    "cpf VARCHAR(20) NOT NULL UNIQUE",
    "rg VARCHAR(20) UNIQUE",
    "password CHAR(60) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS clientes(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE clientes');
};
