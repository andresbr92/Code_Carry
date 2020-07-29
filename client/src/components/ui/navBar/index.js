import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import AuthService from './../../../service/authService'
import { Link, NavLink } from 'react-router-dom'
import Logo from './images/Logo.PNG'

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
                <Navbar  className= 'navigation' variant="dark" expand="lg" sticky="top" >
                    <Navbar.Brand>
                    <img src={Logo} className="logo mb-1 mr-3"></img>
                        <Link to="/">Code_Carry</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Form inline className="mr-5">
                                <FormControl onChange={this.handleInputChange} name='inputSearch' value={this.state.inputSearch} type="text" placeholder="Buscar" className="mr-sm-2" />
                                <Button variant="outline-secondary"><i className="fa fa-search mr-2" aria-hidden="true"></i>Buscar</Button>
                            </Form>
                            <Nav.Link as="span">
                                <NavLink to="/" exact activeStyle={{ color: 'black' }} className="mr-5">Inicio</NavLink>
                            </Nav.Link>


                            {this.props.loggedInUser ?
                                (
                                    <>
                                        <Nav.Link as="span">
                                            <NavLink to='/' onClick={this.logout} className="mr-5">Cerrar Sesión</NavLink>
                                        </Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as="span">
                                            <NavLink to="/auth/signup" activeStyle={{ color: 'black' }} className="mr-5">Registro</NavLink>
                                        </Nav.Link>
                                        <Nav.Link as="span">
                                            <NavLink to="/auth/login" activeStyle={{ color: 'black' }} className="mr-5">Inicio sesión</NavLink>
                                        </Nav.Link>
                                    </>
                                )
                            }
                            <Nav.Link as="span">
                                <NavLink to={this.props.loggedInUser ? `/profile/${this.props.loggedInUser._id}` : `/auth/login`} activeStyle={{ color: 'black' }} className="mr-5">Hola, {this.props.loggedInUser ? <><span>{this.props.loggedInUser.username}</span><img src={this.props.loggedInUser.imageUrl} className="imgNavbar ml-3"/></> : <><span>invitado</span><i className="fa fa-user-circle ml-2" aria-hidden="true"></i></>}</NavLink>
                            </Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

            </>
        )
    }
}

export default Navigation