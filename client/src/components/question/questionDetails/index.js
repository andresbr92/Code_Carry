import React, { Component } from 'react'
import QuestionService from './../../../service/questionService'
import Spinner from './../../ui/spinner'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import Highlight from 'react-highlight.js'
import { v1 as uuid } from "uuid";
import Img1 from './images/js-logo.png'
import Img2 from './images/java.png'
import Img3 from './images/react.jpg'
import Img4 from './images/mongoDB.jpg'
import Img5 from './images/python.jpg'

class QuestionDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {

            questionDetails: undefined,
            video_idState:undefined


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

    resolveQuestion = () => {
        const video_id = uuid()
        this.setState({ video_idState: video_id })

        const question_id = this.state.questionDetails._id  
        this.componentDidMount()

        this.QuestionService
            .resolveQuestionBack(question_id, {
                video_id: video_id,
                match: [this.props.loggedInUser._id, this.state.questionDetails.userOwner]

            })
            .then()
            .catch(err => console.log(err))
        
    }
   
    render() {
        return (


            !this.state.questionDetails ? <Spinner /> :
                

                <Container as="main" className="text-white">

                    <h1 className="text-center">{this.state.questionDetails.title}</h1>
                    <hr className="hr-home" />
                    <Row>
                        <Col md={{ span: 5, offset: 1 }}>
                            <p><b>Pregunta: </b> {this.state.questionDetails.description} </p>
                            <hr className="hr-home ml-5" />
                            <h5 className="mb-5 mt-5">Lenguaje de programacion:  {this.state.questionDetails.skill} </h5>
                            

                        </Col>
                        <Col md={{ span: 4, offset: 1 }} className="mb-5">
                        {this.state.questionDetails.skill === 'javascript' && <img src={Img1} alt={this.state.questionDetails.title} />}
                        {this.state.questionDetails.skill === 'java' && <img src={Img2} alt={this.state.questionDetails.title} />}
                        {this.state.questionDetails.skill === 'react' && <img src={Img3} alt={this.state.questionDetails.title} />}
                        {this.state.questionDetails.skill === 'mongodb' && <img src={Img4} alt={this.state.questionDetails.title} />}
                        {this.state.questionDetails.skill === 'python' && <img src={Img5} alt={this.state.questionDetails.title} />}  
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {this.state.questionDetails.code && <pre> <code>  <p><Highlight>{this.state.questionDetails.code}</Highlight> </p></code></pre>}
                        </Col>
                    </Row>

                    <Button onClick={this.props.history.goBack} className="botton">Volver</Button>
                    {/* TODO hay que redirigir al chat con el usuario propietario de la pregunta */}
                    {this.props.loggedInUser && this.props.loggedInUser._id != this.state.questionDetails.userOwner ? <Button className="botton ml-5" onClick={this.resolveQuestion}>Resolver pregunta</Button> : null}
                    
                    {this.state.questionDetails.tryHelp && <Link className="botton red-chat ml-5 " to={`/chat/${this.state.questionDetails.video_id}`}><span className="p-4">IR AL CHAT</span></Link>}

                </Container>

        )
    }
}

export default QuestionDetails