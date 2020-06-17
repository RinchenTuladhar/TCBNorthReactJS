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
    const pages = firebase.firestore().collection("pages").get();

    pages.then(function(querySnapshot) {
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
    const main_nav_items = this.state.nav_items

    var sub_nav_names = []
    var true_main_nav_items = []

    // List of sub nav items
    sub_nav_items.map(function(item, i){
      sub_nav_names.push(item['parent_name'])
    });

    // List of main nav items
    main_nav_items.map(function(item, i){
      if(sub_nav_names.includes(item['url'])){
        true_main_nav_items.push(item);
      }
    });

    return sub_nav_items.map((sub_item, i) => {
      return sub_item.parent_name === item ?
        sub_item.name
       :
       null
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
      const sub_navbar_temp = this.loadSubNavbarItems(item.url)

      return item.child === false ?

      <li className={"item nav-item" + item.has_children ? "dropdown" : ""} key={i}>
        <a href={item.url} style={{color: this.state.color}} className={"nav-link"}  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{item.name}</a>

        {item.has_children ? <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {sub_navbar_temp}
        </div> : ""}

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
