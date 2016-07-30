module.exports = function(db, BasicDao) {
  var fields = [
    "pedido_id",
    "forma",
    "parcelas",
    "criado_em",
    "confirmado_em"
  ];

  return new BasicDao({tableName: "pagamentos", fieldNames: fields, db: db});
};