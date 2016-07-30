App.Cliente.Pedido.new= function(object) {
  var totalDaCompra = object.totalDaCompra;

  $(function() {
    $('#inputEndereco').change(calculateFrete);

    $('#inputFormaDePagamento').change(handleFormaSelection);
  });

  ///////////////

  function handleFormaSelection() {
    var forma = $('#inputFormaDePagamento').val();

    if(forma === 'BOLETO') {
      $('.form-cartao').hide();
    }

    if(forma === 'CARTAO') {
      $('.form-cartao').show();
    }
  }

  function calculateFrete() {
    var values = $('#inputEndereco').val();
    var object = $.parseJSON(values);
    var cep = object.cep;
    var url = "/transportadora/calcula-frete";

    $.get(url, {cep: cep}).then(function(newFreteInformation) {
      $('.frete').text("R$ " + newFreteInformation.price);

      var total = parseFloat(newFreteInformation.price)+ parseFloat(totalDaCompra);
      $('.total').text("R$ " + total.toFixed(2));

      $('.frete-information').removeClass('hide');
      $('.frete-information').text('Estimativa de entrega: ' + newFreteInformation.arrivalDateEstimation)
    });

  }
};
