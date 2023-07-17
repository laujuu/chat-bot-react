import React, { Component } from 'react';
import axios from 'axios'
import styles from '../css/ChatBot.module.css'

import Message from './Message';

class ChatBot extends Component {

    messagesEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyDown = this._handleInputKeyDown.bind(this);
        this.state = {
            messages: []
        }
    }

    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };
        this.setState({ messages: [...this.state.messages, says]});
        const res = await axios.post('http://localhost:5001/api/df_text_query', { text });

        for (let msg of res.data.fulfillmentMessages) {
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]})
        }
    }

    async df_event_query(event) {
        const res = await axios.post('http://localhost:5001/api/df_event_query', { event });
      
        for (let msg of res.data.fulfillmentMessages) {
          let says = {
            speaks: 'bot',
            msg: msg
          };
          this.setState({ messages: [...this.state.messages, says] });
        }
      }
      

    componentDidMount() {
        this.df_event_query('Welcome')
        console.log('hi');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: 'smooth'})
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
            });
        } else {
            return null;
        }
        
    }

    _handleInputKeyDown(e) {
        if (e.key === 'Enter') {
          this.df_text_query(e.target.value);
          e.target.value = '';
        }
      }

  render() {
    return (
        <div className={ styles.container }>
            <h2 >Aura.bot</h2>
          <div className={ styles.wrapper }>
            {this.renderMessages(this.state.messages)}
            <div
            ref={(el) => { this.messagesEnd = el; }} 
            style={{ float: 'left', clear: 'both'}}></div>
            <div className={ styles.textContainer}>
                <input type="text" onKeyDown={this._handleInputKeyDown} autoFocus />
            </div>
          </div>
        </div>
      );
  }
};

export default ChatBot;