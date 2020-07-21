import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import QuestionDetails from './../../components/question/questionDetails'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            //TODO refactorizar user (trae el user, preguntas del user, y todas las preguntas)
            user: undefined,
            notViewedNotification : undefined
            

        }
        this.ProfileService = new ProfileService()

    }

    componentDidMount = () => {
        const user_id = this.props.match.params.user_id
        this.updateUser(user_id)
        //this.notifications()        

    }

    updateUser = user_id => {
        this.ProfileService
            //se podria meter aqui otra cosa
            .getTheUser(user_id)
            .then(response => {
                console.log(response.data)
                this.setState({ user: response.data }, () => {
                    this.notifications()
                })
            })
            .catch(err => console.log(err))

    }
    
    notifications = () => {
        const mySkill = []
        const includeSkill = []

        this.state.user[0].skill.map(elm => mySkill.push(elm))
        this.state.user[2].map((elm) => {
            mySkill.includes(elm.skill) && includeSkill.push(elm)
        })
        this.setState({ notViewedNotification: includeSkill })
        console.log (includeSkill)
    }


    render() {



        return (

            !this.state.user ? <h3>CARGANDO</h3> :

                <>

                    <Container as="main">

                        <h1>bienvenido a tu perfil {this.state.user[0].username}</h1>

                        <Row>
                            <Col md={{ span: 5, offset: 1 }}>

                                <img src={this.state.user[0].image_url}></img>
                                <hr></hr>
                                <h3>Email: {this.state.user[0].email}</h3>
                                {/* TODO hay quue preguntar a enrique y arreglar el problema de las skills */}
                                <h4>Hablidades en: {this.state.user[0].skill.map((elm, idx) => <p key={idx} >{elm}</p>)}</h4>
                                <Link className="btn btn-dark btn-md" to={`/profile/edit/${this.state.user[0]._id}`} >Editar perfil</Link>
                            </Col>
                            <Col md={{ span: 4, offset: 1 }}>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Las preguntas del usuario
                                            </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>  <h4>{this.state.user[1].map((elm) => <Link key={elm._id} to={`/question/details/${elm._id}`}><p>titulo :{elm.title} </p></Link>)}</h4> </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                {this.state.notViewedNotification ? <h4>TIENES NUEVAS <span>{this.state.notViewedNotification.length} </span>  NOTIFICACIONES</h4> : <h4>NO TIENES NOTIFICAIONES</h4> }
                                                <Accordion.Collapse eventKey="0">
                                                    {/* TODO como hacemos lo de las notificaciones ? */}
                                                    <Card.Body> <h4> {this.state.notViewedNotification && this.state.notViewedNotification.map((elm) => <Link to={`/question/details/${elm._id}`} > <h4> {elm.title}</h4> <hr></hr> </Link>)} </h4>  </Card.Body>
                                                </Accordion.Collapse>
                                            </Accordion.Toggle>
                                        </Card.Header>

                                    </Card>
                                </Accordion>
                            </Col>
                        </Row>
                    </Container>
                </>
        )
    }
}

export default Profile