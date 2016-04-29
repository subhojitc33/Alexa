"use strict";

module.exports = (req, res) => {

    let session = req.body.session,
        intent,
        slots;
    session.attributes = session.attributes || {};

    if (req.body.request.intent) {
        intent = req.body.request.intent.name;
        slots = req.body.request.intent.slots;
    }

    return {

        type: req.body.request.type,

        intent: intent,

        slots: slots,

        session: session,

        response: {
            say: text => {
                res.json({
                    version: req.version,
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: text
                        },
                        shouldEndSession: true
                    }
                });
            },

            ask: (text) => {
                res.json({
                    version: req.version,
                    sessionAttributes: session.attributes,
                    response: {
                        outputSpeech: {
                            type: 'PlainText',
                            text: text
                        },
                        shouldEndSession: false
                    }
                });
            }
        }

    };

};