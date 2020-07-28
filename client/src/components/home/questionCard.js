import React from 'react'

import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Highlight from 'react-highlight.js'


const QuestionCard = ({ _id, title, image_url, code }) => {


    return (
        <Col md={4}>
            <Card className="questions-card mb-5 bg-light">
                
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {code && <Highlight> <div className="cardCode">{code}</div></Highlight>}
                    <Link to={`/question/details/${_id}`} className="btn btn-dark btn-block btn-sm">Ver detalles</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default QuestionCard