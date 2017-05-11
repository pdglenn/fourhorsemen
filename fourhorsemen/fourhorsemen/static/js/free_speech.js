function freeSpeech(userChoice){
    var chartDiv = '#chart'
    bar_chart_percent(chartDiv, {"x": userChoice, "y": "0"}, data);
    revealBottomContent();
}