import React from 'react'
import {NavBar} from '../components/Navbar';
import {Link} from 'react-router-dom'
import Container from '../components/Container';

export default function Home() {
    let links = (
        <button className="leftAlign">
            <Link className="navLinks" to="/content">My Content</Link>
        </button>
    )

	return (
		<React.Fragment>
			<NavBar leftButtons={links}/>
			<Container></Container>
		</React.Fragment>
	);
}
