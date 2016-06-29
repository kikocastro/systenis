module.exports = function(db, BasicDao) {
  var fields = [
    "nome",
    "sobrenome",
    "telefone",
    "sexo",
    "email",
    "cpf",
    "rg",
    "password",
    "carteira_de_trabalho",
    "data_de_nascimento",
    "data_de_inicio_do_contrato",
    "data_de_fim_do_contrato",
    "papel"
  ];

  return new BasicDao({tableName: "funcionarios", fieldNames: fields, db: db});
};