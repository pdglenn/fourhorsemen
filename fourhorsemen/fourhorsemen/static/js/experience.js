function revealBottomContent(){
    $('.bottom_content').css('display', 'inherit');
    $('#next_button').removeClass('last');
    var aTag = $("a[name='"+ "bottom_content" +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
    
}