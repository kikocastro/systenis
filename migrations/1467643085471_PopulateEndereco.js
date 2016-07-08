exports.up = function(pgm) {
var enderecos = [
		{
	    cliente_id: "'1'",
	    cep: "'12345678'",
	    rua: "'Avenida Paulista'",
	    numero: "'123'",
	    complemento: "'123'",
	    cidade: "'Sao Paulo'",
	    estado: "'Sao Paulo'"
	  },
	  {
	    cliente_id: "'1'",
	    cep: "'87654321'",
	    rua: "'Avenida Paulista'",
	    numero: "'456'",
	    complemento: "'456'",
	    cidade: "'Sao Paulo'",
	    estado: "'Sao Paulo'"
	  },
	];
  enderecos.forEach(function (produto){
    pgm.sql('INSERT INTO enderecos (cliente_id, cep, rua, numero, complemento, cidade, estado) VALUES ( {cliente_id}, {cep}, {rua}, {numero}, {complemento}, {cidade}, {estado});', produto);
  })
};

exports.down = function(pgm) {

};