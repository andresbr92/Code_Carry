import axios from 'axios'

export default class QuestionService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true
        })
    }

    allUsers = () => this.service.get('/')
    getOneQuestion = question_id => this.service.get(`/question/details/${question_id}`)
    allQuestions = () => this.service.get('/question')
    removeQuestion = question_id => this.service.post(`/question/delete/${question_id}`)
    resolveQuestionBack = question_id => this.service.post(`question/tryHelp/${question_id}`)
}