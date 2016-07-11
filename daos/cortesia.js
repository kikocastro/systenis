module.exports = function(db, BasicDao) {
  var fields = [
		"titulo",
		"descricao",
		"ativa",
	];

  return new BasicDao({tableName: "cortesias", fieldNames: fields, db: db});
};
