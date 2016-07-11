exports.up = function(pgm) {
  var cortesias = [
    {
      titulo: "'Leve 2, pague 1'",
      descricao: "'Leve dois tênis da loja e pague apenas um.'",
      ativa: "'false'"
    },
    {
      titulo: "'Desconto de 25%'",
      descricao: "'Desconto de 25% em todos os produtos da loja.'",
      ativa: "'false'"
    },
    {
      titulo: "'Desconto de 50%'",
      descricao: "'Desconto de 50% em todos os produtos da loja.'",
      ativa: "'false'"
    },
    {
      titulo: "'Desconto de 15%'",
      descricao: "'Desconto de 15% em todos os produtos da loja.'",
      ativa: "'false'"
    },
  ];
  cortesias.forEach(function (cortesia){
    pgm.sql('INSERT INTO cortesias (titulo, descricao, ativa) VALUES ( {titulo}, {descricao}, {ativa});', cortesia);
  })
};

exports.down = function(pgm) {

};