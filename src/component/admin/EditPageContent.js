import React, { Component } from "react"
import TextEditor from "./text_editor/CustomToolbarEditor";
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';
import {Editor, EditorState, convertToRaw, convertFromRaw, createWithContent, RichUtils } from 'draft-js';
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

  componentDidMount(){
    const that = this;
    const db = firebase.firestore();

    db.collection("page_content").where("page_name", "==", this.state.url).get().then(function(querySnapshop){
      if(querySnapshop.size > 0){
        querySnapshop.forEach(function(doc){
          const raw_content = convertFromRaw(JSON.parse(doc.data().content));
          that.setState({
            editorState: EditorState.createWithContent(raw_content)
          });
        });
      }
    });
  }

  makeBold(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  handleSubmit(e){
    e.preventDefault();
    const db = firebase.firestore();
    const form_data = this.state
    const converted_content = JSON.stringify(convertToRaw(form_data.editorState.getCurrentContent()));


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
          content: converted_content
        });
      }
    });
  }

  render(){
    const toolbarPlugin = createToolbarPlugin();
    const editorState = this.state.editorState

    return (
      <form onSubmit={this.handleSubmit}>
        <button onClick={() => {this.makeBold();}}>Bold</button>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
         />

        <input type="submit" value="Save"/>
      </form>
    )
  }
}

export default EditPageContent;
