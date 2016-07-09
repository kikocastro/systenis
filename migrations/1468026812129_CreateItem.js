exports.up = function(pgm) {
  var fields = [
    "id SERIAL PRIMARY KEY",
    "carrinho_id INT references carrinhos(id)",
    "produto_id INT references produtos(id)"
  ];
  pgm.sql('CREATE TABLE IF NOT EXISTS itens(' + fields.join(", ") + ')');
};

exports.down = function(pgm) {
  pgm.sql('DROP TABLE itens');
};