function contentFlags(){
    var userChoice = $('input:checked').val();
    console.log(userChoice)
    var chartDiv = '#chart'
    one_axis_scatter(chartDiv, {"x": userChoice, "y": "0", "r": "30"}, data);
    revealBottomContent();
}