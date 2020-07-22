import React, { Component } from 'react'
import ProfileService from './../../../service/profileService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
import Container from 'react-bootstrap/esm/Container'

class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            skill: '',
            code:'',
            description: '',
            image_url: '',
            userOwner: ''
        }
        this.ProfileService = new ProfileService()
    }
    handleInputChange = e => {
        const { name, value } = e.target
        
        this.setState({
            [name]: value,
            userOwner: this.props.loggedInUser._id,
        })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.ProfileService
            .makeQuestion(this.state)
            .then(()=> this.props.handleModal(false))
            .catch(err => console.log(err))
             
    }
    checkLanguage = language => this.state.skill == language || false
      
    handleChecks = (e) => e.target.checked ? this.setState({ skill: e.target.value }) : this.setState({ skill: !e.target.value })
    render() {
        return (
            <Container>
                <h3>Nueva pregunta</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Pregunta sobre  </Form.Label>
                        <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('javascript')} value='javascript' inline label="javascript" name="skill" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('java')} value='java' inline label="java" name="skill" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('react')} value='react' inline label="react" name="skill" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('mongodb')} value='mongodb' inline label="mongodb" name="skill" type='checkbox' />
                        <Form.Check onChange={this.handleChecks} checked={this.checkLanguage('python')} value='python' inline label="python" name="skill" type='checkbox' />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>El codigo</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={this.handleInputChange} value={this.state.code} name="code" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.image_url} name="image_url" type="text" />
                    </Form.Group>
                    <Button variant="dark" type="submit">Hacer pregunta</Button>
                </Form>
            </Container>
        )
    }
}
export default NewQuestion