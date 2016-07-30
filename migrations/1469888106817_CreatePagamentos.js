exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "pedido_id INT references pedidos(id) NOT NULL",
    "forma varchar(50) NOT NULL",
    "parcelas INT NOT NULL",
    "criado_em TIMESTAMP NOT NULL",
    "confirmado_em TIMESTAMP"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS pagamentos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE pagamentos');
};