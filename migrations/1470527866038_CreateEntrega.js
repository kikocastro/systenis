exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "pedido_id INT references pedidos(id) NOT NULL",
    "postado_em TIMESTAMP NOT NULL",
    "entregue_em TIMESTAMP"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS entregas(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE entregas');
};