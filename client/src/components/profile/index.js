import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: undefined
        }
        this.ProfileService = new ProfileService()

    }

    componentDidMount = () => {
        const user_id = this.props.match.params.user_id
        this.updateUser(user_id)
    }

    updateUser = user_id => {
        this.ProfileService
            .getTheUser(user_id)
            .then(response => {
                this.setState({ user: response.data })
                //console.log (this.state.user[1].map((elm)=> ))
            })
            .catch(err => console.log(err))
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
                                <h4>Hablidades en: {this.state.user[0].skills.map((elm, idx) => <p>{elm}</p>)}</h4>
                                <Link className="btn btn-dark btn-md" to={`/profile/edit/${this.state.user.user_id}`} >Editar perfil</Link>
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
                                            <Card.Body>  <h4>{this.state.user[1].map((elm) => <Link to={`/question/details/${elm._id}`}><p>titulo :{elm.title}</p></Link>)}</h4> </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                                {/* TODO todo hacer lista de preguntas y componente nuevo para los detalles de la pregunta */}
                            </Col>
                        </Row>
                    </Container>
                </>
        )
    }
}

export default Profile