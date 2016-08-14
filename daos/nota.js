module.exports = function(db, BasicDao) {
  var fields = [
    "entrega_id",
    "emissao",
    "nome",
    "cpf",
    "valor",
    "descricao"
  ];

  return new BasicDao({tableName: "notas", fieldNames: fields, db: db});
};