exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "nome VARCHAR(40) NOT NULL",
    "sobrenome VARCHAR(40) NOT NULL",
    "password CHAR(60) NOT NULL",
    "email VARCHAR(80) NOT NULL UNIQUE",
    "cpf VARCHAR(20) NOT NULL UNIQUE",
    "rg VARCHAR(20) UNIQUE",
    "telefone VARCHAR(40)",
    "data_de_nascimento TIMESTAMP",
    "sexo VARCHAR(40)"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS clientes(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE clientes');
};