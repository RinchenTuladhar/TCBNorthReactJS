import React, { Component } from "react";
import fire from "../../config/Fire";
import "./login.scss";

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: ''
    }

    this.login = this.login.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login(e){
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      this.props.history.push('/admin');
    }).catch((error) => {
      console.log(error);
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
     event.preventDefault();
   }

  render(){
    return (
      <div className="login-page">
        <form onSubmit={this.login} className="login-form">
          <div className="container">
            <h1>Tashi Delek.</h1>
            <label>Email
              <input type="email" name="email" onChange={this.handleChange}/>
            </label><br/>
            <label>Password
              <input type="password" name="password" onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Login" className="float-right"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
