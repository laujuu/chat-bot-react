const { Router } = require('express');
const loginRoutes = Router();
const User = require('../db/models/userModel');

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

module.exports = loginRoutes;
