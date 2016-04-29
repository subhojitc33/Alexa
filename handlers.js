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



//exports.Search = (slots, session, response) => {
//    console.log("Search");
//    console.log(slots);
//    console.log(session.attributes.counter);
//    if (slots.
//    if (session.attributes.counter)
//    {
//        console.log("incrementing");
//        session.attributes.counter = session.attributes.counter + 1;
//    } else {
//        session.attributes.counter = 1;
//    }
//    console.log(session.attributes.counter);
//    response.say("OK, looking in " + slots.City.value + " " + session.attributes.counter);
//};

exports.SearchHouses = (slots, session, response) => {
    console.log("SearchHouses");
    session.attributes.stage = "ask_city";
    response.ask("OK, in what city?");
};

exports.AnswerCity = (slots, session, response) => {
    console.log("AnswerCity");
    console.log(slots);
    console.log(session.attributes);
    if (session.attributes.stage === "ask_city") {
        session.attributes.city = slots.City.value;
        session.attributes.stage = "ask_bedrooms";
        response.ask("How many bedrooms?");
    }
};

exports.AnswerPriceRange = (slots, session, response) => {
    console.log("AnswerPriceRange");
    console.log(slots);
    console.log(session.attributes);
    if (session.attributes.stage === "ask_price_range") {
        session.attributes.min = slots.min.value;
        session.attributes.max = slots.max.value;
        response.say(`OK, looking in ${session.attributes.city} between ${session.attributes.min} and ${session.attributes.max}`);
    }

};




exports.Changes = () => {
    console.log(alexa.slots);
    return "OK, looking in " + slots.City.value;
}
