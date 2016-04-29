"use strict";

module.exports = (req, res) => {

    console.log('--------------------');
    console.log(req.body);

    let session = req.body.session;
    session.attributes = session.attributes || {};

    return {

        type: req.body.request.type,

        intent: req.body.request.intent.name,

        slots: req.body.request.intent.slots,

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