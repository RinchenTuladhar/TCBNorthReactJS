import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../config/Fire";
import "./Navbar.scss"

class Navbar extends Component{
  constructor(){
    super();

    this.state = {
      backgroundColor: "trasparent",
      nav_items: []
    }

    this.loadNavbarItems = this.loadNavbarItems.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    this.loadNavbarItems()
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

  loadNavbarItems(){
    const that = this;

    firebase.firestore().collection("pages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var doc_data = doc.data();

        if(doc_data.name !== undefined){
          that.setState({
            nav_items: [...that.state.nav_items, doc_data]
          });
        }
      });
    })
  }

  logout(){
    firebase.auth().signOut().then(function() {
      return <Redirect to="/"/>;
    });
  }

  render(){
    const navbar_items = this.state.nav_items.map((item,i) =>
      <li className="item" key={i}>
        <a href={item.url} style={{color: this.state.color}}>{item.name}</a>
      </li>
    )

    return(
        <nav className="main-navbar" style={{backgroundColor: this.state.backgroundColor, position: this.state.position}}>
          <ul className="menu">
            <li className="logo">
              <a href="/"><img src="img/tibetanlogo.png" alt="TCB North UK Logo"/></a>
            </li>

            {navbar_items}

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
