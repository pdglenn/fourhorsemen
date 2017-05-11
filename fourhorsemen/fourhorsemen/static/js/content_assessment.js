function contentAssessment(){
    var userChoice = $('input:checked').val();
    console.log(userChoice)
    var chartDiv = '#chart'

    choiceMap = {'Not harassing': '1',
                 'Slightly harassing': '2',
                 'Somewhat harassing': '3',
                 'Very harassing': '4',
                 'Extremely harassing': '5'}
     choiceNum = choiceMap[userChoice]


        bar_chart_percent(chartDiv,{"x": userChoice, "y": "0"},harassment_distribution_bar)
        line_plot(chartDiv,{"x": choiceNum},harassment_distribution_line);

    revealBottomContent();
}