import React from "react"
import "./Navbar.scss"

function Navbar(){
  return(
      <nav className="main-navbar">
        <ul className="menu">
          <li className="logo">
            [Logo]
          </li>
          <li className="item">
            <a href="#">Home</a>
          </li>
          <li className="item">
            <a href="#">Events</a>
          </li>
          <li className="item">
            <a href="#">Fundraising</a>
          </li>
          <li className="item">
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar
