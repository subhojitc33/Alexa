"use strict";

let alexa = require('alexa-nodekit');


var count = 1;

exports.UpdateIntent = function () {
    var text;
    if (count==1) {
        text = "There are no new listings and no price changes today.";
    } else if (count==2) {
        text = "There is one new listing today. " +
            "New House for sale: 245 Summer Street in Lexington. 3 bedrooms, 2 bathrooms. $540,000.";
    } else if (count==3) {
        text = "There is one price change and one new listing today. " +
            "Price Reduction: 180 Harrison avenue in Boston was reduced from $650000 to $620000. " +
            "New House for sale: 245 Summer Street in Lexington. 3 bedrooms, 2 bathrooms. $540,000.";
    }
    count++;
    return text;
};

exports.Search = () => {
    console.log(alexa.slots);
    return "OK, looking in " + alexa.slots.City.value;
}


exports.Changes = () => {
    console.log(alexa.slots);
    return "OK, looking in " + alexa.slots.City.value;
}
