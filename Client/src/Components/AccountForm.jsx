import { useEffect, useState } from 'react';
import '../Styles/AccountForm.css';

export function validateForm(firstName, lastName, email, password) {
	if (firstName === '' || lastName === '' || email === '' || password === '')
		return true;
	else {
		return false;
	}
}

export default function AccountForm(props) {
	const [firstName, setFirstName] = useState(props.firstName);
	const [lastName, setLastName] = useState(props.lastName);
	const [email, setEmail] = useState(props.email);
	const [password, setPassword] = useState('');
	const [disabledSave, setDisabledSave] = useState(true);

	useEffect(() => {
		setDisabledSave(validateForm(firstName, lastName, email, password));
	}, [firstName, lastName, email, password]);

	return (
		<div className="background">
			<form
				action=""
				onSubmit={(e) => {
					e.preventDefault();
					if (disabledSave) console.log(password);
					props.updateUser(firstName, lastName, email, password);
				}}
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
						<label htmlFor="newPassword">Password:</label>
						<input
							type="password"
							name="newPassword"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div>
						<label htmlFor="confirmNewPassword">Confirm Password:</label>
						<input type="text" name="confirmNewPassword"></input>
					</div>
				</div>

				{/*in button we need to add a put request to update the user info through onClick=updateUserInfo()*/}
				<button className="updateButton belowFloats" disabled={disabledSave}>
					Update
				</button>
			</form>
		</div>
	);
}
