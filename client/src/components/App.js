import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import ComponentePrueba from './../components/pruebaRuta/componentePrueba'
import Profile from './profile'
import EditForm from './profile/Edit-Form'

function App() {
  return (
    <>
      <Route exact path='/profile/edit/:user_id' render={props => <EditForm {...props} />} />
      <Route exact path='/profile/:user_id' render={props => <Profile {...props} />} />
      <Route exact path = '/home' render = {() => <ComponentePrueba />} />
    </>
  );
}

export default App;
