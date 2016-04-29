exports = (req, res) => {

    let session = req.body.session;
    session.attributes = session.attributes || {};

    return {

        type: req.body.request.type,

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