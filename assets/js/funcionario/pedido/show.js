App.Funcionario.Pedido.show= function(object) {
  var pagamento = object.pagamento;

  $(function() {
    $('.confirm-payment').click(confirmPayment);
  });

  ///////////////

  function confirmPayment() {
    var url = "/intranet/pedidos/" + pagamento.pedido_id + "/confirm-payment";

    $.post(url).then(function(pedido) {
      $('.pedido-status').text(pedido.status);
      $('.confirm-payment').hide();
    });

  }
};
