module.exports = function(db, BasicDao) {
  var fields = [
		"titulo",
		"descricao",
		"ativa",
		"tipo",
		"porcentagem"
	];

  return new BasicDao({tableName: "cortesias", fieldNames: fields, db: db});
};
