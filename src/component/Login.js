import React from "react"

import "./login.scss";

class Login extends React.Component {
  constructor(){
    super()
  }

  render(){
    return (
      <div className="login-page">
        <form className="login-form">
          <div className="container">
            <label>Email
              <input type="email" name="email"/>
            </label><br/>
            <label>Password
              <input type="password" name="password"/>
            </label>
            <input type="submit" value="Login" className="float-right"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
