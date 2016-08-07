module.exports = function(db, BasicDao) {
  var fields = [
    "pedido_id",
    "postado_em",
    "entregue_em"
  ];

  return new BasicDao({tableName: "entregas", fieldNames: fields, db: db});
};