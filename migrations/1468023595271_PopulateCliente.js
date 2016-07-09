exports.up = function(pgm) {
  var cliente = {
    nome: "'John'",
    sobrenome: "'Snow'",
    telefone: "'12345678'",
    sexo: "'masculino'",
    email: "'john@systenis.com'",
    cpf: "'123123123-00'",
    rg: "'123123123'",
    telefone: "'12345678'",
    data_de_nascimento: "'1989-01-08'",
    password: "'123123'"
  };
  pgm.sql('INSERT INTO clientes (nome, sobrenome, telefone, sexo, email, cpf, rg, password) VALUES ({nome}, {sobrenome}, {telefone}, {sexo}, {email}, {cpf}, {rg}, {password});', cliente);

};

exports.down = function(pgm) {

};