function contextMatters(){
    var chartDiv = '#chart'

    var userChoice = $('input:checked').val();
    console.log('hi')
    var chartDiv = '#chart'

    choiceMap = {'Not harassing': '1',
                 'Slightly harassing': '2',
                 'Somewhat harassing': '3',
                 'Very harassing': '4',
                 'Extremely harassing': '5'}
     choiceNum = choiceMap[userChoice]

    bar_chart(chartDiv, {"x": choiceNum, "y": "0"}, data);
    revealBottomContent();
}