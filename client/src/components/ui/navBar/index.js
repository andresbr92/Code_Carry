import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'




import AuthService from './../../../service/authService'
import { Link, NavLink } from 'react-router-dom'


class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {

            inputSearch: ''

        }

        this.AuthService = new AuthService()
    }
    handleInputChange = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value },
            () => this.props.handleSearch(this.state.inputSearch)
        )
    }
    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }
    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
                    <Navbar.Brand>
                        <Link to="/">Code_Carry</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Form inline>
                                <FormControl onChange={this.handleInputChange} name='inputSearch' value={this.state.inputSearch} type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-primary">Search</Button>
                            </Form>
                            <Nav.Link as="span">
                                <NavLink to="/" exact activeStyle={{ color: 'white' }}>Inicio</NavLink>
                            </Nav.Link>


                            {this.props.loggedInUser ?
                                (
                                    <>
                                        <Nav.Link as="span">
                                            <NavLink to={`/question/new/${this.props.loggedInUser._id}`} activeStyle={{ color: 'white' }}>Make a Question!</NavLink>
                                        </Nav.Link>
                                        <Nav.Link as="span">
                                            <NavLink to={`/chat`} activeStyle={{ color: 'white' }}>chat</NavLink>
                                        </Nav.Link>
                                        <Nav.Link as="span">
                                            <span onClick={this.logout}>Cerrar sesión</span>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as="span">
                                            <NavLink to="/auth/signup" activeStyle={{ color: 'white' }}>Registro</NavLink>
                                        </Nav.Link>
                                        <Nav.Link as="span">
                                            <NavLink to="/auth/login" activeStyle={{ color: 'white' }}>Inicio sesión</NavLink>
                                        </Nav.Link>
                                    </>
                                )
                            }
                            

                            <Nav.Link as="span">
                                <NavLink to={this.props.loggedInUser ? `/profile/${this.props.loggedInUser._id}` : `/auth/login`} activeStyle={{ color: 'white' }}>Hola, {this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'}</NavLink>
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            </>
        )
    }
}

export default Navigation