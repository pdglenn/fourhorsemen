function contextMatters(){
    var chartDiv = '#chart'
    var userChoice = $('input:checked').val();

    bar_chart(chartDiv, {"x": userChoice, "y": "0"}, data);
    revealBottomContent();
}