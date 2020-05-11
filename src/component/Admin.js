import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import fire from "../config/Fire";

class Admin extends React.Component {
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
      <div>
        <h1>Admin</h1>
      </div>
    )
  };
}

export default Admin;
