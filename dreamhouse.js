"use strict";

let alexa = require('alexa-nodekit');

var count = 1;

var intentHandlers = {};

intentHandlers.UpdateIntent = function () {
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

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (req, res) {

    if (req.body.request.type === 'LaunchRequest') {
        alexa.launchRequest(req.body);
        // TODO For now, we don't care about the session or the user id, we will refactor this later.
        var sessionId = alexa.sessionId;
        var userId = alexa.userId;
        var text = "Welcome to DreamHouzz"
        alexa.response(text, {
            title: 'Trivia',
            subtitle: 'Welcome to the Trivia app',
            content: 'Some commands are "Ask trivia for a question"'
        }, false, function (error, response) {
            if (error) {
                return res.status(500).jsonp({message: error});
            }
            return res.jsonp(response);
        });
    } else if (req.body.request.type === 'IntentRequest') {
        alexa.intentRequest(req.body);
        // Check session and/or user data
        // Check the Intent Name and Intent Slots to decide on what logic to kick off.
        var intent = alexa.intentName;
        console.log(intent);

        //console.log(intentHandlers[intent]);

        var text;
        if (intentHandlers[intent]) {
            text = intentHandlers[intent]();
        } else {
            text = "I don't know what you said";
        }

        // Respond to the Echo
        alexa.response(text, {
            title: 'Intent Card Title',
            subtitle: 'Intent Card Subtitle',
            content: 'Intent Card Content'
        }, true, function (error, response) {
            if (error) {
                return res.status(400).jsonp({message: error});
            }
            return res.jsonp(response);
        });

    }

};