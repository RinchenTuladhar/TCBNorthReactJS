import React from "react"
import "./Navbar.scss"

function Navbar(){
  return(
      <nav className="main-navbar">
        <ul className="menu">
          <li className="logo">
            [Logo]
          </li>
          <li className="item">Home</li>
          <li className="item">Events</li>
          <li className="item">Fundraising</li>
          <li className="item">Contact Us</li>
        </ul>
      </nav>
  )
}

export default Navbar
