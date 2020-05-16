import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../config/Fire";
import "./Navbar.scss"

class Navbar extends Component{
  constructor(){
    super();

    var temp_nav_items = []

    firebase.firestore().collection("pages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var doc_data = doc.data();

        if(doc_data.name !== undefined){
          temp_nav_items.push(doc_data);
        }
      });
    })

    this.state = {
      backgroundColor: "trasparent",
      nav_items: temp_nav_items
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    if(window.location.pathname === "/"){
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
    });
  }

  render(){

    return(
        <nav className="main-navbar" style={{backgroundColor: this.state.backgroundColor, position: this.state.position}}>
          <ul className="menu">
            <li className="logo">
              <a href="/"><img src="img/tibetanlogo.png" alt="TCB North UK Logo"/></a>
            </li>

            {this.state.nav_items.map((item,i) => <li className="item" key={i}><a href={item.name} style={{color: this.state.color}}>{item.name}</a></li>)}

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
