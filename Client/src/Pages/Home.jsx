import React from 'react'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import NavBar from '../components/Navbar';
import {Link} from 'react-router-dom'
import ChatComponent from '../Components/ChatComponent';

export default function Home() {

    const [user, setUser] = useState();

    useEffect(() => {
		console.log('update content');
		const token = Cookies.get('token');
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		// do a check token before request
		fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json();
				else {
					navigate('/login');
				}
			})
			.then((data) => {
				setUser(data.user);
			})
			.catch((e) => console.log(e.message));
	}, []);

    let links = (
        <button className="leftAlign">
            <Link className="navLinks" to="/content">My Content</Link>
        </button>
    )

	return (
		<React.Fragment>
			<NavBar leftButtons={links}/>
            {user ? <ChatComponent loggedInUser={user} />: <></> }
            
		</React.Fragment>
	);
}