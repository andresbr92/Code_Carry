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
import ChatPrueba from './ui/chatPrueba/chatPrueba';
import Home from './ui/home'
import FooterPagePro from './ui/footer'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: ''
      }
    }
    this.AuthService = new AuthService()

  }
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
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />

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
          
          <Route exact path='/question/details/:question_id' render={props => <QuestionDetails {...props} />} />
          
          <Route exact path='/home' render={props => <Home {...props} /> } />
          {/* EN DESARROLLO */}
          <Route exact path='/chat' render={props => <ChatPrueba {...props} />} />
        </Switch>
        <FooterPagePro setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser}/>
      </>
    )
  }
}

export default App
