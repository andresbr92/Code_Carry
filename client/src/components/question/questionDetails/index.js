import React, { Component } from 'react'
import QuestionService from './../../../service/questionService'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

class QuestionDetails extends Component {

    constructor() {
        super()
        this.state = {

            questionDetails: undefined

        }

        this.QuestionService = new QuestionService()

    }

    componentDidMount = () => {

        const id = this.props.match.params.question_id

        this.QuestionService
            .getOneQuestion(id)
            .then(response => this.setState({ questionDetails: response.data }))
            .catch(err => console.log(err))
    }


    render() {
        console.log (this.state.questionDetails)
        return (

            !this.state.questionDetails ? <h3>CARGANDO</h3> :

                <Container as="main">

                    <h1>{this.state.questionDetails.title}</h1>

                    <Row>
                        <Col md={{ span: 5, offset: 1 }}>
                            <p><b>Detalles: </b> {this.state.questionDetails.description}</p>
                            <hr></hr>
                            <h5>Estas son tus habilidades: {this.state.questionDetails.skill.map((elm) => <p>{elm}</p>)}</h5>
                            <hr></hr>
                            <Link className="btn btn-dark btn-md" to={`/profile/${this.state.questionDetails.userOwner}`}>Volver</Link>
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <img src={this.state.questionDetails.image_url} alt={this.state.questionDetails.title} />
                        </Col>
                    </Row>

                </Container>

        )
    }
}

export default QuestionDetails