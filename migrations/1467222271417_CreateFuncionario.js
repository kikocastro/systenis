exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "nome VARCHAR(100) NOT NULL",
    "sobrenome VARCHAR(100) NOT NULL",
    "telefone VARCHAR(40)",
    "sexo VARCHAR(40)",
    "email VARCHAR(80) NOT NULL UNIQUE",
    "cpf VARCHAR(20) NOT NULL UNIQUE",
    "rg VARCHAR(20) UNIQUE",
    "password CHAR(60) NOT NULL",
    "carteira_de_trabalho VARCHAR(20) NOT NULL UNIQUE",
    "data_de_nascimento TIMESTAMP",
    "data_de_inicio_do_contrato TIMESTAMP",
    "data_de_fim_do_contrato TIMESTAMP",
    "papel VARCHAR(20) UNIQUE"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS funcionarios(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE funcionarios');
};