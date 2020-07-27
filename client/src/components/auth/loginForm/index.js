import React, { Component } from 'react'

import AuthService from './../../../service/authService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.AuthService = new AuthService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.AuthService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/')
            })
            .catch(err => console.log(err))   // Error handling yay!
    }

    render() {
        return (
            <Container as="main" className="mt-5 text-white">

                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h3 className="text-white text-center">Inicio de sesión</h3>

                        <hr className="hr-secondary"></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">Mínimo tres caracteres</Form.Text>
                            </Form.Group>
                             <button className="botton" id="start-button">
                
                               <span>Iniciar Sesión</span>
                              </button>
                       </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginForm