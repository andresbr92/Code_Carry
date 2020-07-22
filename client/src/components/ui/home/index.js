
import React, { Component } from 'react'
import QuestionService from '../../../service/questionService';
import CuestionCard from './questionCard'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'



class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

            questions: undefined,
            
        }
        this.QuestionService = new QuestionService()
    }


    componentDidMount = () => this.updateQuestionsList()

    updateQuestionsList = () => {
        this.QuestionService
            .allQuestions()
            .then(response => { this.setState({ questions: response.data }) })
            .catch(err => console.log(err))

    }

    render() {
        return (
            <>
                <h1>Bienvenido a CODE_CARRY</h1>
                <hr></hr>
                <Container as="main" className="home-page">

                    {!this.state.questions ? <h2>Cargando...</h2> :

                        <Row>
                            {this.state.questions.filter((elm) => elm.title.toLowerCase().includes(this.props.handleSearch)).map((elm, idx) => <CuestionCard {...elm} key={idx}  handleChange={() => this.handleInputChange(idx)} />)}
                            
                        </Row>
                    }
                </Container>
            </>
        )
    }

}


export default Home