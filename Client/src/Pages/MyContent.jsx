import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import PostListView from '../Components/PostListView';
import AccountForm from '../Components/AccountForm';
import Accordion from '../Components/Accordion';

import NavBar from '../Components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { deleteService } from '../utils/Services';

function postToElement(posts, user, updateServices, categoryList, services) {
	let numPosts = posts.length;
	let postList = [];

	for (var i = 0; i < numPosts; i++) {
		postList.push(
			<PostListView
				post={posts[i]}
				key={posts[i]._id}
				user={user}
				deleteService={deleteService}
				updateServices={updateServices}
				categoryList={categoryList}
				services={services}
			/>
		); // pass key to children
	}
	return postList;
}

export default function MyContent() {
	const [modalIsOpen, updateModalIsOpen] = useState(false);
	const [user, setUser] = useState();
	const [services, setServices] = useState();
	const [categoryList, setCategories] = useState([]);
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
			})
			.catch((e) => console.log(e.message));

		fetch('http://localhost:3001/api/categories', {
			method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCategories(data);
			})
			.catch((e) => console.log(e.message));
	}, []);

	const updateUser = (firstName, lastName, email, password, bio) => {
		console.log(firstName, lastName, email, bio);
		const url = 'http://localhost:3001/api/users/' + user._id + '/update-user';

		var realPass = ''
		if(password !== undefined)
		{
			realPass = password
		}

		fetch(url, {
			method: 'PUT',
			body: JSON.stringify({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: realPass,
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
						password: realPass,
					});
				} else {
					throw new Error('Something wrong');
				}
				return response.json();
			})
			.catch((e) => console.log(e.message));

		const updateBio = 'http://localhost:3001/api/users/' + user._id + '/update-bio';

		fetch(updateBio, {
			method: 'PUT',
			body: JSON.stringify({
				bio: bio,
			}),
			headers: {
				'Content-type': 'application/json',
			},
		})
			.then((response) => {
				if (response.status === 200) {
					setUser({
						...user,
						bio: bio,
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

	let postList = services ? postToElement(services, user, setServices, categoryList, services) : null;

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
						updateServices={setServices}
						categoryList={categoryList}
					/>
					<Accordion
						title="Account Information"
						content={
							<AccountForm
								firstName={user.firstName}
								lastName={user.lastName}
								email={user.email}
								password={user.password}
								bio={user.bio}
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
}