import React from 'react'
import NavBar from '../Components/NavBar';
import {Link} from 'react-router-dom'

export default function Home() {
    let links = (
        <button className="leftAlign">
            <Link className="navLinks" to="/content">My Content</Link>
        </button>
    )

	return (
		<React.Fragment>
			<NavBar leftButtons={links}/>
		</React.Fragment>
	);
}