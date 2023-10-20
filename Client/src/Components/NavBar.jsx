/* eslint-disable react/prop-types */
import React from 'react'
import {Link} from 'react-router-dom'
import {PopUpModal} from './PopUpModal'
import {ChangePostForm} from './ChangePostForm'
import './NavBar.css'

export const NavBar = ({leftButtons, modalIsOpen, updateModalIsOpen, user}) => {
    const createSubmitButton = <input type="submit" id="createButton" value="Create New"/>
    let post = {title: "", price: "", description: "", categories: []}

    return (
        <React.Fragment>
            <nav>
                <Link id="worksy" className="navLinks leftAlign" to="/home">Worksy</Link>
                {leftButtons}
                <button className="rightAlign"><Link className="navLinks" to="/login">Logout</Link></button>
            </nav>
            
            <PopUpModal title="Create new post" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} content={<ChangePostForm updateIsOpen={updateModalIsOpen} post={post} button={createSubmitButton} user={user}/>}/>
        </React.Fragment>
    )
  }