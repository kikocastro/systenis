exports.up = function(pgm) {
  var trigger = "CREATE TRIGGER create_carrinho AFTER INSERT ON CLIENTES " +
                "FOR EACH ROW EXECUTE PROCEDURE create_carrinho_for_new_cliente();";

  var procedure = "CREATE OR REPLACE FUNCTION create_carrinho_for_new_cliente() RETURNS TRIGGER AS $example_table$ " +
                  "BEGIN " +
                  "INSERT INTO CARRINHOS(CLIENTE_ID) VALUES (new.ID); " +
                  "RETURN NEW; " +
                  "END; " +
                  "$example_table$ LANGUAGE plpgsql;";

  pgm.sql(procedure);
  pgm.sql(trigger);

};

exports.down = function(pgm) {

};
