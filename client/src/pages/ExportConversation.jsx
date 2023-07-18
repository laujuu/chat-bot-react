import React from 'react';
import styles from './css/MainPage.module.css';

class ExportConversation extends React.Component {
  render() {
    return (
      <main>
        <div className={styles.container}>
          <h1 className={styles.title}>Export Bot Conversations</h1>
          <button style={{height: '100px'}} className='btn waves-effect  blue darken-3 pulse'>
            <a style={{ color: 'white', fontSize: '30px' }} href="https://laura-chatbot.onrender.com/exportConversation" target="_blank" rel="noopener noreferrer">Export Conversation</a>
          </button>
        </div>
      </main>
    );
  }
}

export default ExportConversation;