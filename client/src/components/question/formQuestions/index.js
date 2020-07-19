import React, { Component } from 'react'
import ProfileService from './../../../service/profileService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'

class NewQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            skills: [],
            description: '',
            image_url: '',
            userOwner: ''

        }
        this.ProfileService = new ProfileService()

    }

    handleInputChange = e => {
        //TODO hay que preguntar lo de los checkboxes del demonio

        const { name, value } = e.target

        console.log (e.target.checked)
        this.setState({
            [name]: value,
            userOwner: this.props.loggedInUser._id,
            
        })
    }

    handleFormSubmit = e => {

        e.preventDefault()
        this.ProfileService
            .makeQuestion(this.state)
            .then()
            .catch(err => console.log(err))
    }

    render() {

        return (
            <>
                <h3>Nueva pregunta</h3>
                <hr></hr>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Lenguajes</Form.Label>
                        {/* Hacer un select y options */}
                        <Form.Check onChange={this.handleInputChange} value={this.state.skills} name="skills" type="checkbox" label="javascript" />

                        {/* <Form.Control onChange={this.handleInputChange} value={this.state.skills} name="skills" type="text" /> */}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>


                        <Form.Control onChange={this.handleInputChange} value={this.state.description} name="description" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.image_url} name="image_url" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">Hacer pregunta</Button>
                </Form>
            </>
        )
    }
}

export default NewQuestion