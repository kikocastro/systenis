exports.up = function(pgm) {
  var fields = [
  	"id SERIAL primary key",
  	"cliente_id INT REFERENCES clientes(id) NOT NULL",
    "cep INT NOT NULL",
    "rua VARCHAR(200) NOT NULL",
    "numero INT NOT NULL",
    "complemento VARCHAR(30)",
    "cidade VARCHAR(30) NOT NULL",
    "estado VARCHAR(30) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS enderecos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE enderecos');
};