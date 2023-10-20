import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import img1 from '../Images/StubImg1.jpg';
import img2 from '../Images/StubImg2.jpg';

import { PostListView } from '../Components/PostListView';
import { AccountForm } from '../Components/AccountForm';
import { Accordion } from '../Components/Accordion';
import { NavBar } from '../Components/NavBar';
import { Link } from 'react-router-dom';

function postToElement(posts) {
	let numPosts = posts.length;
	let postList = [];

	for (var i = 0; i < numPosts; i++) {
		postList.push(<PostListView post={posts[i]} key={'yourPosts' + i} />);
	}

	return postList;
}

export const MyContent = () => {
	const [modalIsOpen, updateModalIsOpen] = useState(false);
	const [user, setUser] = useState();

	useEffect(() => {
		const token = Cookies.get('token');
		console.log(token);
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		console.log(url);
		fetch(url, {
			method: 'GET',
		})
			.then((response) => response.json())
			.then((data) => {
				setUser(data.user);
				// console.log('user', user);
			});
	}, []);

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

	//This needs to be replaced by a api call to get all posts created by this user.
	//There may need to be some additional parsing as I am assuming the list is a list of post objects.
	let accordContent = [
		{
			id: 0,
			user: 'RandomUser',
			price: '$45.49',
			title: 'Test Post',
			description:
				'Simple description designed to test how well the view post handles longer text inputs.',
			pinImg: img1,
			categories: ['test', 'tags'],
		},
		{
			id: 1,
			user: 'TestUser',
			price: '$175.00',
			title: 'Another Post',
			description: 'Test descript',
			pinImg: img2,
			categories: ['diffTag', 'tag2', 'testTag'],
		},
	];

	let postList = postToElement(accordContent);

	//this needs to be replaced by a getUser request. The current assumption is that getUser returns an object.
	//There may need to be some parsing if the return value is not an object.

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
						content={<AccountForm user={user} />}
						hasBackdrop={false}
					/>
					<Accordion title="Your Posts" content={postList} hasBackdrop={true} />
				</>
			) : null}
		</React.Fragment>
	);
};
