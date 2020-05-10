import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Home from './component/Home';
import Navbar from './component/Navbar';
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";

function App() {
  return (
    <div className="main">
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
