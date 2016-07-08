exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "cliente_id INT references clientes(id) NOT NULL"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS carrinhos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE carrinhos');
};