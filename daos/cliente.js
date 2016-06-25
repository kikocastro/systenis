module.exports = function(db, BasicDao) {
  var fields = [
		"nome",
		"sobrenome",
		"telefone",
		"sexo",
		"email",
		"cpf",
		"rg",
		"password"
	];

  return new BasicDao({tableName: "clientes", fieldNames: fields, db: db});
};
