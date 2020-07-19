import axios from 'axios'

export default class QuestionService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true
        })
    }

    allUsers = () => this.service.get('/')
    // login = credentials => this.service.post('/login', credentials)
    // signup = credentials => this.service.post('/signup', credentials)
    // logout = () => this.service.post('/logout')
    // isLoggedIn = () => this.service.get('/loggedin')
}