import React, { useState, useEffect } from 'react';
import PopUpModal from './PopUpModal';
import ViewPostContent from './ViewPostContent';
import ChangePostForm from './ChangePostForm';
import '../Styles/PostListView.css';

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
	const[service, setService] = useState(undefined);
	const[otherUser, setUser] = useState(undefined);

	console.log(chat)
	console.log(chat.service)
	// console.log(otherUser)

	useEffect(() => {
		console.log("made")
		fetch(`http://localhost:3001/api/services/${chat.service}`, {
			method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setService(data);
			})
			.catch((e) => console.log(e.message));
	}, []);

	useEffect(() => {
		var otherUserId = chat.seller;
		console.log(chat.seller)
		console.log(otherUserId)

		if(otherUserId === user._id)
		{
			otherUserId = chat.buyer;
		}

		fetch('http://localhost:3001/api/users/' + otherUserId, {
			method: 'GET',
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setUser(data);
			})
			.catch((e) => console.log(e.message));
	}, []);

	console.log(service)
	console.log(otherUser)

	let title = service.title;

	const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

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
						deleteChatRoom(chat._id);
						setChats(chats => chats.filter(chat._id));
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
			<div className="postBackground">

	 			{/*add onclick to view post info*/}
	 			<div
					className="mainPostContent"
					onClick={() => setViewModalIsOpen(true)}
				>
					<div id="description">
						<h3>{title}</h3>
						{/* <p>{post.description}</p> */}
					</div>
				</div>

	 			<button
					className="floatRight delete"
					onClick={() => setDeleteModalIsOpen(true)}
				>
					<i className="fa fa-trash-o" />
				</button>
			</div>

			{/* <PopUpModal
				title={title}
				isOpen={viewModalIsOpen}
				updateIsOpen={setViewModalIsOpen}
				content={<ViewPostContent post={post} user={user}/>}
			/> */}
			<PopUpModal
				title={'Are you sure you want to delete ' + title + '?'}
				isOpen={deleteModalIsOpen}
				updateIsOpen={setDeleteModalIsOpen}
				content={deleteContent}
			/>
		</React.Fragment>
	);
}
