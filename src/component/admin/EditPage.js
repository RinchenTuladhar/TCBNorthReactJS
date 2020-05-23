import React, { Component } from "react";
import ReactDOM from 'react-dom';

import firebase from "../../config/Fire";
import EditPageContent from "./EditPageContent";

import "./EditPage.scss";

class EditPage extends Component{
  constructor(){
    super();

    this.state = {
      name: "",
      nav_items: []
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
    const url = this.state.url;
  }

  componentDidMount(){
    const current_component = this;

    const ref = firebase.firestore().collection("pages")
    .get()
    .then(querySnapshot => {
      const temp_nav_items = [];
      querySnapshot.forEach(function(doc){
        const data = doc.data();

        if(data.name !== undefined){
          temp_nav_items.push(data);
        }
      });
      this.setState({
        nav_items: temp_nav_items
      });
    })
  }

  render(){
    return (
      <div className="container squished">
      <h1> Click page to edit:</h1>
      {
        this.state.nav_items.map(v => {
          return (
            <div className="page"><p><a href={v.url + "/edit"}>{v.name}</a></p></div>
          );
        })
      }
      </div>
    );
  }

}

export default EditPage;
