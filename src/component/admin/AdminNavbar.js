import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import firebase from "../../config/Fire";

class AdminNavbar extends Component {
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
              <p><strong><u>Admin</u></strong></p>
            </li>
            <li className="item">
              <a href="/admin">Dashboard</a>
            </li>
            <li className="item">
              <a href="/admin/create_page">Create Page</a>
            </li>
            <li className="item">
              <a href="/admin/edit_page">Edit Page</a>
            </li>
            <li className="item">
              <a href="/admin/edit_navigation">Edit Navigation</a>
            </li>
            <li className="item logout">
              <a href="/" onClick={this.logout}>Logout</a>
            </li>
          </ul>
        </nav>
    )
  };
}

export default AdminNavbar;
