exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "funcionario_id INT references funcionarios(id)",
    "endereco_id INT references enderecos(id)",
    "status varchar(50) NOT NULL",
    "valor_total NUMERIC(5,2)",
    "entrega_parcial boolean"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS pedidos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE pedidos');
};