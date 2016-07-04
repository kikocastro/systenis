exports.up = function(pgm) {
var produtos = [
       {
            nome: "'Nike Shókis'",
            cores: "'Rosa'",
            fabricante: "'Crocs'",
            peso: "0.9",
            quantidade_estoque: "10",
            tamanho: "45",
            preco: "600",
            imagem: "'/img/crocs1.jpg'"
        },
        {
            nome: "'Gel X13'",
            cores: "'Azul'",
            fabricante: "'Asics'",
            peso: "0.9",
            quantidade_estoque: "33",
            tamanho: "34",
            preco: "300",
            imagem: "'/img/asics1.jpg'"
        },
        {
            nome: "'Speed Form'",
            cores: "'Preto'",
            fabricante: "'Under Armour'",
            peso: "1.1",
            quantidade_estoque: "13",
            tamanho: "43",
            preco: "350",
            imagem: "'/img/underarmour1.jpg'"
        },
        {
            nome: "'Revolution'",
            cores: "'Preto'",
            fabricante: "'Nike'",
            peso: "1.0",
            quantidade_estoque: "13",
            tamanho: "40",
            preco: "250",
            imagem: "'/img/nike1.jpg'"
        },
        {
            nome: "'Nike SB'",
            cores: "'Vermelho'",
            fabricante: "'Nike'",
            peso: "0.9",
            quantidade_estoque: "13",
            tamanho: "41",
            preco: "200",
            imagem: "'/img/nike2.jpg'"
        },
        {
            nome: "'Quantum 13.0'",
            cores: "'Azul'",
            fabricante: "'Asics'",
            peso: "0.8",
            quantidade_estoque: "13",
            tamanho: "40",
            preco: "350",
            imagem: "'/img/asics2.jpg'"
        }   
    ];
    produtos.forEach(function (produto){
        pgm.sql('INSERT INTO produtos (nome, cores, fabricante, peso, quantidade_estoque, tamanho, preco, imagem) VALUES ( {nome}, {cores}, {fabricante}, {peso}, {quantidade_estoque}, {tamanho}, {preco}, {imagem});', produto);
    })
};

exports.down = function(pgm) {

};
