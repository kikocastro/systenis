exports.up = function(pgm) {
  var funcionarios = [{
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
  },
  {
    nome: "'Saida'",
    sobrenome: "'Systenis'",
    telefone: "'12345671'",
    sexo: "'masculino'",
    email: "'saida@systenis.com'",
    cpf: "'999999991-00'",
    rg: "'999999991'",
    data_de_nascimento: "'1989-01-08'",
    password: "'123123'",
    carteira_de_trabalho: "'1234'",
    data_de_inicio_do_contrato: "'2015-04-02'",
    papel: "'saida'"
  },
  {
    nome: "'Supervisor'",
    sobrenome: "'Systenis'",
    telefone: "'12345672'",
    sexo: "'masculino'",
    email: "'supervisor@systenis.com'",
    cpf: "'999999992-00'",
    rg: "'999999992'",
    data_de_nascimento: "'1989-01-08'",
    password: "'123123'",
    carteira_de_trabalho: "'1235'",
    data_de_inicio_do_contrato: "'2015-04-02'",
    papel: "'supervisor_saida'"
  },
  {
    nome: "'Comercial'",
    sobrenome: "'Systenis'",
    telefone: "'12345673'",
    sexo: "'masculino'",
    email: "'comercial@systenis.com'",
    cpf: "'999999993-00'",
    rg: "'999999993'",
    data_de_nascimento: "'1989-01-08'",
    password: "'123123'",
    carteira_de_trabalho: "'1236'",
    data_de_inicio_do_contrato: "'2015-04-02'",
    papel: "'comercial'"
  }];

  funcionarios.forEach(function (funcionario){
    pgm.sql('INSERT INTO funcionarios (nome, sobrenome, telefone, sexo, email, cpf, rg, data_de_nascimento, password, carteira_de_trabalho, data_de_inicio_do_contrato, papel) VALUES ( {nome}, {sobrenome}, {telefone}, {sexo}, {email}, {cpf}, {rg}, {data_de_nascimento}, {password}, {carteira_de_trabalho}, {data_de_inicio_do_contrato}, {papel});', funcionario);
  });
};

exports.down = function(pgm) {

};