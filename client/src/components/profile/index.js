import React, { Component } from 'react'
import ProfileService from './../../service/profileService'
import { Link } from 'react-router-dom'

class Profile extends Component {
    constructor (){
        super ()
        this.state = {
            user: undefined
        }
        this.ProfileService = new ProfileService ()
        
    }
    
    componentDidMount = () => {
        const user_id = this.props.match.params.user_id
        this.updateUser(user_id)
    }
    
    updateUser = user_id => {
        this.ProfileService
            .getTheUser(user_id)
            .then(response => this.setState({ user: response.data }))
            .catch (err => console.log(err))
    }

    render() {
        return (
            !this.state.user ? <h3>CARGANDO</h3> :
                
            <>
                
                    <h1>bienvenido a tu perfil {this.state.user.username}</h1>
                    <img src={this.state.user.image_url} ></img>
                    <Link className="btn btn-dark btn-md" to={`/profile/edit/${this.state.user._id}`} >Volver</Link>
                    
            </>
        )
    }
}

export default Profile