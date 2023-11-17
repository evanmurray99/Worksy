import React, { useState, useEffect } from 'react';

import ChatRoom from '../components/ChatRoom';
import NavBar from '../Components/NavBar';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom';

const getChats = (user, setChats) => {
	if(user !== undefined)
	{
	  setChats([])
  
	  const url = 'http://localhost:3001/api/chats/seller/' + user._id;
	  fetch(url, {
		method: 'GET',
		headers: {
		  'Content-type': 'application/json',
		},
	  })
		.then((response) => {
		  if (response.status === 200) return response.json();
		  else throw new Error('Error in getChat');
		})
		.then((data) => {
		  setChats([...prevChats,...data]);
		})
		.catch((e) => console.log(e.message));
  
		const buyer = 'http://localhost:3001/api/chats/buyer/' + user._id;
		fetch(buyer, {
		  method: 'GET',
		  headers: {
			'Content-type': 'application/json',
		  },
		})
		  .then((response) => {
			if (response.status === 200) return response.json();
			else throw new Error('Error in getChat');
		  })
		  .then((data) => {
			setChats(prevChats => [...prevChats, ...data]);
		  })
		  .catch((e) => console.log(e.message));
	}
  };

function listChatRooms(chats, setChats, user)
{
	var result = [];

	if(chats !== undefined)
	{
		var len = chats.length;

		for(var i = 0; i < len; i++)
		{
			var temp = chats[i];
			result.push(<ChatRoom key={"ChatRoom"+i} chat={temp} currUser={user} setChats={setChats}/>)
		}
	}

	return result;
}

export default function Chat() {
	const [chats, setChats] = useState();
	const [user, setUser] = useState();
	const [token, setToken] = useState(Cookies.get('token'));
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
				setUser(data.user)
				getChats(data.user, setChats)
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