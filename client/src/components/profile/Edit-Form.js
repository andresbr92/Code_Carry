import React, { Component } from 'react'
import ProfileService from './../../service/profileService'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class EditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            role: '',
            editing: true
        }

        this.ProfileService = new ProfileService()
    }

    componentDidMount = () => {
        const user_id = this.props.match.params.user_id

        this.state.editing && this.updateUser(user_id)

    }

    updateUser = user_id => {

        this.ProfileService
            .getDataUser(user_id)
            .then(response => {
                console.log(response.data.email)
                this.setState({

                    username: response.data.username,
                    role: response.data.role,
                    editing: false,
                })
            })

            .catch(err => console.log(err))
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.ProfileService
            .editUser(this.props.match.params.user_id, {
                username: this.state.username,
                role: this.state.role
            })
            .then(res => console.log(this.state.username))
            .catch(err => console.log(err))
    }




    render() {
        return (
            this.state.editing ? <h3>CARGANDO</h3> :
                <>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>

                            <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                            <Form.Control onChange={this.handleInputChange} value={this.state.role} name="role" type="text" />


                            <Button variant="dark" type="submit">Submit</Button>

                        </Form.Group>
                    </Form>


                </>
        )
    }
}

export default EditForm