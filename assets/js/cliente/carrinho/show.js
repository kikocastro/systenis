App.Cliente.Carrinho.show = function(carrinho) {
  console.log("!!!!!", carrinho);

  $(function() {
    $("form.form-carrinho").submit(function(e) {
      e.preventDefault();
      
      var clickedButton = $(document.activeElement).val();
      
      if(clickedButton === 'update_button') {
        var itemId = $('#inputItemId').val();
        var quantidade = $('#inputQuantidade').val();
        var url = "/cliente/itens/" + itemId + "/update";
        
        $.post(url, {quantidade: quantidade}).done(window.location.reload());
      } else if( clickedButton === 'finish_button') {
        var url = "/finalizar-compra";

        $.post(url);
      }
      
    });

    $("form input[type=submit]").click(function() {
      $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
      $(this).attr("clicked", "true");
    });
  });
}();
