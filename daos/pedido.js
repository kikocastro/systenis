module.exports = function(db, BasicDao) {
  var fields = [
    "funcionario_id",
    "endereco_id",
    "cliente_id",
    "status",
    "valor_total",
    "entrega_parcial"
  ];

  return new BasicDao({tableName: "pedidos", fieldNames: fields, db: db});
};