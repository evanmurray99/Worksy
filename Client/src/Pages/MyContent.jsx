import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ReviewListView from '../Components/ReviewListView';

import PostListView from '../Components/PostListView';
import AccountForm from '../Components/AccountForm';
import Accordion from '../Components/Accordion';

import NavBar from '../Components/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { deleteService } from '../utils/Services';

function postToElement(posts, user, updateServices, categoryList, services) {
	console.log(user)
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

function reviewsToElement(reviews, user, updateReview) {
	let numReviews = reviews.length;
	let reviewList = [];

	for (var i = 0; i < numReviews; i++) {
		reviewList.push(
			<ReviewListView
				review={reviews[i]}
				key={reviews[i]._id}
				user={user}
				// deleteReviews={deleteReviews}
				updateReviews={updateReview}
				allReviews={reviews}
			/>
		); // pass key to children
	}
	return reviewList;
}


export default function MyContent({}) {
	const [modalIsOpen, updateModalIsOpen] = useState(false);
	const [user, setUser] = useState();
	const [token, setToken] = useState(Cookies.get('token'));
	const [services, setServices] = useState();
	const [categoryList, setCategories] = useState([]);
	const [reviews, setReviews] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
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
				getReviews(data.user);
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
				setCategories(data.map((currCategory) => {return currCategory.name}));
			})
			.catch((e) => console.log(e.message));
	}, [token]);
	// console.log(user)

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
				setServices(data);
			})
			.catch((e) => console.log(e.message));
	};

	const getReviews = (user) => {
		const url = 'http://localhost:3001/api/reviews/user/' + user._id;
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
				setReviews(data);
				console.log(reviews);
			})
			.catch((e) => console.log(e.message));
	};

	let postList = services ? postToElement(services, user, setServices, categoryList, services) : null;
	let reviewList = reviews ? reviewsToElement(reviews, user, setReviews) : null;


	const dynamicButtons = (
		<React.Fragment>
			<button className="leftAlign">
				<Link className="navLinks" to="/">
					Home
				</Link>
			</button>
			<button className="leftAlign">
				<Link className="navLinks" to="/services/category=/query=">
					Services
				</Link>
			</button>
			<button className="leftAlign">
				<Link className="navLinks" to="/chat">
					Chat
				</Link>
			</button>
			{user && user.isStudent === true ? 
				<button className="leftAlign font-bold" onClick={() => updateModalIsOpen(true)}>
					Create Post
				</button>: 
				<></>
			}
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
						setToken={setToken}
						token={token}
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
					{user.isStudent === true ? 
						<Accordion title="Your Posts" content={postList} hasBackdrop={true}/>:
						<></>
					}
					<Accordion title="Your Reviews" content={reviewList} hasBackdrop={true}/>
				</>
			) : null}
		</React.Fragment>
	);
}