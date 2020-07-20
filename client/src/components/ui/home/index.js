
import React, { Component } from 'react'
import QuestionService from '../../../service/questionService';
import CuestionCard from './questionCard'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'



class Home extends Component{
constructor(props){
    super(props)

    this.state={

        questions:undefined

    }
    this.QuestionService = new QuestionService()
}

componentDidMount = () => this.updateQuestionsList()

updateQuestionsList = () => {
    this.QuestionService
        .allQuestions()
        .then(response => {this.setState({ questions: response.data })})
        .catch(err => console.log(err))
}

render(){
    console.log(this.state.questions)
    return (
        <>
        <h1>Bienvenido a CODE_CARRY</h1>
        <hr></hr>
        <Container as="main" className="home-page">

         {!this.state.questions ? <h2>Cargando...</h2> :

        <Row>
            {this.state.questions.map(elm => <CuestionCard key={elm._id} {...elm} />)}
        </Row>
}
        </Container>
       </>
    )
}

}


export default Home