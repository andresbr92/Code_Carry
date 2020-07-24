import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthService from './../service/authService'

//COMPONENTES
import NewQuestion from './../components/question/formQuestions/index'
import Profile from './profile'
import EditForm from './profile/Edit-Form'
import Navigation from './../components/ui/navBar'
import LoginForm from './../components/auth/loginForm'
import SignupForm from './../components/auth/signUpForm'
import QuestionDetails from './question/questionDetails';
import ChatPrueba from './ui/codeMirror/codeMirror';
import Home from './ui/home'
import FooterPagePro from './ui/footer'


//TODO como hacer que la pregunta se vuelva privada solo para esaas dos personas
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: '',

      },
      filteredSearch: ''
    }
    this.AuthService = new AuthService()

  }

  handleSearch = inputSearch => this.setState({ filteredSearch: inputSearch })
   // const filtered = this.state.filteredSearch.filter((elm) => elm.name.toLowerCase().includes(inputSearch))
  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }
  render() {
    return (
      <>

        <Navigation handleSearch={this.handleSearch} setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

        <Switch>

          {/* AUTH */}
          <Route exact path="/auth/signup" render={props => <SignupForm {...props} setTheUser={this.setTheUser} />} />
          <Route exact path="/auth/login" render={props => <LoginForm {...props} setTheUser={this.setTheUser} />} />


          {/* PROFILE */}
          <Route exact path='/profile/edit/:user_id' render={props =>
            this.state.loggedInUser ? <EditForm loggedInUser={this.state.loggedInUser} {...props} /> : <Redirect to='/auth/login' />} />

          <Route exact path="/profile/:user_id" render={props =>
            this.state.loggedInUser ? <Profile {...props} loggedInUser={this.state.loggedInUser} /> : <Redirect to='/auth/login' />} />

          <Route exact path='/question/new/:user_id' render={props =>
            this.state.loggedInUser ? <NewQuestion {...props} loggedInUser={this.state.loggedInUser} /> : <Redirect to='/auth/login' />} />

          <Route exact path='/question/details/:question_id' render={props => <QuestionDetails loggedInUser={this.state.loggedInUser} {...props} />} />

          <Route exact path='/' render={props => <Home handleSearch={this.state.filteredSearch} loggedInUser={this.state.loggedInUser}  {...props} />} />
          {/* EN DESARROLLO */}
          
          <Route exact path='/chat/:video_id' render={props => <ChatPrueba loggedInUser={this.state.loggedInUser} {...props} />} />
      
        </Switch>
        <FooterPagePro setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
      </>
    )
  }
}

export default App
