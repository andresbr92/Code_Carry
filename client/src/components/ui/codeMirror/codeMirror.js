
import React from 'react'
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button } from 'react-bootstrap'

import 'codemirror/lib/codemirror.css';

import 'codemirror/theme/material.css';


import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/ruby/ruby.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/clojure/clojure.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/erlang/erlang.js'
import 'codemirror/mode/coffeescript/coffeescript.js'
import 'codemirror/mode/crystal/crystal.js'
import QuestionService from './../../../service/questionService'

const io = require('socket.io-client')
var socket = io.connect('http://localhost:5000');
socket.on('news', function (data) {
    console.log(data);
});

class Room extends React.Component {
    constructor(props) {
        super(props)
        this.state = { code: '', mode: 'javascript', theme: 'material', users: [], currentlyTyping: null, question: '' }

        socket.on('receive code', (payload) => this.updateCodeInState(payload));

        socket.on('new user join', (users) => this.joinUser(users))

        socket.on('load users and code', () => this.sendUsersAndCode())

        socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))

        socket.on('user left room', (user) => this.removeUser(user))
        this.QuestionService = new QuestionService()
    }
    componentDidMount() {
        this.QuestionService
            .getChatQuestion(this.props.match.params.video_id)
            .then(response => {
                console.log(response.data[0].code)
                this.setState({ question: response.data[0].code })
            })
        const user = this.props.loggedInUser.username
        sessionStorage.setItem('currentUser', user)
        const users = [...this.state.users, this.props.loggedInUser.username]
        socket.emit('room', { room: this.props.match.params.video_id, user: user });
        this.setState({ users: users })



    }


    componentWillUnmount() {
        socket.emit('leave room', { room: this.props.match.params.video_id, user: this.props.loggedInUser.username })
    }

    componentWillReceiveProps(nextProps) {
        const user = nextProps.currentUser
        const users = [...this.state.users, user]
        socket.emit('room', { room: nextProps.video_id, user: user });
        this.setState({ users: users })
    }



    sendUsersAndCode() {
        socket.emit('send users and code', { room: this.props.match.params.video_id, users: this.state.users, code: this.state.code })
    }

    removeUser(user) {
        const newUsers = Object.assign([], this.state.users);
        const indexOfUserToDelete = this.state.users.findIndex(Olduser => { return Olduser == user.user })
        newUsers.splice(indexOfUserToDelete, 1);
        this.setState({ users: newUsers })
    }

    joinUser(user) {
        const combinedUsers = [...this.state.users, user]
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => { return user.length > 1 })
        this.setState({ users: cleanUsers })
    }


    updateCodeInState(payload) {
        console.log(payload, 'soy updateCodeInstate')
        this.setState({
            code: payload.code,
            currentlyTyping: payload.currentlyTyping
        });

    }

    updateCodeForCurrentUser(newCode) {
        console.log(newCode, 'soy updateCODEforcurrentuser')
        this.setState({
            code: newCode
        })
    }

    updateModeInState(newMode) {
        this.setState({
            mode: newMode
        })
    }

    updateUsersAndCodeInState(payload) {
        console.log(payload, 'soy UPDATEuserANDcodeInsState')
        const combinedUsers = this.state.users.concat(payload.users)
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => { return user.length > 1 })
        this.setState({ users: cleanUsers, code: payload.code })
    }

    codeIsHappening(newCode) {
        console.log('SOY CODE IS HAPENIG')
        this.updateCodeForCurrentUser(newCode)
        this.updateCurrentlyTyping()
        socket.emit('coding event', { code: newCode, room: this.props.match.params.video_id, currentlyTyping: this.props.loggedInUser.username })

    }

    updateCurrentlyTyping() {
        this.setState({ currentlyTyping: this.props.loggedInUser.username })
    }







    render() {

        var options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme

        };
        return (
            <>
                <div>
                    <hr></hr>

                    <CodeMirror className='codemirror'
                        viewportMargin={Infinity}
                        height={900}
                        value={this.state.code}
                        options={options}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({ code: value })
                        }}
                        onChange={(editor, data, code) => {

                            this.codeIsHappening(code)
                        }}
                    />

                </div>
                <Button className="col-lg-12">clear code</Button>
            </>
        )
    }
}



export default Room