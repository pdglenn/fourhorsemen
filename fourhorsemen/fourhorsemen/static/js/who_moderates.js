function whoModerates(userChoice){
    var chartDiv = '#chart'
    // one_axis_scatter(chartDiv, {"x": userChoice, "y": "0", "r": "30"}, data);
    bar_chart(chartDiv,{"x": "Users", "y": ""},fair)
    bar_chart(chartDiv,{"x": "Users", "y": ""},accurate)
    bar_chart(chartDiv,{"x": "Users", "y": ""},trust)
    revealBottomContent();
}