exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "funcionario_id INT references funcionarios(id)",
    "endereco_id INT references enderecos(id) NOT NULL",
    "cliente_id INT references clientes(id)",
    "cortesia_id INT references cortesias(id)",
    "status varchar(50) NOT NULL",
    "valor_total NUMERIC(20,2)",
    "frete NUMERIC(20,2)",
    "entrega_parcial boolean"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS pedidos(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE pedidos');
};