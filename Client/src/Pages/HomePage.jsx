import React from 'react'
import {NavBar} from '../Components/NavBar'
import {Link} from 'react-router-dom'

export const HomePage = () => {
    let links = (
        <button className="leftAlign">
            <Link className="navLinks" to="/MyContent">My Content</Link>
        </button>
    )

    return (
        <React.Fragment>
            <NavBar leftButtons={links}/>
            <h1>HomePage</h1>
            <p>Diljot will implement this page.</p>
        </React.Fragment>
    )
}