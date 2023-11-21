import React, { useState, useEffect } from 'react';
import PopUpModal from './PopUpModal';
import ViewChatHistory from './ViewChatHistory';
import ChangePostForm from './ChangePostForm';
import axios from 'axios';
import '../Styles/PostListView.css';
import '../Styles/Chat.css';

function deleteChatRoom(id)
{
	const apiUrl = `http://127.0.0.1:3001/api/chats/${id}`;

	return axios
		.delete(apiUrl)
		.then((response) => {
			if (response.status === 200) {
				return { success: true, error: null };
			} else {
				return {
					success: false,
					error: `Failed to delete Service. Error: ${response.status}`,
				};
			}
		})
		.catch((error) => {
			return {
				success: false,
				error: `Failed to delete Service: ${
					error.response ? error.response.data.message : error.message
				}`,
			};
		});
}

export default function ChatRoom({chat, currUser, setChats}) {
	const[service, setService] = useState({});
	const[otherUser, setUser] = useState({});
	// const[latestMsg, setLatest] = useState({body: '', created: new Date()})
	// var latestMsg = undefined;
	// console.log(chat)
	var otherUserId = undefined;
	// console.log(otherUserId)

	useEffect(() => {
		async function fetchData()
		{
		if(chat !== undefined)
		{
			var otherUserId = chat.seller
			await fetch(`http://localhost:3001/api/services/${chat.service}`, {
				method: 'GET',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setService(data);
				})

			if(otherUserId === currUser._id)
			{
				otherUserId = chat.buyer;
			}
			// console.log(otherUserId)

			await fetch(`http://localhost:3001/api/users/${otherUserId}`, {
				method: 'GET',
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setUser(data);
					// console.log(data)
				})
				.catch((e) => console.log(e.message));
		}
		}
		fetchData();
	}, [chat]);

	let title = service.title;
	// console.log(otherUser)
	// let len = chat.messages.length;
	// let messages = chat.messages;

	// for( var i = 0; i < len; i++)
	// {
	// 	console.log(messages)
	// 	if(latestMsg === undefined || latestMsg > messages[i])
	// 	{
	// 		latestMsg = messages[i];
	// 	}
	// }
	// console.log(latestMsg)

	// let lastMsg = ""
	// let lastMsgDate = ""

	// if(latestMsg !== undefined)
	// {
	// 	lastMsg = latestMsg.body
	// 	lastMsgDate = latestMsg.created
	// }

	const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

	function checkChatId(chatRooms)
	{
		let len = chatRooms.length
		var res = []

		for(let i = 0; i < len; i++)
		{
			if(chatRooms[i]._id !== chat._id)
			{
				res.push(chatRooms[i])
			}
		}
		// console.log(res)

		return res
	}

	const deleteContent = (
		<>
			<div id="container">
				<span id="deleteTextFormat">
					This action will delete {title} permanentanly and cannot be undone.
				</span>
				<button
					id="cancelButton"
					className="floatLeft"
					onClick={() => setDeleteModalIsOpen(false)}
				>
					Cancel
				</button>
				<button
					id="deleteButton"
					className="floatRight"
					onClick={async (e) => {
						e.preventDefault();
						console.log(e)
						deleteChatRoom(chat._id);
						setChats(chatRooms => checkChatId(chatRooms))
						setDeleteModalIsOpen(false);
					}}
				>
					Delete
				</button>
			</div>
		</>
	);

	return (
		<React.Fragment>
			{/* {chat ? <> */}
			<div className='postBackground justify-center'>

	 			{/*add onclick to view post info*/}
	 			<div
					className="mainPostContent"
					onClick={() => setViewModalIsOpen(true)}
				>
					<div className = 'chatTitle'>
						<h3>{title}</h3>
					</div>
					{/* <div id="description">
						 <p>{lastMsg}</p> 
						 <p>{lastMsgDate}</p>
					</div> 
					<p>{otherUser.firstName + " " + otherUser.lastName.charAt(0)}</p> */}
				</div>

	 			<button
					className="floatRight delete"
					onClick={() => setDeleteModalIsOpen(true)}
				>
					<i className="fa fa-trash-o" />
				</button>
			</div>

			<PopUpModal
				title={'Are you sure you want to delete ' + title + '?'}
				isOpen={deleteModalIsOpen}
				updateIsOpen={setDeleteModalIsOpen}
				content={deleteContent}
			/>

			<PopUpModal
				title={title}
				isOpen={viewModalIsOpen}
				updateIsOpen={setViewModalIsOpen}
				content={<ViewChatHistory chat={chat} currUser={currUser} otherUser={otherUser}/>}
			/>
		</React.Fragment>
	);
}
