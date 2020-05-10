import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import fire from "../config/Fire";

class Admin extends React.Component {
  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    var user = fire.auth().currentUser;

    if(!user){
      return <Redirect to="/"/>;
    }
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
