"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    alexa = require('./alexa'),
    handlers = require('./handlers'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());

app.post('/dreamhouse', (req, res) => {

    //let wrapper = alexa.wrap(req, res);

    //let {type, intent, slots, session, response} = alexa(req, res);
    let alx = alexa(req, res);

    if (alx.type === 'LaunchRequest') {
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
    } else if (alx.type === 'IntentRequest') {

        //console.log(req);
        //let intent = req.body.request.intent.name;
        let handler = handlers[intent];

        //let session = req.body.session;
        //session.attributes = session.attributes || {};

        let text = handler ? handler(alx.slots, alx.session, alx.response) : "I don't know what you said";

        //wrapper.say(text)

        //return res.json({
        //    version: req.version,
        //    sessionAttributes: session.attributes,
        //    response: {
        //        outputSpeech: {
        //            type: 'PlainText',
        //            text: text
        //        },
        //        card: {
        //            type: 'Simple',
        //            title: "title",
        //            subtitle: "subtitle",
        //            content: "content"
        //        },
        //        shouldEndSession: false
        //    }
        //});
    }



});

app.listen(app.get('port'), function() {
    console.log("Dreamhouse Alexa server listening on port " + app.get('port'));
});