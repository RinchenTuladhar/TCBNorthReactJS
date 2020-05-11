import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from "./component/auth/Login";
import Admin from "./component/Admin";
import fire from "./config/Fire";

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: {

      }
    }
  }

  componentDidMount(){
      this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=> {
      if(user){
        this.setState({user});
      } else {
        this.setState({
          user: null
        });
      }
    });
  }
  render(){
    return (
      <div className="main">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          {this.state.user ? <Route exact path="/admin" component={Admin}/> : <Route exact path="/login" component={Login}/> }
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
