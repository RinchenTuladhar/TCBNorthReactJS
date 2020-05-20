import React, { Component } from "react";
import { EditorState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import "draft-convert";
import firebase from "../config/Fire";

class CustomPageContent extends Component {
  constructor(){
    super();

    this.state = {
      content: EditorState.createEmpty(),
      url: window.location.href.split("/")[3]
    }
  }

  componentDidMount(){
    const that = this;
    const db = firebase.firestore();

    db.collection("page_content").where("page_name", "==", this.state.url).get().then(function(querySnapshot){
      if(querySnapshot.size > 0){
        querySnapshot.forEach(function(doc){
          const raw_content = convertFromRaw(JSON.parse(doc.data().content));
          const editorState = EditorState.createWithContent(raw_content);

          that.setState({
            content: editorState
          });
        });
      }
    });
  }

  render(){
    const html_content = stateToHTML(this.state.content.getCurrentContent());
    return (
      <div className="squished">
        <div dangerouslySetInnerHTML={{__html: html_content}}/>
      </div>
    )
  }
}

export default CustomPageContent;
