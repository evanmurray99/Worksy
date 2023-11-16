import React, { useState, useEffect } from 'react';

import ChatRoom from '../components/ChatRoom';
import NavBar from '../Components/NavBar';
import { Link, useNavigate } from 'react-router-dom';

function listChatRooms(chats, setChats, user)
{
	var result = [];
	var len = chats.length;
	console.log(len)

	for(var i = 0; i < len; i++)
	{
		var temp = chats[i];
		console.log(i)
		// result.push(<ChatRoom key={"ChatRoom"+i} chat={temp} currUser={user} setChats={setChats}/>)
	}

	return result;
}

export default function Chat({token, setToken, user}) {
	const [chats, setChats] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getChats = async() =>{
			if(user !== undefined)
				{
					setChats([])
					const buyer = 'http://localhost:3001/api/chats/buyer/' + user._id;
					const seller = 'http://localhost:3001/api/chats/seller/' + user._id;
		
					// do a check token before request
					await fetch(buyer, {
						method: 'GET',
					})
						.then((response) => {
							if (response.status === 200) return response.json();
						})
						.then((data) => {
							setChats(prevChats => [...prevChats, ...data]);
						})
						.catch((e) => console.log(e.message));
		
					await fetch(seller, {
							method: 'GET',
						})
							.then((response) => {
								if (response.status === 200) return response.json();
							})
							.then((data) => {
								setChats(prevChats => [...prevChats, ...data]);
							})
							.catch((e) => console.log(e.message));
				}
			}
			getChats()
			console.log(chats)
		}, [user, ]);

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
				.catch((e) => console.log(e.message));
		}, []);

		var chatRooms = listChatRooms(chats, setChats, user);

	const dynamicButtons = (
		<React.Fragment>
			<button className="leftAlign">
				<Link className="navLinks" to="/">
					Home
				</Link>
			</button>
			<button className="leftAlign">
				<Link className="navLinks" to="/content">
					My Content
				</Link>
			</button>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<NavBar
				leftButtons={dynamicButtons}
				setToken={setToken}
				token={token}
				user={user}
			/>
			<div>
				{chatRooms}
			</div>
		</React.Fragment>
	);
}