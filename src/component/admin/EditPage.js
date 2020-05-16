import React, { Component } from "react";
import firebase from "../../config/Fire";

import "./CreatePage.scss";

class EditPage extends Component{
  constructor(){
    super();

    var temp_nav_items = [];

    firebase.firestore().collection("pages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var doc_data = doc.data();

        if(doc_data.name !== undefined){
          temp_nav_items.push(doc_data);
        }
      });
    })

    this.state = {
      name: "",
      child: false,
      parent_name: "",
      nav_items: temp_nav_items
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
  }

  render(){
    return (
      <div className="container squished">
        <h1>Edit Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Page name
            {this.state.nav_items.map((item,i) => <p>{item.name}</p>)}
          </label>
          <br/><br/>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
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

export default EditPage;
