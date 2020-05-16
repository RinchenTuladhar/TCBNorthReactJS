import React, { Component } from "react";
import firebase from "../../config/Fire";

import "./CreatePage.scss";

class CreatePage extends Component{
  constructor(){
    super();

    this.state = {
      name: "",
      child: false,
      parent_name: "",
      url: ""
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

    const form_data = this.state

    db.collection("pages").where("name", "==", this.state.name).get().then(function(querySnapshop){
      if(querySnapshop.size === 0){
        db.collection("pages").add({
          child: form_data.child,
          name: form_data.name,
          parent_name: form_data.parent_name,
          url: form_data.url
        });
      } else {
        console.log("Exists!");
      }
    });
  }

  render(){
    return (
      <div className="container squished">
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

          <label>If yes, state url, e.g "events":
            <br/>
            <input type="text" name="url" onChange={this.handleChange}/>
          </label>
          <br/><br/>

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
