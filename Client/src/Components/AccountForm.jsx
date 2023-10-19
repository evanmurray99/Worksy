import React from 'react'
import './AccountForm.css'

export const AccountForm = ({user}) =>
{    
    //I have assumed that user is an object.
    return (
        <div className="background">
            <div className="floatLeft leftWidth">
                <div className="block">
                    <label htmlFor="newEmail">
                        Email:
                    </label>
                    <input type="text" name="newEmail" defaultValue={user.email}/>
                </div>
                <div>
                    <label htmlFor="newFirstName">
                        First Name:
                    </label>
                    <input type="text" name="newFirstName" defaultValue={user.firstName}/>
                </div>
                <div>
                    <label htmlFor="newLastName">
                        Last Name:
                    </label>
                    <input type="text" name="newLastName" defaultValue={user.lastName}/>
                </div>
            </div>
            <div className="floatRight rightWidth">
                <div>
                    <label htmlFor="newPassword">
                        Password:
                    </label>
                    <input type="text" name="newPassword">
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
            <button className="updateButton belowFloats">
                Update
            </button>
        </div>)
}