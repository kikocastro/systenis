App.Funcionario.Pedido.show= function(object) {
  var pagamento = object.pagamento;
  var pedido = object.pedido;

  $(function() {
    $('.confirm-payment').click(confirmPayment);
    $('#inputStatus').change(updateStatus);
  });

  ///////////////

  function confirmPayment() {
    var url = "/intranet/pedidos/" + pagamento.pedido_id + "/confirm-payment";

    $.post(url).then(function(pedido) {
      $('.pedido-status').text(pedido.status);
      $('.confirm-payment').hide();
    });

  }

  function updateStatus() {
    var url = "/intranet/pedidos/" + pedido.id + "/update-status";

    $.post(url, {status: $('#inputStatus').val()}).then(function(res) {
      $('.pedido-status').text(res.pedido.status);
      if(res.shouldReload) {
        location.reload();
      }
      console.log("RES", res);
      });

  }
};
