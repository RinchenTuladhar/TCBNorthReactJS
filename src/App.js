import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

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
import Admin from "./component/admin/Dashboard";
import Footer from "./component/Footer";
import Events from "./component/Events";
import AdminNavbar from "./component/admin/AdminNavbar";
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
        {window.location.pathname === "/admin" ? <AdminNavbar/> : <Navbar/>}
        <Switch>
          <Route exact path="/" component={Home}/>
          { this.state.user ? <Route exact path="/admin" component={Admin}/> : <Route exact path="/login" component={Login}/> }
          <div className="squished">
            <Route exact path="/events" component={Events}/>
          </div>
        </Switch>
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        <Footer/>
      </Router>
      </div>
    );
  }
}

export default App;
