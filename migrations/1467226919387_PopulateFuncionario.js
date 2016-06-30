exports.up = function(pgm) {
  var funcionario = {
    nome: "'Admin'",
    sobrenome: "'Systenis'",
    telefone: "'12345678'",
    sexo: "'masculino'",
    email: "'admin@systenis.com'",
    cpf: "'999999999-00'",
    rg: "'999999999'",
    data_de_nascimento: "'1989-01-08'",
    password: "'123123'",
    carteira_de_trabalho: "'123'",
    data_de_inicio_do_contrato: "'2015-04-02'",
    papel: "'admin'"
  };
  pgm.sql('INSERT INTO funcionarios (nome, sobrenome, telefone, sexo, email, cpf, rg, data_de_nascimento, password, carteira_de_trabalho, data_de_inicio_do_contrato, papel) VALUES ( {nome}, {sobrenome}, {telefone}, {sexo}, {email}, {cpf}, {rg}, {data_de_nascimento}, {password}, {carteira_de_trabalho}, {data_de_inicio_do_contrato}, {papel});', funcionario);
};

exports.down = function(pgm) {

};