import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../config/Fire";
import "./Navbar.scss"

class Navbar extends React.Component{
  constructor(){
    super();

    this.state = {
      backgroundColor: "trasparent"
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(window.location.pathname == "/"){
      this.setState({ color: "white", position: "fixed" });

      document.addEventListener("scroll", () => {
        const backgroundcolor = window.scrollY > 100 ? "white" : "transparent"
        const color = window.scrollY > 100 ? "black" : "white"

        this.setState({
          backgroundColor: backgroundcolor,
          color: color
        });

      });
    }
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
        <nav className="main-navbar" style={{backgroundColor: this.state.backgroundColor, position: this.state.position}}>
          <ul className="menu">
            <li className="logo">
              <a href="/"><img src="img/tibetanlogo.png"/></a>
            </li>
            <li className="item">
              <a href="/events" style={{color: this.state.color}}>Events</a>
            </li>
            <li className="item">
              <a href="#" style={{color: this.state.color}}>Fundraising</a>
            </li>
            <li className="item">
              <a href="#" style={{color: this.state.color}}>Contact Us</a>
            </li>
            <li className="item logout">
            { firebase.auth().currentUser ?
              <a href="/" onClick={this.logout} style={{color: this.state.color}}>Logout</a> : <a href="/login" style={{color: this.state.color}}>Login</a>
            }
            </li>
          </ul>
        </nav>
    )
  };
}

export default Navbar;
