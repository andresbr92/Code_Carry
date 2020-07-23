// import React, { Component } from 'react'
// import Codemirror from 'react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/monokai.css';
// import 'codemirror/mode/javascript/javascript.js'

// const io = require('socket.io-client')
// const socket = io.connect()


// class Room extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             code: '',
//             mode: 'javascript',
//             theme: 'eclipse',
//             users: [],
//             currentlyTyping: null
//         }
        
//     }
  

    

//     render() {
//         const options = {
//             lineNumbers: true,
//             mode: 'javascript',
//             theme: 'monokai'
//         }
//         return (
//             <div>
//                 <h1>hola</h1>
//             </div>
//         )
//     }
// }
// export default Room
import React from 'react'
import Codemirror from 'react-codemirror';





import { Button } from 'react-bootstrap'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/bespin.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/theme/3024-night.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/isotope.css';
import 'codemirror/theme/duotone-light.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/midnight.css';
import 'codemirror/theme/solarized.css';

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/ruby/ruby.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/clojure/clojure.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/erlang/erlang.js'
import 'codemirror/mode/coffeescript/coffeescript.js'
import 'codemirror/mode/crystal/crystal.js'

const io = require('socket.io-client')
var socket = io.connect('http://localhost:5000');
socket.on('news', function (data) {
    console.log(data);
});

class Room extends React.Component {
    constructor(props) {
        super(props)
        this.state = { code: '', mode: 'javascript', theme: 'eclipse', users: [], currentlyTyping: null }
        socket.on('receive code', (payload) => this.updateCodeInState(payload));
        socket.on('receive change mode', (newMode) => this.updateModeInState(newMode))
        socket.on('new user join', (users) => this.joinUser(users))
        socket.on('load users and code', () => this.sendUsersAndCode())
        socket.on('receive users and code', (payload) => this.updateUsersAndCodeInState(payload))
        socket.on('user left room', (user) => this.removeUser(user))
    }
    componentDidMount() {
        if (this.props.match.params.video_id == undefined) {
            this.props.actions.getChallenges();
        } else {
            const user = this.props.loggedInUser.username
            sessionStorage.setItem('currentUser', user)
            const users = [...this.state.users, this.props.loggedInUser.username]
            socket.emit('room', { room: this.props.match.params.video_id, user: user });
            this.setState({ users: users })
        }
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
        this.setState({
            code: payload.code,
            currentlyTyping: payload.currentlyTyping
        });
    }

    updateCodeForCurrentUser(newCode) {
        this.setState({
            code: newCode
        }, () => this.componentDidMount())
    }

    updateModeInState(newMode) {
        this.setState({
            mode: newMode
        })
    }

    updateUsersAndCodeInState(payload) {
        const combinedUsers = this.state.users.concat(payload.users)
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => { return user.length > 1 })
        this.setState({ users: cleanUsers, code: payload.code })
    }

    codeIsHappening(newCode) {
        this.updateCodeForCurrentUser(newCode)
        this.updateCurrentlyTyping()
        socket.emit('coding event', { code: newCode, room: this.props.match.params.video_id, currentlyTyping: this.props.loggedInUser.username })
        
    }

    updateCurrentlyTyping() {
        this.setState({ currentlyTyping: this.props.loggedInUser.username })
    }

    changeMode(newMode) {
        this.updateModeInState(newMode)
        socket.emit('change mode', { mode: newMode, room: this.props.match.params.video_id })
    }

    changeTheme(newTheme) {
        this.setState({ theme: newTheme })
    }

    clearCode(e) {
        e.preventDefault();
        this.setState({ code: '' })
        socket.emit('coding event', { code: '', room: this.props.match.params.video_id })
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme
        };
        return (
            
            <div>
                
                
                
                
                <Codemirror value={this.state.code} onChange={this.codeIsHappening.bind(this)} options={options} />
                <br />
               
                <br />
                <Button onClick={this.clearCode.bind(this)} className="col-lg-12">clear code</Button>
            </div>

        )
    }
}



export default Room