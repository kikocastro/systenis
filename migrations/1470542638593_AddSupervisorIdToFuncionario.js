exports.up = function(pgm) {
  pgm.sql('ALTER TABLE funcionarios ADD COLUMN funcionario_id INT references funcionarios(id);');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE funcionarios DROP COLUMN funcionario_id;');
};
