module.exports = function(db, BasicDao) {
  var fields = [
		"nome",
		"sobrenome",
		"password",
		"email",
		"cpf",
		"rg",
		"telefone",
		"data_de_nascimento",
		"sexo"
	];

  return new BasicDao({tableName: "clientes", fieldNames: fields, db: db});
};