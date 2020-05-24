import React, { Component } from "react"
import firebase from "../../config/Fire";
import { Editor } from '@tinymce/tinymce-react';

class EditPageContent extends Component {
  constructor(props){
    super();
    this.state = {
      url: props.url,
      content: ""
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const that = this;
    const db = firebase.firestore();

    db.collection("page_content").where("page_name", "==", this.state.url).get().then(function(querySnapshop){
      if(querySnapshop.size > 0){
        querySnapshop.forEach(function(doc){
          that.setState({
            content: doc.data().content
          });
        });
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const db = firebase.firestore();
    const form_data = this.state;

    db.collection("page_content").where("page_name", "==", this.state.url).get().then(function(querySnapshop){
      if(querySnapshop.size > 0){
        querySnapshop.forEach(function(doc){
          db.collection("page_content").doc(doc.id).update({
            content: form_data.content
          });
        })
      } else {
        db.collection("page_content").add({
          page_name: form_data.url,
          content: form_data.content
        });
      }
    });
  }

  handleEditorChange = (e) => {
    this.setState({
      content: e.target.getContent()
    });
  }

  render(){
    const editor_content =  this.state.content;

    return (
      <form onSubmit={this.handleSubmit}>
        <Editor
        value={editor_content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | link image'
        }}
        onChange={this.handleEditorChange}
      />

        <input type="submit" value="Save"/>
      </form>
    )
  }
}

export default EditPageContent;
