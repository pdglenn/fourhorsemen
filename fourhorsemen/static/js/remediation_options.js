function remediationOptions(userChoice){
    var chartDiv = '#chart'
    horizontal_bar_chart(chartDiv,{"x": userChoice, "y": "0"},data,374)
    revealBottomContent();
}