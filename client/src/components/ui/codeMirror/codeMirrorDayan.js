import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2';
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
import 'codemirror/mode/xml/xml'
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
        this.codeIsHappening = this.codeIsHappening.bind(this)
        this.state = {
            code: '',
            mode: 'javascript',
            theme: 'material',
            users: [],
            currentlyTyping: null,
        }
        socket.on('receive code', (payload) => {
            console.log('receive code')
            return this.updateCodeInState(payload)
        });
        socket.on('new user join', (users) => {
            console.log('join user')
            return this.joinUser(users)
        })
        socket.on('load users and code', () => {
            console.log('load user and code')
            return this.sendUsersAndCode()
        })
        socket.on('receive users and code', (payload) => {
            console.log('recive users and code')
            return this.updateUsersAndCodeInState(payload)
        })
        socket.on('user left room', (user) => {
            console.log('user left room')
            return this.removeUser(user)
        })
        this.QuestionService = new QuestionService()
    }
    componentDidMount() { //lifecycle method on our Room component to send a message to our socket connection that a new client is subscribing to the channel associated with this particular room.
        const user = this.props.loggedInUser.username
        sessionStorage.setItem('currentUser', user)
        const users = [...this.state.users, this.props.loggedInUser.username]
        socket.emit('room', { room: this.props.match.params.video_id, user: user });
        this.setState({ users: users })
        
        
    }

    updateCodeQuestion = () => { 
        
        this.QuestionService
            .getChatQuestion(this.props.match.params.video_id)
            .then(response => {
               
                 this.setState({ code: response.data[0].code })
            })

    }

    componentWillUnmount() {
        socket.emit('leave room', { room: this.props.match.params.video_id, user: this.props.loggedInUser.username })
    }

    componentWillReceiveProps(nextProps) { //deprecado debe cambiarse

        const user = nextProps.loggedInUser.username //nextProps.currentUser
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
        console.log('removeUser', user)
    }
    joinUser(user) {
        const combinedUsers = [...this.state.users, user]
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => { return user.length > 1 })
        this.setState({ users: cleanUsers })
        console.log('joinUser', user)
    }
    updateCodeInState(payload) { // whenever there is a change to the code miroors text area, copy of Room's state, causing our component to re-render, passing that new value of this.state.code into the Codemirror component under the prop of value.
        console.log('soy updateCodeInstate')
        this.setState({
            code: payload.code
        });
    }
   

    updateUsersAndCodeInState(payload) {
        console.log(payload, 'soy UPDATEuserANDcodeInsState')
        const combinedUsers = this.state.users.concat(payload.users)
        const newUsers = Array.from(new Set(combinedUsers));
        const cleanUsers = newUsers.filter(user => { return user.length > 1 })
        this.setState({ users: cleanUsers, code: payload.code })
    }
    codeIsHappening(newCode) {
        console.log('soy codeIsHappening')
        
        socket.emit('coding event', { code: newCode, room: this.props.match.params.video_id, user: this.props.loggedInUser.username })
    }

    render() {
        const options = {
            maxHighlightLength:400,
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme,
            autocorrect:true
            
        };
        return (
            <div>
                <Button onClick={this.updateCodeQuestion} className="btn btn-dark btn-md">Paste code from question</Button>
                <CodeMirror
                    
                    
                    value={this.state.code}
                    options={options}
                    // onBeforeChange={(editor, data, code) => {
                    //     this.setState({ code });
                    // }}
                    onChange={
                        (editor, data, value) => {
                            console.log(this.state.users.length)
                            this.codeIsHappening(value)
                        }
                    }
                />
                <br />
                <br />
                <Button className="col-lg-12">clear code</Button>
            </div>
        )
    }
}
export default Room