const { Router } = require('express');
const registerRoutes = Router();
const User = require('../db/models/userModel');


registerRoutes.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(409).json({ message: 'Usuário já existe' });
      }
  
      const newUser = new User({ username, password });
      await newUser.save();
  
      return res.status(201).json({ message: 'Registro bem-sucedido' });
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      res.status(500).json({ message: 'Erro ao fazer registro' });
    }
  });
  
module.exports = registerRoutes;