import React, { Component } from "react";
import ReactDOM from 'react-dom';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';
import {Editor, EditorState} from 'draft-js';
import TextEditor from "./text_editor/CustomToolbarEditor";
import firebase from "../../config/Fire";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import "./EditPage.scss";

class EditPage extends Component{
  constructor(){
    super();

    this.state = {
      name: "",
      editorState: EditorState.createEmpty(),
      nav_items: []
    }

    this.onChange = editorState => this.setState({editorState});
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
    const toolbarPlugin = createToolbarPlugin();

    return (
      <div className="container squished">
      <h1>Edit Page Content</h1>
        <form onSubmit={this.handleSubmit}>
          <select id="pages">
          {
            this.state.nav_items.map(v => {
              return (
                <option value={v.name}>{v.name}</option>
              );
            })
          }
          </select>

          <TextEditor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={[toolbarPlugin]}
           />

          <input type="submit" value="Create"/>
        </form>
      </div>
    );
  }

}

export default EditPage;
