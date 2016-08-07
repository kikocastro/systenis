exports.up = function(pgm) {
  pgm.sql('ALTER TABLE funcionarios ADD COLUMN supervisor_id INT references funcionarios(id);');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE funcionarios DROP COLUMN supervisor_id;');
};
