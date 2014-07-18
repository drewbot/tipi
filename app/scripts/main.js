

$('.header-left').hover(
  function() {
  	$( this ).find('.header-logo').remove();
    $( this ).append( $('<img src="images/tipi-logo-hover.png" class="header-logo">') );
  }, function() {
    $( this ).find('.header-logo').remove();
    $( this ).append( $('<img src="images/tipi-logo.png" class="header-logo">') );
  }
);