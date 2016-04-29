"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    alexa = require('alexa-nodekit'),
    handlers = require('./handlers'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.post('/dreamhouse', (req, res) => {

    if (req.body.request.type === 'LaunchRequest') {
        //alexa.launchRequest(req.body);
        //// TODO For now, we don't care about the session or the user id, we will refactor this later.
        //let sessionId = alexa.sessionId;
        //let userId = alexa.userId;
        //let text = "Welcome to DreamHouse"
        //alexa.response(text, {
        //    title: 'DreamHouse',
        //    subtitle: 'Welcome to Dreamhouse',
        //    content: 'Some commands are "Ask DreamHouse for an update"'
        //}, false, function (error, response) {
        //    if (error) {
        //        return res.status(500).jsonp({message: error});
        //    }
        //    return res.jsonp(response);
        //});
    } else if (req.body.request.type === 'IntentRequest') {

        let intent = req.body.request.intent.name;
        let handler = handlers[alexa.intentName];
        let text = handler ? handler() : "I don't know what you said";

        return res.json({
            //version: this.version,
            sessionAttributes: {},
            response: {
                outputSpeech: {
                    type: 'PlainText',
                    text: text
                },
                card: {
                    type: 'Simple',
                    title: "title",
                    subtitle: "subtitle",
                    content: "content"
                },
                shouldEndSession: true
            }
        });
    }



});

app.listen(app.get('port'), function() {
    console.log("Dreamhouse Alexa server listening on port " + app.get('port'));
});