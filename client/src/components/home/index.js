
import React, { Component } from 'react'
import QuestionService from './../../service/questionService';
import CuestionCard from './questionCard'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import NewQuestion from './../question/formQuestions';
import Button from 'react-bootstrap/Button'
import Spinner from './../ui/spinner'
import LogoBlanco from './images/LogoBlanco.PNG'


class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

            questions: undefined,
            showModal: false,
            questionsFiltered:''
           
        }

        this.QuestionService = new QuestionService()
    }

    componentDidMount = () => this.updateQuestionsList()

    updateQuestionsList = () => {
        this.QuestionService
            .allQuestions()
            .then(response => {
                console.log (response)
                this.setState({
                     questions: response.data,
                     questionsFiltered: response.data
                
                })
            })
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    handleQuestionSubmit = () => {
        this.handleModal(false)
        this.updateQuestionsList()
    }

    filterQuestion = language => {
       
        let result=[...this.state.questions]
        
            result = result.filter((lang) => lang.skill === language)
            console.log(result)
            this.setState({ questionsFiltered: result }) 
            
            }
    
    render() {
        
        return (
            <>
                <h1 className="titular">Bienvenido a CODE_CARRY<img className="logoBlanco ml-3" src={LogoBlanco}/></h1>
                <hr className='hr-principal' />
                <Container fluid as="main" className="mr-4">
                    {!this.state.questions ? <Spinner /> :

                     <Row>
                        <Col md={2}>
                        <Nav className="flex-column text-center mt-5 nav-lateral">
                        {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }} className="botton blue ml-4 mb-5">Hacer pregunta <i className="fa fa-commenting-o ml-2" aria-hidden="true"></i></Button>}
                            <Nav.Link onClick={() => this.updateQuestionsList()}>Todos los lenguajes</Nav.Link><hr className="hr-home" />
                            <Nav.Link onClick={() => this.filterQuestion("javascript")}>JavaScript</Nav.Link><hr className="hr-home" />
                            <Nav.Link onClick={() => this.filterQuestion("java")}>Java</Nav.Link><hr className="hr-home" />
                            <Nav.Link onClick={() => this.filterQuestion("react")}>React</Nav.Link><hr className="hr-home" />
                            <Nav.Link onClick={() => this.filterQuestion("mongodb")}>MongoDB</Nav.Link><hr className="hr-home" />
                            <Nav.Link onClick={() => this.filterQuestion("python")} >Python</Nav.Link>
                        </Nav>
                        </Col>

                        <Col  md={9}>
                        <h3 className="text-center text-home">“Los programadores hicimos un trato con Dios, el no hace sistemas y nosotros no hacemos milagros”</h3>
                           <Row>
                              {this.state.questionsFiltered.filter((elm) => elm.title.toLowerCase().includes(this.props.handleSearch)).map((elm, idx) => <CuestionCard {...elm} key={idx} handleChange={() => this.handleInputChange(idx)} />)}
                           </Row>
                        </Col>  
                    </Row>
                    }
                </Container>
                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <NewQuestion handleQuestionSubmit={this.handleQuestionSubmit} loggedInUser={this.props.loggedInUser} handleModal={this.handleModal} updateQuestionsList={this.updateQuestionsList} {...this.props} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Home

