import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


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
                                <Link className="btn btn-dark btn-md" to={`/profile/edit/${this.state.user._id}`} >Editar perfil</Link>
                            </Col>
                            <Col md={{ span: 4, offset: 1 }}>
                                <h3>Email: {this.state.user[0].email}</h3>
                                <h4>Hablidades en: {this.state.user[0].skill.map((elm, idx) => <p>{elm}</p>)}</h4>
                                
                                <h4>las preguntas de este usuario: {this.state.user[1].map((elm) => <p>titulo :{elm.title}</p>)}</h4>
                                
                                

                            </Col>
                        </Row>
                    </Container>
                </>
        )
    }
}

export default Profile