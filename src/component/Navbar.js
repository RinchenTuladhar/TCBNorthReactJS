import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../config/Fire";
import "./Navbar.scss"

class Navbar extends React.Component{
  constructor(){
    super();

    this.logout = this.logout.bind(this);
  }

  logout(){
    firebase.auth().signOut().then(function() {
      return <Redirect to="/"/>;
    }).catch(function(error) {
      // An error happened.
    });
  }

  render(){
    return(
        <nav className="main-navbar">
          <ul className="menu">
            <li className="logo">
              [Logo]
            </li>
            <li className="item">
              <a href="/">Home</a>
            </li>
            <li className="item">
              <a href="#">Events</a>
            </li>
            <li className="item">
              <a href="#">Fundraising</a>
            </li>
            <li className="item">
              <a href="#">Contact Us</a>
            </li>
              <li className="item">
              { firebase.auth().currentUser ?
                <a href="#" onClick={this.logout}>Logout</a> : <a href="/login">Login</a>
              }
              </li>
          </ul>
        </nav>
    )
  };
}

export default Navbar;
