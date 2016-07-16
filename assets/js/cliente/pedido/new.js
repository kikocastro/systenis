App.Cliente.Pedido.new= function(object) {
  var totalDaCompra = object.totalDaCompra;

  $(function() {
    $('#inputEndereco').change(calculateFrete);

    $('#inputFormaDePagamento').change(handleFormaSelection);
  });

  ///////////////

  function handleFormaSelection() {
    var forma = $('#inputFormaDePagamento').val();

    if(forma === 'boleto') {
      $('.form-cartao').hide();
    }

    if(forma === 'cartao') {
      $('.form-cartao').show();
    }
  }

  function calculateFrete() {
    var values = $('#inputEndereco').val();
    var object = $.parseJSON(values);
    var cep = object.cep;
    var url = "/transportadora/calcula-frete";

    $.get(url, {cep: cep}).then(function(newFrete) {
      $('.frete').text("R$ " + newFrete);

      var total = parseFloat(newFrete)+ parseFloat(totalDaCompra);
      $('.total').text("R$ " + total.toFixed(2));
    });

  }
};
