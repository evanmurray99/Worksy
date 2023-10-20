import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { editService } from '../utils/Services';

import { PostListView } from '../Components/PostListView';
import { AccountForm } from '../Components/AccountForm';
import { Accordion } from '../Components/Accordion';
import { NavBar } from '../Components/NavBar';
import { Link } from 'react-router-dom';

function postToElement(posts) {
	let numPosts = posts.length; // don't have length
	let postList = [];

	for (var i = 0; i < numPosts; i++) {
		postList.push(<PostListView post={posts[i]} key={'yourPosts' + i} />);
	}

	return postList;
}

export const MyContent = () => {
	const [modalIsOpen, updateModalIsOpen] = useState(false);
	const [user, setUser] = useState();
	const [services, setServices] = useState();

	useEffect(() => {
		console.log('update content');
		const token = Cookies.get('token');
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		fetch(url, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data.user);
				console.log('done');
			})
			.then(() => {
				getServices(user);
			})
			.catch((e) => console.log(e.message));
	}, []);

	// const setUserAndServices = (data) =>{
	// 	setUser(data.user)

	// }

	const updateUser = (firstName, lastName, email, password) => {
		console.log(firstName, lastName, email, password);
		const url = 'http://localhost:3001/api/users/' + user._id + '/update-user';
		fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => {
				if (response.status === 200) {
					setUser({
						...user,
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password,
					});
				} else {
					throw new Error('Something wrong');
				}
				return response.json();
			})
			.catch((e) => console.log(e.message));
	};

	const getServices = (user) => {
		const url = 'http://localhost:3001/api/users/services/' + user._id;
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => {
				if (response.status === 200) return response.json();
				else throw new Error('Error in getService');
			})
			.then((data) => {
				console.log('from getServices', data);
				setServices(data);
			})
			.catch((e) => console.log(e.message));
	};

	let postList = services ? postToElement(services) : null;

	const dynamicButtons = (
		<React.Fragment>
			<button className="leftAlign">
				<Link className="navLinks" to="/HomePage">
					Home
				</Link>
			</button>
			<button className="leftAlign" onClick={() => updateModalIsOpen(true)}>
				Create Post
			</button>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			{user ? (
				<>
					<NavBar
						leftButtons={dynamicButtons}
						modalIsOpen={modalIsOpen}
						updateModalIsOpen={updateModalIsOpen}
					/>
					<Accordion
						title="Account Information"
						content={
							<AccountForm
								firstName={user.firstName}
								lastName={user.lastName}
								email={user.email}
								password={user.password}
								updateUser={updateUser}
							/>
						}
						hasBackdrop={false}
					/>
					<Accordion title="Your Posts" content={postList} hasBackdrop={true} />
				</>
			) : null}
		</React.Fragment>
	);
};
