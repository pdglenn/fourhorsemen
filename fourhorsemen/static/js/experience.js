function revealBottomContent(){
    $('.bottom_content').css('display', 'inherit');
<<<<<<< HEAD
    $('.next_button').removeClass('last');
=======
    $('#next_button').removeClass('last');
>>>>>>> 1d13ed216fd17c5f75b306fadaa6157275b02915
    var aTag = $("a[name='"+ "bottom_content" +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    
}