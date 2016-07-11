App.Cliente.Carrinho.show = function(object) {
  var carrinho = object.carrinho;
  var totalDaCompra = object.totalDaCompra;

  $(function() {
    $('.total').text("R$ " + totalDaCompra);

    $("form.form-carrinho").submit(formSubmit);

    $(".calculaFrete").click(calculaFrete);

    $("form input[type=submit]").click(function() {
      $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
      $(this).attr("clicked", "true");
    });
  });

  ///////////////

  function calculaFrete() {
    var cep = $('#inputCep').val();
    var url = "/transportadora/calcula-frete";

    $.get(url, {cep: cep}).then(function(newFrete) {
      $('.frete').text("R$ " + newFrete);

      var total = parseFloat(newFrete)+ parseFloat(totalDaCompra);
      $('.total').text("R$ " + total.toFixed(2));
    });
    
  }

  function formSubmit(e) {
    e.preventDefault();
  
    var clickedButton = $(document.activeElement).val();
    var updatedItem, url, newQuantidade;
    var updatedItems = [];

    carrinho.itens.forEach(function(item) {
      updatedItem = {
        id: $('#inputItemId' + item.id).val(),
        quantidade: $('#inputQuantidade' + item.id).val()
      };

      newQuantidade = parseInt(updatedItem.quantidade);

      if(!!newQuantidade && item.quantidade !== newQuantidade) {
        updatedItems.push(updatedItem);
      }
    });

    if(clickedButton === 'update_button' && !$.isEmptyObject(updatedItems)) {
      url = "/cliente/itens/update";

      $.post(url, {updatedItems: updatedItems}).done(window.location.reload());
    } else if( clickedButton === 'finish_button') {
      url = "/finalizar-compra";

      $.post(url);
    }

  }
};
