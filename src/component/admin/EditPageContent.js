import React, { Component } from "react"
import TextEditor from "./text_editor/CustomToolbarEditor";
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';
import {Editor, EditorState, convertToRaw } from 'draft-js';
import firebase from "../../config/Fire";

class EditPageContent extends Component {
  constructor(props){
    super();
    this.state = {
      url: props.url,
      editorState: EditorState.createEmpty()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = editorState => this.setState({editorState: editorState});
  }

  handleSubmit(e){
    e.preventDefault();
    const db = firebase.firestore();
    const form_data = this.state
    const blocks = convertToRaw(form_data.editorState.getCurrentContent()).blocks;

    db.collection("page_content").where("url", "==", this.state.url).get().then(function(querySnapshop){
      if(querySnapshop.size > 0){
        querySnapshop.forEach(function(doc){
          db.collection("page_content").doc(doc.id).update({
            content: this.state.editorState
          });
        })
      } else {
        db.collection("page_content").add({
          page_name: form_data.url,
          content: blocks
        });
      }
    });
  }

  render(){
    const toolbarPlugin = createToolbarPlugin();

    return (
      <form onSubmit={this.handleSubmit}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[toolbarPlugin]}
         />

        <input type="submit" value="Save"/>
      </form>
    )
  }
}

export default EditPageContent;
