function algorithmicFactors(unused){
    var chartDiv = '#chart';
    var userChoice = $('input:checked').val();
    console.log(userChoice)
    choiceMap = {1: "Keywords",
                 2: "Sentiment analysis",
                 3: "Length of message",
                 4: "Conversational balance",
                 5: "Image recognition",
                 6: "Flagged by other humans",
                 7: "Poster harassment history",
                 8: "Other"}

    console.log(choiceMap[userChoice])

    horizontal_bar_chart(chartDiv,{"x": choiceMap[userChoice], "y": "0"},data,200,1,750,400,13)
    revealBottomContent();
}