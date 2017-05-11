function whoModerates(userChoice){
    var chartDiv1 = '#chart1'
    var chartDiv2 = '#chart2'
    var chartDiv3 = '#chart3'

    fairChoice = $('#1 input:checked').val()
    accurateChoice = $('#2 input:checked').val()
    trustChoice = $('#3 input:checked').val()

    choiceMap = {1: 'Moderator',
                 2: 'Algorithm',
                 3: 'Users'}

    bar_chart(chartDiv1,{"x": choiceMap[fairChoice], "y": ""},fair,3, 300, 400)
    bar_chart(chartDiv2,{"x": choiceMap[accurateChoice], "y": ""},accurate,3, 300, 400)
    bar_chart(chartDiv3,{"x": choiceMap[trustChoice], "y": ""},trust,3, 300, 400)

    revealBottomContent();
}