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
import Login from "./component/Login";

function App() {
  return (
    <div className="main">
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="">
          <Home/>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
