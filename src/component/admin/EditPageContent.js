import React, { Component } from "react"
import TextEditor from "./text_editor/CustomToolbarEditor";
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';
import {Editor, EditorState} from 'draft-js';

class EditPageContent extends Component {
  constructor(props){
    super();
    this.state = {
      url: props.url,
      editorState: EditorState.createEmpty()
    }

    this.onChange = editorState => this.setState({editorState});
  }

  render(){
    const toolbarPlugin = createToolbarPlugin();

    return (
      <form onSubmit={this.handleSubmit}>
        <TextEditor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={[toolbarPlugin]}
         />

        <input type="submit" value="Create"/>
      </form>
    )
  }
}

export default EditPageContent;
