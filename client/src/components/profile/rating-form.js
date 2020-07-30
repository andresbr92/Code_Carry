import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
import Container from 'react-bootstrap/esm/Container'
import Logo from './images/Logo.PNG'

class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {

            userOwner: '',
            rating:'',
            comments:''
        
        }

        this.ProfileService = new ProfileService()
    }
    handleInputChange = e => {
        const { name, value } = e.target
        
        this.setState({
            [name]: value,
            
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        let searchName = undefined
        this.props.users[0] === this.props.loggedInUser.username ?  searchName = this.props.users[1] : searchName = this.props.users[0]
            this.ProfileService
            .findHelperUser(searchName,{
                rating:this.state.rating,
                comments:{
                    theComment:this.state.comments,
                    username:this.props.loggedInUser.username 
                }})
            .then(()=> this.props.handleModal(false))
            .catch(err => console.log(err))
             
    }
    checkPuntuation = rating => this.state.rating == rating || false
      
    handleChecks = (e) => e.target.checked ? this.setState({ rating: e.target.value }) : this.setState({ rating: !e.target.value })
    render() {
        return (

            <Container>
            <img src={Logo} className="img-form mb-3" />
                <h4>Puntúa la respuesta recibida de { this.props.users[0] === this.props.loggedInUser.username ? this.props.users[1] : this.props.users[0]}</h4>
                <hr />
                <Form onSubmit={this.handleFormSubmit}>
    
                    <Form.Group>
                        <Form.Label>Puntuaciones del 1 al 5</Form.Label>
                        <hr />
                        <Form.Check onChange={this.handleChecks} checked={this.checkPuntuation(1)} value = '1' inline label="1" name="rating" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkPuntuation(2)} value = '2' inline label="2" name="rating" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkPuntuation(3)} value='3' inline label="3" name="rating" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkPuntuation(4)} value='4' inline label="4" name="rating" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkPuntuation(5)} value='5' inline label="5" name="rating" type='checkbox' />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comentario</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.handleInputChange} value={this.state.comments} name="comments" type="text" placeholder='Escribe tu comentario'/>
                    </Form.Group>
                   
                    <Button  classname='botton'variant="dark" type="submit">Mandar puntuación</Button>
                </Form>
            </Container>
        )
    }
}
export default Rating