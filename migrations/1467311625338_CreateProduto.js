exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "nome VARCHAR(100) NOT NULL",
    "cores VARCHAR(50)",
    "fabricante VARCHAR(50) NOT NULL",
    "peso NUMERIC",
    "quantidade_estoque INTEGER NOT NULL",
    "tamanho INTEGER NOT NULL",
    "preco NUMERIC(5,2) NOT NULL",
    "imagem VARCHAR(255) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS produtos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE produtos');
};