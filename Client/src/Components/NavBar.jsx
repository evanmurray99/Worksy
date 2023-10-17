import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

export const NavBar = (props) => {
    var leftButtons = props.leftButtons

    const dynamicButtons = leftButtons.map((buttons) =>
        <button key={buttons.name} className="leftAlign">
            <Link className="navLinks" to={"/"+buttons.link}>{buttons.name}</Link>
        </button>
    );

    return (
        <nav>
            <Link id="worksy" className="navLinks leftAlign" to="/HomePage">Worksy</Link>
            {dynamicButtons}
            <button className="rightAlign"><Link className="navLinks" to="/">Logout</Link></button>
        </nav>
    )
  }