import React, { Component } from "react";
import firebase from "../config/Fire";

class CustomPageContent extends Component {
  constructor(){
    super();

    this.state = {
      content: "",
      url: window.location.href.split("/")[3]
    }
  }

  componentDidMount(){
    const that = this;
    const db = firebase.firestore();

    db.collection("page_content").where("page_name", "==", this.state.url).get().then(function(querySnapshot){
      if(querySnapshot.size > 0){
        querySnapshot.forEach(function(doc){
          that.setState({
            content: doc.data().content
          });
        });
      }
    });
  }

  render(){
    const html_content = this.state.content

    return (
      <div className="squished">
        <div dangerouslySetInnerHTML={{__html: html_content}}/>
      </div>
    )
  }
}

export default CustomPageContent;
