exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "entrega_id INT references entregas(id) NOT NULL",
    "emissao TIMESTAMP  NOT NULL",
    "nome VARCHAR(100)  NOT NULL",
    "cpf VARCHAR(20) NOT NULL",
    "valor NUMERIC(5,2) NOT NULL",
    "descricao TEXT"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS notas(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE notas');
};