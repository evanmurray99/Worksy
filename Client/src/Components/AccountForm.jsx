import React, { useState } from 'react';
import './AccountForm.css';

export const AccountForm = (props) => {
	//I have assumed that user is an object.

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() 

	return (
		<div className="background" >
			<form action="" onSubmit={props.updateUser()}>
				<div className="floatLeft leftWidth">
					<div className="block">
						<label htmlFor="newEmail">Email:</label>
						<input type="email" name="newEmail" defaultValue={props.email} />
					</div>
					<div>
						<label htmlFor="newFirstName">First Name:</label>
						<input
							type="text"
							name="newFirstName"
							defaultValue={props.firstName}
						/>
					</div>
					<div>
						<label htmlFor="newLastName">Last Name:</label>
						<input
							type="text"
							name="newLastName"
							defaultValue={props.lastName}
						/>
					</div>
				</div>
				<div className="floatRight rightWidth">
                <div>
                    <label htmlFor="newPassword">
                        Password:
                    </label>
                    <input type="password" name="newPassword">
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmNewPassword">
                        Confirm Password:
                    </label>
                    <input type="text" name="confirmNewPassword">
                    </input>
                </div>
            </div>

				{/*in button we need to add a put request to update the user info through onClick=updateUserInfo()*/}
				<button className="updateButton belowFloats">Update</button>
			</form>
		</div>
	);
};
