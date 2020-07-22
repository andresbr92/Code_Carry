import axios from 'axios'

export default class ProfileService {

    constructor() {

        this.service = axios.create({
            baseURL: 'http://localhost:5000/profile',
            withCredentials: true
        })
    }

    getTheUser = user_id => this.service.get(`/${user_id}`)
    getDataUser = user_id => this.service.get(`/edit/${user_id}`)
    editUser = (id, username) => this.service.post(`/edit/${id}`, username)
    makeQuestion = question => this.service.post(`/question/new`, question)
    findUserQuestion = user_id => this.service.get()
    
}