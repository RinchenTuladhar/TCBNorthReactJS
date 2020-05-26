import React, { Component } from 'react';
import fire from "../../config/Fire";

class Admin extends Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    if(this.authListener()){
      this.props.history.push('/login');
    }
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=> {
      return user;
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Admin</h1>
      </div>
    )
  };
}

export default Admin;
