exports.up = function(pgm) {
  pgm.sql('ALTER TABLE itens ADD COLUMN pedido_id INT references pedidos(id);');
};

exports.down = function(pgm) {
  pgm.sql('ALTER TABLE itens DROP COLUMN pedido_id;');
};
