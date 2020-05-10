import React from "react"
import { Redirect } from 'react-router-dom';

import fire from "../../config/Fire"
import "./login.scss";

class Signup extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    const email = this.state.email
    const password = this.state.password

    fire.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      return <Redirect to="/"/>;
    });
  }

  render(){
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit} id="login-form">
          <div className="container">
            <label>Email
              <input type="email" name="email" onChange={this.handleChange}/>
            </label><br/>
            <label>Password
              <input type="password" name="password" onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Signup" className="float-right"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup
