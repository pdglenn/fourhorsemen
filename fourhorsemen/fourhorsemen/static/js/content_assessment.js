function contentAssessment(){
    var userChoice = $('input:checked').val();
    var chartDiv = '#chart'
    one_axis_scatter(chartDiv, {"x": data, "y": "0", "r": "30"}, data);
    revealBottomContent();
}