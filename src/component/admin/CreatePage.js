import React, { Component } from "react";
import firebase from "../../config/Fire";

import "./CreatePage.scss";

class CreatePage extends Component{
  constructor(){
    super();

    this.state = {
      name: "",
      child: false,
      parent_name: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.name === "child"){
      const isChild = event.target.value === "yes" ? false : true;

      this.setState({
        child: isChild
      });

    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const db = firebase.firestore();

    const child = this.state.child;
    const name = this.state.name;
    const parent_name = this.state.child;

    db.collection("pages").where("name", "==", this.state.name).get().then(function(querySnapshop){
      if(querySnapshop.size === 0){
        db.collection("pages").add({
          child: child,
          name: name,
          parent_name: parent_name
        });
      } else {
        console.log("Exists!");
      }
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Create Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Page name
            <br/>
            <input type="text" name="name" onChange={this.handleChange}/>
          </label>
          <br/><br/>

          <label>Main navigation?</label>
          <br/>
          <label>Yes<input type="radio" id="yes" name="child" value="yes" onChange={this.handleChange} checked/></label>
          <label>No<input type="radio" id="no" name="child" value="no" onChange={this.handleChange}/></label>
          <br/>
          <br/>

          <label>If no, which page does this belong to:
            <input type="text" name="parent_name" onChange={this.handleChange}/>
          </label>
          <br/>
          <input type="submit" value="Create"/>
        </form>
      </div>
    );
  }

}

export default CreatePage;
