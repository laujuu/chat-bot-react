const { Router } = require('express');
const loginRoutes = Router();
const User = require('../db/models/userModel');
const Conversation = require('../db/models/conversationModel');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

loginRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    req.session.isLoggedIn = true;
    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    return res.status(200).json({ message: 'Login bem-sucedido' });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

loginRoutes.get('/checkLoginStatus', (req, res) => {
    if (req.session.isLoggedIn) {
      res.json({ isLoggedIn: true });
    } else {
      res.json({ isLoggedIn: false });
    }
  });

  loginRoutes.post('/goodbye', async (req, res) => {
    const { username, message } = req.body;
  
    try {
      const conversation = new Conversation({ username, message });
      await conversation.save();
  
      return res.status(200).json({ message: 'Conversation saved successfully.' });
    } catch (error) {
      console.error('Error while saving conversation:', error);
      return res.status(500).json({ message: 'Error while saving conversation.' });
    }
  });


  loginRoutes.get('/exportConversation', async (req, res) => {
    try {
      const conversations = await Conversation.find().sort({ timestamp: 'asc' });
  
      const csvWriter = createCsvWriter({
        path: 'chatbot-conversations.csv',
        header: [
          { id: 'username', title: 'Username' },
          { id: 'timestamp', title: 'Timestamp' }
        ]
      });
  
      await csvWriter.writeRecords(conversations);
  
      return res.status(200).download('chatbot-conversations.csv');
    } catch (error) {
      console.error('Error while exporting conversation:', error);
      return res.status(500).json({ message: 'Error while exporting conversation.' });
    }
  });

module.exports = loginRoutes;
