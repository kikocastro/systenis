exports.up = function(pgm) {
  var cortesias = [
    {
      titulo: "'Desconto de 25%'",
      descricao: "'Desconto de 25% em todos os produtos da loja.'",
      ativa: "'false'",
      tipo: "'porcentagem'",
      porcentagem: "'25'"
    },
    {
      titulo: "'Desconto de 50%'",
      descricao: "'Desconto de 50% em todos os produtos da loja.'",
      ativa: "'false'",
      tipo: "'porcentagem'",
      porcentagem: "'50'"
    },
    {
      titulo: "'Desconto de 15%'",
      descricao: "'Desconto de 15% em todos os produtos da loja.'",
      ativa: "'false'",
      tipo: "'porcentagem'",
      porcentagem: "'15'"
    },
  ];
  cortesias.forEach(function (cortesia){
    pgm.sql('INSERT INTO cortesias (titulo, descricao, ativa, tipo, porcentagem) VALUES ( {titulo}, {descricao}, {ativa}, {tipo}, {porcentagem});', cortesia);
  })
};

exports.down = function(pgm) {

};