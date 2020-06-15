import React, { Component } from "react"
import { Redirect } from 'react-router-dom'
import firebase from "../config/Fire";
import "./Navbar.scss"

class Navbar extends Component{
  constructor(){
    super();

    this.state = {
      backgroundColor: "trasparent",
      nav_items: [],
      sub_nav_items: []
    }

    this.loadNavbarItems = this.loadNavbarItems.bind(this);
    this.loadNavbarItemsList = this.loadNavbarItemsList.bind(this);
    this.logout = this.logout.bind(this);
    this.loadSubNavbarItems = this.loadSubNavbarItems.bind(this);
  }

  componentDidMount(){
    this.loadNavbarItems()
    if(window.location.pathname === "/"){
      this.setState({ color: "white", position: "fixed" });

      document.addEventListener("scroll", () => {
        const backgroundcolor = window.scrollY > 100 ? "white" : "transparent"
        const color = window.scrollY > 100 ? "black" : "white"

        this.setState({
          backgroundColor: backgroundcolor,
          color: color
        });

      });
    }
  }

  loadNavbarItems(){
    const that = this;

    firebase.firestore().collection("pages").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var doc_data = doc.data();

        if(doc_data.name !== undefined){
          if(doc_data.child){
            that.setState({
              sub_nav_items: [...that.state.sub_nav_items, doc_data]
            });
          } else {
            that.setState({
              nav_items: [...that.state.nav_items, doc_data]
            });
          }
        }
      });
    })
  }

  loadSubNavbarItems(item){
    const sub_nav_items = this.state.sub_nav_items
    var values = [];
    sub_nav_items.forEach(function(sub_nav_item){
      values.push(sub_nav_item);
    });

    return values.map((sub_item, i) => {
      return sub_item.parent_name === item ?
        ""
       :
       ""
    })
  }

  logout(){
    firebase.auth().signOut().then(function() {
      return <Redirect to="/"/>;
    });
  }

  loadNavbarItemsList(){
    const nav_items = this.state.nav_items;
    const sub_nav_items = this.state.sub_nav_items;

    const navbar_items = nav_items.map((item,i) => {
      return item.child === false ?

      <li className="item nav-item dropdown" key={i}>
        <a href={item.url} style={{color: this.state.color}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{item.name}</a>
        <div className="subnav-items dropdown">
          {this.loadSubNavbarItems(item.url)}
        </div>
      </li> : ""}
    )

    return navbar_items;
  }

  render(){
    const navbar_items = this.loadNavbarItemsList();

    return(
        <nav className="navbar navbar-expand-lg navbar-light main-navbar" style={{backgroundColor: this.state.backgroundColor, position: this.state.position}}>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbarToggle" aria-controls="mainNavbarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNavbarToggle">
            <ul className="menu navbar-nav mr-auto">
              <li className="logo nav-item">
                <a href="/"><img src="img/tibetanlogo.png" alt="TCB North UK Logo"/></a>
              </li>

              {navbar_items}

            </ul>
          </div>
        </nav>
    )
  };
}

export default Navbar;
