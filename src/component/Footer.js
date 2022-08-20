import React from "react";
import "./Footer.scss";

function Footer(){
  return (
    <div className="site-footer">
      <footer>
        <ul>
          <li><a href="https://www.facebook.com/groups/171713289595372/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="mailto:info@tcbnorth.co.uk" target="_blank" rel="noopener noreferrer">Email</a></li>
        </ul>
        <br/>
        <ul>
          <li><span className="lighter-color">Developed using ReactJS</span></li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
