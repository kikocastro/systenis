App.Cliente.Carrinho.show = function(carrinho, currentUser) {

  $(function() {
    $("form.form-carrinho").submit(function(e) {
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
      
    });

    $("form input[type=submit]").click(function() {
      $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
      $(this).attr("clicked", "true");
    });
  });
};
