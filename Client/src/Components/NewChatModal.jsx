import React, {useState, useEffect}from 'react';
import '../Styles/PopUpModal.css';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'

export default function NewChatModal({title, isOpen, updateModalIsOpen, data, user, setChats, chats}) {
	var result = null;

    // const [loggedInUser, setLoggedInUser] = useState(null)

	var newMessage = "Hi! I would like to learn more about your service " + data.title + ". Thank you!"
    const navigate = useNavigate();

    const beginNewChat = async (event) => {
		event.preventDefault();

		const url = 'http://localhost:3001/api/chats';
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
		    },
			body: JSON.stringify({
			   seller: data.seller,
			   buyer: user,
			   service: data._id,
			   messages: [],
	 	    }),
		})

		const result = await response.json().catch((e) => console.log(e.message));

		setChats(prevChats => [...prevChats, result]);
        updateModalIsOpen(false)
    }

//    useEffect(() => {
// 		setNewMessage(template)
		// const template = data ? `Hi! I would like to learn more about your service ${data.title}. Thank you!` : ''
       // setNewMessage(template)
		// const token = Cookies.get('token');
		// const url = 'http://localhost:3001/api/users/' + token + '/auth';
		// do a check token before request
		// fetch(url, {
		// 	method: 'GET',
		// })
		// 	.then((response) => {
		// 		if (response.status === 200) return response.json();
		// 		else {
		// 			return
		// 		}
		// 	})
		// 	.then((data) => {
		// 		setLoggedInUser(data.user);
		// 	})
		// 	.catch((e) => console.log(e.message));

	// }, []);

    const goToLogin=()=> {
        navigate('/login')
    }


	if (isOpen) {
		result = (
			<div className="backDrop" onClick={() => updateModalIsOpen(false)}>
				<div className="modal" onClick={(event) => event.stopPropagation()}>
					<div className="modalTitle">
						<button
							className="modalClose floatLeft"
							onClick={() => updateModalIsOpen(false)}
						>
							X
						</button>
						<p className="largeText">{title}</p>
					</div>
                    {user ?
                    <div className = 'newChat'>
                        <div className='chatIntro'>
                            {`Start Chatting with the creator of this service!`}
                        </div>
						<form onSubmit={beginNewChat}>
							<textarea
								type={'text'}
								className={'newMessage'}
								value={newMessage}
								onChange = {(e)=>setNewMessage(e.target.value)}
								placeholder={'Enter a new Message here'}
							></textarea>
							<button className="loginButton">SEND</button>
						</form>
                    </div>  

                     :
                        <div className='noUser'>
                            <div className="noUserText">Please login to access this feature</div>
                            <button className="loginButton" onClick={goToLogin}>LOGIN</button>
                        </div>
                    }

				</div>
			</div>
		);
	}

	return result;
}
