import React, { Component } from 'react'
import QuestionService from './../../service/questionService'
class Prueba extends Component {
    constructor (){
        super ()
        this.state = {
            
            users:undefined
        }
        this.QuestionService = new QuestionService()
    }

    componentDidMount = () => this.updateUsers()
    
    updateUsers = () => {
    this.QuestionService 
    .allUsers()
    .then(response => this.setState({users:response.data}))
    .catch(err => console.log({err}))

    }

    render() {
        
        console.log(this.state.users)
        return (
            <>

                <h1>esto es un coomponente</h1>
            </>
        )
    }
}

export default Prueba