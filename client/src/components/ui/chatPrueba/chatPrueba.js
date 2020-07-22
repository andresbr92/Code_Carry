
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Card, Avatar, Input, Typography } from 'antd';
import 'antd/dist/antd.css';
import './chatPrueba.css'
const { Search } = Input;
const { Text } = Typography;
const { Meta } = Card;


const client = new W3CWebSocket('ws://127.0.0.1:8000')


class ChatPrueba extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            isLoggedIn: true,
            messages: []
        }
    }
    onButtonClicked = (value) => {
        client.send(JSON.stringify({
            type: "message",
            msg: value,
            user: this.state.userName
        }));
        this.setState({ searchVal: '' })
    }
    componentDidMount() {
        this.setState({ userName: this.props.loggedInUser.username })



        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            console.log (message)
            console.log('got reply! ', dataFromServer);
            if (dataFromServer.type === "message") {
                this.setState((state) =>
                    ({
                        messages: [...state.messages,
                        {
                            msg: dataFromServer.msg,
                            user: dataFromServer.user
                        }]
                    })
                );
            }
        };
    }


    render() {
        return (
            <>
                {/* TODO esto hay que ponerlo bonito */}
                <div className="main">

                    <div>
                        <div className="title">
                            <h1>Code_carry chat!</h1>

                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
                            {this.state.messages.map(message =>
                                <Card key={message.msg} style={{ width: 300, margin: '16px 4px 0 4px', alignSelf: this.state.userName === message.user ? 'flex-end' : 'flex-start' }} loading={false}>
                                    <Meta
                                        avatar={
                                            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{message.user[0].toUpperCase()}</Avatar>
                                        }
                                        title={message.user}
                                        description={message.msg}
                                    />
                                </Card>
                            )}
                        <div className="bottom">
                            <Search
                                placeholder="input message and send"
                                enterButton="Send"
                                value={this.state.searchVal}
                                size="large"
                                onChange={(e) => this.setState({ searchVal: e.target.value })}
                                onSearch={value => this.onButtonClicked(value)}
                            />
                        </div>
                        </div>
                    </div>

                </div>

            </>
        )
    }
}

export default ChatPrueba