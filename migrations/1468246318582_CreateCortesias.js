exports.up = function(pgm) {
  var fields = [
  	"id SERIAL primary key",
  	"titulo VARCHAR(255) NOT NULL UNIQUE",
    "descricao VARCHAR(255) NOT NULL",
    "ativa BOOLEAN NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS cortesias(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE cortesias');
};
