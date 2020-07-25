import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Button } from 'react-bootstrap'
import 'codemirror/lib/codemirror.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'///////////////////////
import 'codemirror/theme/midnight.css';

import 'codemirror/mode/javascript/javascript.js'

import QuestionService from '../../../service/questionService'
import Rating from './../../profile/rating-form'


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
            theme: 'midnight',
            users: [],
            questionOwner:'',
            currentlyTyping: null,
            showModal: false/////////////////////////
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
        this.QuestionService
            .getChatQuestion(this.props.match.params.video_id)
            .then(response => {
                console.log(response)
                this.setState({ questionOwner: response.data[0].userOwner })
            })
            .catch(err => console.log(err))

    }

    updateCodeQuestion = () => {

        this.QuestionService
            .getChatQuestion(this.props.match.params.video_id)
            .then(response => {

                this.setState({ code: response.data[0].code })
            })
            .catch(err => console.log(err))
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
    clearCode = () => {
        socket.emit('clear code', { code: '', room: this.props.match.params.video_id })
    }


    handleModal = status => this.setState({ showModal: status })///////////////////

    handleQuestionSubmit = () => {////////////////////////
        this.handleModal(false)
        this.updateQuestionsList()/////////////////////////
    }

    render() {
        const options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: this.state.theme,


        };

        return (
            <>

                <Row>
                    <Col md={8}>
                        <div className="screen-codemirror">
                            <CodeMirror
                                autoCursor={false}

                                value={this.state.code}
                                options={options}
                                onChange={
                                    (editor, data, value) => {
                                        console.log(this.state.users.length)
                                        this.codeIsHappening(value)
                                    }
                                }
                            />
                            <Button onClick={this.clearCode.bind(this)} className="col-lg-12">clear code</Button>
                        </div>
                    </Col>
                    <Col md={4}>
                        <Row></Row>
                        <div className='screen-misc'>
                            <Button onClick={this.updateCodeQuestion} className="botton green">Paste Question Code</Button>

                           {this.state.questionOwner===this.props.loggedInUser._id && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Cerrar pregunta</Button>}
                        </div>
                    </Col>
                </Row>
                {/* /////////////////////////////////////// */}
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <Rating handleQuestionSubmit={this.handleQuestionSubmit} loggedInUser={this.props.loggedInUser} handleModal={this.handleModal} users={this.state.users}  {...this.props} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
export default Room