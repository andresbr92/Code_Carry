
import React, { Component } from 'react'
import QuestionService from '../../../service/questionService';
import CuestionCard from './questionCard'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import NewQuestion from '../../question/formQuestions';
import Button from 'react-bootstrap/Button'

class Home extends Component{
constructor(props){
    super(props)

    this.state={

        questions:undefined,
        showModal: false

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
//////////////Pegar aki el questionRemove
handleModal = status => this.setState({ showModal: status })

handleQuestionSubmit = () => {
    this.handleModal(false)
    this.updateQuestionsList()
}

render(){
    return (
        <>

                    {
                        this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Crear nuevo item</Button>
                    }

        <h1>Bienvenido a CODE_CARRY</h1>
        <hr></hr>
        <Container as="main" className="home-page">

         {!this.state.questions ? <h2>Cargando...</h2> :

        <Row>
            {this.state.questions.map(elm => <CuestionCard key={elm._id} {...elm} />)}
        </Row>
}
        </Container>

        <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <NewQuestion handleQuestionSubmit={this.handleQuestionSubmit} loggedInUser={this.props.loggedInUser} handleModal={this.handleModal} {...this.props}/>
                    </Modal.Body>
                </Modal>


       </>
    )
}

}


export default Home