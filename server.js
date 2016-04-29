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
    let alx = alexa(req, res),
        type = alx.type,
        intent = alx.intent,
        slots = alx.slots,
        session = alx.session,
        response = alx.response;


    if (type === 'LaunchRequest') {
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
        response.say("Welcome to Dreamhouse");
    } else if (type === 'IntentRequest') {
        let handler = handlers[intent];
        if (handler) {
            handler(slots, session, response);
        } else {
            response.say("I don't know how to answer that");
        }
    } else {
        response.say("Not sure what you mean");
    }

});

app.listen(app.get('port'), function() {
    console.log("Dreamhouse Alexa server listening on port " + app.get('port'));
});