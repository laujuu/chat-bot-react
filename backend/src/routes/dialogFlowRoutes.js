const { Router } = require('express');
const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

const dialogFlowRoutes = Router();

dialogFlowRoutes.post('/api/df_text_query', async (req, res) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.text,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        }
    };
    let responses = await sessionClient
        .detectIntent(request);

    res.send(responses[0].queryResult)
});

dialogFlowRoutes.post('/api/df_event_query', (_req, res) => {
    res.send({'do': 'event query'});
});

module.exports = dialogFlowRoutes;