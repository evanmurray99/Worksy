import React, {useState, useEffect}from 'react';
import '../Styles/PopUpModal.css';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'

export default function NewChatModal({title, isOpen, updateIsOpen, data}) {
	var result = null;
    const [loggedInUser, setLoggedInUser] = useState(null)
    const template = data ? `Hi! I would like to learn more about your service ${data.title}. Thank you!` : ''
    const [newMessage, setNewMessage] = useState(template)
    const navigate = useNavigate();

    const beginNewChat = () => {
        updateIsOpen(true)
    }
    useEffect(() => {
		const template = data ? `Hi! I would like to learn more about your service ${data.title}. Thank you!` : ''
        setNewMessage(template)
		const token = Cookies.get('token');
		const url = 'http://localhost:3001/api/users/' + token + '/auth';
		// do a check token before request
		fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json();
				else {
					return
				}
			})
			.then((data) => {
				setLoggedInUser(data.user);
			})
			.catch((e) => console.log(e.message));

	}, [data]);

    const goToLogin=()=> {
        navigate('/login')
    }


	if (isOpen) {
		result = (
			<div className="backDrop" onClick={() => updateIsOpen(false)}>
				<div className="modal" onClick={(event) => event.stopPropagation()}>
					<div className="modalTitle">
						<button
							className="modalClose floatLeft"
							onClick={() => updateIsOpen(false)}
						>
							X
						</button>
						<p className="largeText">{title}</p>
					</div>
                    {loggedInUser ?
                    <div className = 'newChat'>
                        <div className='chatIntro'>
                            {`Start Chatting with the creator of this service!`}
                        </div>
                        <textarea
                            type={'text'}
                            className={'newMessage'}
                            value={newMessage}
                            onChange = {(e)=>setNewMessage(e.target.value)}
                            placeholder={'Enter a new Message here'}
                        ></textarea>
                         <button className="loginButton" onClick={beginNewChat}>SEND</button>
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
