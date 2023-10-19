import EditProfile from './EditProfile';
import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Account() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = Cookies.get('token');
		console.log('here', token);

		const url = 'http://localhost:3001/api/users/' + token + '/auth';

		fetch(url, {
			method: 'GET',
			header: { 'Content-type': 'application/json' },
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.user) {
					setUser(data.user);
					console.log('account', data);
				} else {
					navigate('/signup');
				}
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []);

	return (
		<>
			{console.log('return')}
			<div className="flex flex-row">
				<Navbar></Navbar>
				{user ? (
					<div className="">
						<EditProfile
							firstname={user.firstName}
							lastname={user.lastName}
							email={user.email}
							bio={user.bio}
						></EditProfile>
					</div>
				) : null}
			</div>
		</>
	);
}
