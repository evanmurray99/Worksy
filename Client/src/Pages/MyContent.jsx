import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { PostListView } from '../Components/PostListView';
import { AccountForm } from '../Components/AccountForm';
import { Accordion } from '../Components/Accordion';

import { NavBar } from '../Components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { deleteService } from '../utils/Services';

function postToElement(posts, user) {
	let numPosts = posts.length;
	let postList = [];

	for (var i = 0; i < numPosts; i++) {
		postList.push(
			<PostListView
				post={posts[i]}
				key={posts[i]._id}
				deleteService={deleteService}
			/>
		); // pass key to children
	}
	return postList;
}

export const MyContent = () => {
	const [modalIsOpen, updateModalIsOpen] = useState(false);
	const [user, setUser] = useState();
	const [services, setServices] = useState();
	const navigate = useNavigate();

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
				getServices(data.user);
				console.log('done');
			})
			.catch((e) => console.log(e.message));
	}, []);

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
				<Link className="navLinks" to="/home">
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
						user={user}
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
					<Accordion title="Your Posts" content={postList} hasBackdrop={true}/>
				</>
			) : null}
		</React.Fragment>
	);
};
