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
            messages: [],
            isLoggedIn: false,
            username: '',
            password: '',
            isLoginPopupVisible: false,
            isInputDisabled: true,
            isLoginError: false
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
        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('http://localhost:5001/api/df_text_query', { text });

        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'Aura',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says] })
        }
    }

    async df_event_query(event) {
        const res = await axios.post('http://localhost:5001/api/df_event_query', { event });
        if (!this.state.isLoggedIn && this.state.messages.length === 0 && event !== 'Welcome') {
            // Se o usuário não estiver logado, a lista de mensagens estiver vazia e não for o evento 'Welcome', exibe o popup de login
            this.setState({ isLoginPopupVisible: true });
            return;

        }
        for (let msg of res.data.fulfillmentMessages) {

            let says = {
                speaks: 'Aura',
                msg: msg
            };
            this.setState({ messages: [...this.state.messages, says] });
        }
    }


    async componentDidMount() {
        const isLoggedIn = await this.checkLoginStatus();

        if (!isLoggedIn) {
            this.setState({ isLoginPopupVisible: true });
            this.df_event_query('Welcome');
        }
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behaviour: 'smooth' })
    }

    checkLoginStatus = async () => {
        try {
            const response = await axios.get('http://localhost:5001/checkLoginStatus');
            return response.data.isLoggedIn;
        } catch (error) {
            console.error('Erro ao verificar o status do login:', error);
            return false;
        }
    };

    handleLogin = async () => {
        const { username, password } = this.state;

        try {
            const response = await axios.post('http://localhost:5001/login', { username, password });

            if (response.status === 200) {
                this.setState({ isLoginPopupVisible: false, isInputDisabled: false, isLoginError: false });
            } else {
                console.error('Erro ao fazer login:', response.data.message);
                this.setState({ isLoginError: true });
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            this.setState({ isLoginError: true });
        }
    };

    showLoginPopup = () => {
        // Exibe o popup de login
        const loginPopup = document.getElementById('login-popup');
        loginPopup.style.display = 'block';
    };

    handleUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue} />)
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />;
        } else if (message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards) {
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div className={styles.cards}>
                            <div>
                                <p style={{ color: 'black' }}>Sure, we have some options for you!</p>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
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
            <div className={styles.container}>
                <h4>Aura.bot</h4>

                <div className={styles.wrapper}>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }} style={{ float: 'left', clear: 'both' }}></div>
                    {/* Popup de login */}
                    {this.state.isLoginPopupVisible && (
                        <div id="login-popup" className={styles.loginPopup}>
                            <div className={styles.loginContainer}>
                                <h5>Please log in to continue your assistance.</h5>
                                <a>need help?</a>
                                {this.state.isLoginError && <p className={styles.errorMessage}>Username or password incorrect.</p>}
                                <input type="text" placeholder="Usuário" onChange={this.handleUsernameChange} />
                                <input type="password" placeholder="Senha" onChange={this.handlePasswordChange} />
                                <button style={{ marginTop: '20px'}} class="waves-effect blue darken-3 btn-small" onClick={this.handleLogin}>Entrar</button>
                            </div>
                        </div>
                    )}
                    <div className={styles.textContainer}>
                        <input placeholder='How can we help you today?' type="text" onKeyDown={this._handleInputKeyDown} autoFocus disabled={this.state.isInputDisabled} />
                    </div>
                </div>

            </div>
        );
    }
};

export default ChatBot;