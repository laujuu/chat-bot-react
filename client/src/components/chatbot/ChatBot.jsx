import React, { Component } from 'react';
import axios from 'axios'
import styles from '../css/ChatBot.module.css'

import Message from './Message';
import Card from './Card';

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
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'Aura',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]})
        }
    }

    async df_event_query(event) {
        const res = await axios.post('http://localhost:5001/api/df_event_query', { event });
      
        for (let msg of res.data.fulfillmentMessages) {
          let says = {
            speaks: 'Aura',
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

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />)
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards){
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{ message.speaks }</a>
                        </div>
                        <div className={ styles.cards}>
                            <div>
                                <p style={{ color: 'black'}}>Sure, we have some options for you!</p>
                                { this.renderCards(message.msg.payload.fields.cards.listValue.values) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i)
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
            <h4>Aura.bot</h4>
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