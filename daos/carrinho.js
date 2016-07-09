module.exports = function(db, BasicDao) {
  var fields = [
		"cliente_id"
	];

  return new BasicDao({tableName: "carrinhos", fieldNames: fields, db: db});
};