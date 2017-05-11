function whoModerates(userChoice){
    var chartDiv1 = '#chart1'
    var chartDiv2 = '#chart2'
    var chartDiv3 = '#chart3'
    bar_chart(chartDiv1,{"x": "Users", "y": ""},fair,3)
    bar_chart(chartDiv2,{"x": "Users", "y": ""},accurate,3)
    bar_chart(chartDiv3,{"x": "Users", "y": ""},trust,3)
    revealBottomContent();
}