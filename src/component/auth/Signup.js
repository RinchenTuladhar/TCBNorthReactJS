import React from "react"

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
   }

  render(){
    return (
      <div className="login-page">
        <form onSubmit={this.handleSubmit} className="login-form">
          <div className="container">
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

export default Signup
