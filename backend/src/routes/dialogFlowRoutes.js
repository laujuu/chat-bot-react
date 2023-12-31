const { Router } = require('express');
const dialogFlowRoutes = Router();
const chatbot = require('../chatbot/chatbot')

dialogFlowRoutes.post('/api/df_text_query', async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.parameters);
    res.send(responses[0].queryResult)
});

dialogFlowRoutes.post('/api/df_event_query', async (req, res) => {
    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters);
    res.send(responses[0].queryResult)
});

module.exports = dialogFlowRoutes;