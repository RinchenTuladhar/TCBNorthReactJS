import React, { Component } from "react";
import NotFound from "./NotFound";
import EditPageContent from "./admin/EditPageContent";
import firebase from "../config/Fire";

class CustomPage extends Component {
    constructor(){
      super();

      this.state = {}
    }

    componentDidMount(){
      const db = firebase.firestore();
      var notFound = false;

      if(window.location.pathname.includes("/edit")){
        this.setState({
          edit: true,
          url: window.location.href.split("/")[3]
        });
      } else {
        const url = window.location.pathname.replace("/","")

        db.collection("pages").where("url", "==", url).get().then(function(querySnapshop){
          if(querySnapshop.size === 0){
            notFound = true;
          }
        });

        if(notFound){
          this.setState({
            redirect: true
          });
        }
      }
    }

    render(){
      if(this.state.edit === true){
        return (
          <div>
            <EditPageContent url={this.state.url}/>
          </div>
        )
      } else if(this.state.redirect === true) {
        return (
          <div>
            <h1>Redirect</h1>
          </div>
        )
      } else {
        return (
          <div>
            <h1>Found</h1>
          </div>
        )
      }
    }
}

export default CustomPage;
