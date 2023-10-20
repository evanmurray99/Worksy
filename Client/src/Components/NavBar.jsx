
import React from 'react';
import { Link } from 'react-router-dom';
import { PopUpModal } from './PopUpModal';
import { CreatePostForm } from './CreatePostForm';
import './NavBar.css';

export const NavBar = ({ leftButtons, modalIsOpen, updateModalIsOpen }) => {
	return (
		<React.Fragment>
			<nav>
				<Link id="worksy" className="navLinks leftAlign" to="/HomePage">
					Worksy
				</Link>
				{leftButtons}
				<button
					className="rightAlign"
					onClick={() => {
						document.cookie =
							'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
					}}
				>
					<Link className="navLinks" to="/login">
						Logout
					</Link>
				</button>
			</nav>

			<PopUpModal title="Create new post" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} content={<ChangePostForm updateIsOpen={updateModalIsOpen} post={post} button={createSubmitButton} user={user}/>}/>
		</React.Fragment>
	);
};
