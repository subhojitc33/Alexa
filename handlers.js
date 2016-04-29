"use strict";

let salesforce = require("./salesforce");

exports.SearchHouses = (slots, session, response) => {
    session.attributes.stage = "ask_city";
    response.ask("OK, in what city?");
};

exports.AnswerCity = (slots, session, response) => {
    if (session.attributes.stage === "ask_city") {
        session.attributes.city = slots.City.value;
        session.attributes.stage = "ask_bedrooms";
        response.ask("How many bedrooms?");
    } else {
        response.say("Sorry, I didn't understand that");
    }
};

exports.AnswerNumber = (slots, session, response) => {
    if (session.attributes.stage === "ask_bedrooms") {
        session.attributes.bedrooms = slots.NumericAnswer.value;
        session.attributes.stage = "ask_price";
        response.ask("Around what price?");
    } else if (session.attributes.stage === "ask_price") {
        session.attributes.price = slots.NumericAnswer.value;
        response.say(`OK, here is what I found for ${session.attributes.bedrooms} bedrooms in ${session.attributes.city} around ${session.attributes.price}`);
    } else {
        response.say("Sorry, I didn't understand that");
    }
};

exports.Changes = (slots, session, response) => {
    salesforce.findPriceChanges()
        .then(priceChanges => {
            let text = "OK, here are the recent price changes: ";
            priceChanges.forEach(priceChange => {
                    let property = priceChange.get("Parent");
                    text += `${property.Address__c}, ${property.City__c}.
                            Price changed from $${priceChange.get("OldValue")} to $${priceChange.get("NewValue")}.
                             . . . . . . .`;
                }
            );
           response.say(text);
        })
        .catch((err) => {
            console.log(err);
            response.say("Oops. Something went wrong");
        });
};