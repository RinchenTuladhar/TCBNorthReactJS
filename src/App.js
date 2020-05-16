import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from "./component/auth/Login";
import Footer from "./component/Footer";
import CustomPage from "./component/CustomPage";

import Admin from "./component/admin/Dashboard";
import AdminNavbar from "./component/admin/AdminNavbar";
import AdminCreatePage from "./component/admin/CreatePage";
import AdminEditPage from "./component/admin/EditPage";
import AdminEditNavigation from "./component/admin/EditNavigation";

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
        {window.location.pathname.includes("/admin")  ? <AdminNavbar/> : <Navbar/>}
        <Switch>
          <Route exact path="/" component={Home}/>
          
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/admin/create_page" component={AdminCreatePage}/>
          <Route exact path="/admin/edit_page" component={AdminEditPage}/>
          <Route exact path="/admin/edit_navigation" component={AdminEditNavigation}/>
          <Route exact path="/login" component={Login}/>
          <Route path="*" component={CustomPage}/>

        </Switch>
        <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        <Footer/>
      </Router>
      </div>
    );
  }
}

export default App;
