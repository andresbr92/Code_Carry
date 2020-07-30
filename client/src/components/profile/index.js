import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import QuestionService from '../../service/questionService';
import Spinner from './../ui/spinner'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import QuestionDetails from './../../components/question/questionDetails'
import Message from './../../components/ui/CustomToast'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //TODO refactorizar user (trae el user, preguntas del user, y todas las preguntas)
            user: undefined,
            notViewedNotification: undefined,
            toast: {
                visible: false,
                text: ''
              },
        }
        this.ProfileService = new ProfileService()
        this.QuestionService = new QuestionService()
    }

    componentDidMount = () => {
        const user_id = this.props.match.params.user_id
        this.updateUser(user_id)

    }

    updateUser = user_id => {

        this.ProfileService
            .getTheUser(user_id)
            .then(response => {
                this.setState({ user: response.data }, () => {
                    this.notifications()

                })
            })
            .catch(err => console.log(err))

    }

    removeQuestionProfile = (question_id) => {

        this.QuestionService
            .removeQuestion(question_id)
            .then()
            .catch(err => console.log(err))

            this.updateUser(this.state.user[0]._id)
            this.props.handleToast(true, 'Pregunta borrada')

    }

    notifications = () => {
        const mySkill = []
        const includeSkill = []
        this.state.user[0].skill.map(elm => mySkill.push(elm))
        this.state.user[2].map((elm) => this.state.user[0]._id != elm.userOwner && mySkill.includes(elm.skill) ? includeSkill.push(elm) : null)
        this.setState({ notViewedNotification: includeSkill })
    }

    prestige = (allPuntuation) => {

        let result = []
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        result = allPuntuation.reduce(reducer)
        return Math.round(result / allPuntuation.length)

    }


    render() {

        return (

            !this.state.user ? <Spinner /> :
                    
                    <Container as="main" className="mt-5 mb-5 text-center">

                        <h1 className="text-white">Bienvenido a tu perfil {this.state.user[0].username}</h1>
                        <hr className="hr-home" />
                        <Row>

                            <Col md={2}>
                                <h3 className="mb-5"><i className="fa fa-trophy mr-2 trofeo" aria-hidden="true"></i>Prestigio: {this.state.user[0].rating.length ? this.prestige(this.state.user[0].rating) : 0}/5</h3>
                                <h4 className="text-white mt-5 mr-3 tex-center">Habilidades<i class="fa fa-tags ml-2 mt-2" aria-hidden="true"></i><hr className="hr-home" />{this.state.user[0].skill.map((elm, idx) => <p key={idx} >{elm}</p>)}</h4>

                            </Col>
                            <Col md={6}>
                                <img src={this.state.user[0].imageUrl} className="mr-3 img-profile"></img>
                                <br />
                                <h5 className="mb-5 mt-5 text-white">Email: {this.state.user[0].email}</h5>
                                <Link className="botton m-5" to={`/profile/edit/${this.state.user[0]._id}`} ><span>Editar perfil <i class="fa fa-wrench ml-2" aria-hidden="true"></i></span></Link>
                            </Col>

                            <Col md={4}>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Tus preguntas <i class="fa fa-question-circle-o" aria-hidden="true"></i>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body> <Row> {this.state.user[1].map((elm) => <>
                                                <Col md={10}><h6>

                                                    <Link key={elm._id} to={`/question/details/${elm._id}`}> {elm.tryHelp
                                                        ?
                                                        <Row>
                                                            <Col md={2}>
                                                                <i className="fa fa-bell red ml-2" aria-hidden="true"></i>
                                                            </Col>
                                                            <Col md={10}>
                                                            <p>  Título :{elm.title} </p>
                                                            </Col>
                                                        </Row>
                                                        :
                                                        <><span >{elm.title} </span></>} </Link> </h6>
                                                </Col>
                                                <Col md={2}>
                                                    <i onClick={() => this.removeQuestionProfile(elm._id)} class="fa fa-trash-o mr-2 trash" aria-hidden="true"></i>
                                                </Col> <hr></hr> </>)}
                                            </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <hr></hr>
                                <Accordion defaultActiveKey={!this.state.notViewedNotification ? '0' : '1'}>
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                {this.state.notViewedNotification ? <h6>TIENES <span>{this.state.notViewedNotification.length} </span> NOTIFICACIONES NUEVAS <i className="fa fa-bell-o" aria-hidden="true"></i></h6> : <h5>NO TIENES NOTIFICAIONES</h5>}
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body className="card">
                                                        {this.state.notViewedNotification
                                                            &&
                                                            this.state.notViewedNotification.map((elm) => {
                                                                console.log(elm.match[0])

                                                                if (elm.match.length < 1) {
                                                                    return <Link key={elm._id} to={`/question/details/${elm._id}`} className="link-profile"> {elm.tryHelp
                                                                        ?
                                                                        <p><i class="fa fa-bell red" aria-hidden="true"></i>Título :{elm.title} </p>
                                                                        :
                                                                        <p >Título :{elm.title} </p>} <hr /> </Link>
                                                                } else if (elm.match.includes(this.props.loggedInUser._id)) {

                                                                    return <Link key={elm._id} to={`/question/details/${elm._id}`} className="link-profile"> {elm.tryHelp
                                                                        ?
                                                                        <p><i class="fa fa-bell red" aria-hidden="true"></i>Título :{elm.title} </p>
                                                                        :
                                                                        <p >Título :{elm.title} </p>} <hr /> </Link>
                                                                }


                                                            })}  </Card.Body>
                                                </Accordion.Collapse>
                                            </Accordion.Toggle>
                                        </Card.Header>
                                    </Card>
                                </Accordion>
                            </Col>

                            {this.state.user[0].comments ? this.state.user[0].comments.map((elm) =>
                                <Col md={4}>
                                    <Card className="mt-5">
                                        <Card.Header><h5>Comentario de {elm.username}</h5><hr />
                                            <Card.Body><h6>{elm.theComment}</h6><hr /></Card.Body>

                                        </Card.Header>
                                    </Card>
                                </Col>)
                                : null}
                        </Row>
                        <Message {...this.state.toast} handleToast={this.handleToast}/>
                    </Container>
        
        )
    }
}

export default Profile