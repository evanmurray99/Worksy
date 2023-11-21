import { useEffect, useState } from 'react';
import '../Styles/AccountForm.css';

const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

export function validateForm(firstName, lastName, email, password, newPass, confirmPass, bio, updateUser, setError) {
	var errorMsg = "";
	if (firstName !== '' && lastName !== '' && email !== '')
	{
		//check if email is valid before sending to backend
		if (!isValidEmail(email)) {
			errorMsg += "You must provide a valid email.\n"
			return;
		}

		if(newPass !== '')
		{
			//check if passwords match before sending to backend
			if (newPass === confirmPass) 
			{ 
				updateUser(firstName, lastName, email, newPass, bio)
			}
			else
			{
				errorMsg += "New Password is not the same as Confirm Password.\n"
			}
		}
		else
		{
			updateUser(firstName, lastName, email, password, bio)
		}
	}
	else
	{
		if(firstName === '')
		{
			errorMsg += "Your account needs to have a first name.\n"
		}
		
		if (lastName === '')
		{
			errorMsg += "Your account needs to have a last name.\n"
		}
		
		if (email === '')
		{
			errorMsg += "Your account needs to have an email.\n"
		}
	}

	setError(<p className="error">{errorMsg}</p>);
}

export default function AccountForm(props) {
	const [firstName, setFirstName] = useState(props.firstName);
	const [lastName, setLastName] = useState(props.lastName);
	const [email, setEmail] = useState(props.email);
	const [bio, setBio] = useState(props.bio);
	const [newPassword, setNewPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState();

	var handleSubmit = (event) =>
	{
		event.preventDefault();
		validateForm(firstName, lastName, email, props.password, newPassword, confirmPass, bio, props.updateUser, setError);
	}

	const handleEnter = (event) => {
		if(event.key === "Enter")
		{
			handleSubmit(event);
		}
	}

	return (
		<div className="background">
			<form
				action=""
				onSubmit={handleSubmit}
				onKeyDown={handleEnter}
			>
				<div className="floatLeft leftWidth">
					<div className="block">
						<label htmlFor="newEmail">Email:</label>
						<input
							type="email"
							name="newEmail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="newFirstName">First Name:</label>
						<input
							type="text"
							name="newFirstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="newLastName">Last Name:</label>
						<input
							type="text"
							name="newLastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
				</div>
				<div className="floatRight rightWidth">
					<div>
						<label htmlFor="newPassword">New Password:</label>
						<input
							type="password"
							name="newPassword"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						></input>
					</div>
					<div>
						<label htmlFor="confirmNewPassword">Confirm Password:</label>
						<input 
							type="password" 
							name="confirmNewPassword" 
							value={confirmPass} 
							onChange={(e) => setConfirmPass(e.target.value)}
						></input>
					</div>
				</div>

				<div className="belowFloats">
					<label htmlFor="bio">Biography:</label>
					<textarea className="fixAlign"
						rows="5"
						name="bio" 
						value={bio} 
						onChange={(e) => setBio(e.target.value)}
					/>
				</div>

				{/*in button we need to add a put request to update the user info through onClick=updateUserInfo()*/}
				{error}
				<button className="updateButton belowFloats">
					Update
				</button>
			</form>
		</div>
	);
}
