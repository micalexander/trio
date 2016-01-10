$(document).ready(function() {

  // create scroll link
  $(".tri-scroll-to").click(function() {
    var link = $($(this).attr('href'));
    var divToScroll  = $(link['selector'].replace('#', '.'));
    divToScroll
      .velocity("scroll", 1000);

    return false
  });
});
