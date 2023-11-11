import React from 'react'
import {Link} from 'react-router-dom'
import PopUpModal from './PopUpModal'
import ChangePostForm from './ChangePostForm'
import Cookies from 'js-cookie'
import '../Styles/NavBar.css'

function logout()
{
    Cookies.remove("token");
}

export default function NavBar ({leftButtons, modalIsOpen, updateModalIsOpen, user, updateServices, categoryList}){
    let post = null

    return (
        <React.Fragment>
            <nav>
                <Link id="worksy" className="navLinks leftAlign" to="/home">Worksy</Link>
                {leftButtons}
                <button className="rightAlign"><Link className="navLinks" onClick={logout} to="/login">Logout</Link></button>
            </nav>

            <PopUpModal title="Create new post" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} content={<ChangePostForm post={post} user={user} updateIsOpen={updateModalIsOpen} updateServices={updateServices} categoryList={categoryList}/>}/>
        </React.Fragment>
    )
}