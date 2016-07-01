exports.up = function(pgm) {
var produto = {
    nome: "'Nike Shókis'",
    cores: "'Rosa'",
    fabricante: "'Crocs'",
    peso: "0.9",
    quantidade_estoque: "10",
    tamanho: "45",
    preco: "600",
    imagem: "'http://i.imgur.com/MiaUgIW.jpg'"
  };
  pgm.sql('INSERT INTO produtos (nome, cores, fabricante, peso, quantidade_estoque, tamanho, preco, imagem) VALUES ( {nome}, {cores}, {fabricante}, {peso}, {quantidade_estoque}, {tamanho}, {preco}, {imagem});', produto);
};

exports.down = function(pgm) {

};
