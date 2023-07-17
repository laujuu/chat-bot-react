import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPage from './pages/MainPage';
import Chatbot from './components/chatbot/ChatBot';


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes >
        <Route path="/" element={ <MainPage /> } />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    );
  }
}

export default App;