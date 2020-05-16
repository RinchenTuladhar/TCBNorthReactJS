import React, { Component } from "react";
import NotFound from "./NotFound";
import firebase from "../config/Fire";

class CustomPage extends Component {
    constructor(){
      super();

      this.state = {}
    }

    componentDidMount(){
      const url = window.location.pathname.replace("/","")
      const db = firebase.firestore();
      var notFound = false;

      db.collection("pages").where("url", "==", url).get().then(function(querySnapshop){
        if(querySnapshop.size === 0){
          notFound = true;
        } else {
          console.log("Exists!");
        }
      });

      if(notFound){
        this.setState({
          redirect: true
        });
      }
    }

    render(){
      if(this.state.redirect){
        return (
          <div className="squished">
            <NotFound/>
          </div>
        )
      } else {
        return (
          <div className="squished">
            <h1> Custom Page </h1>
          </div>
        )
      }

    }
}

export default CustomPage;
