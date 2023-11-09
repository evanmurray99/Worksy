import React from 'react'
import {Link} from 'react-router-dom'
import PopUpModal from './PopUpModal'
import CreatePostForm from './CreatePostForm'
import Cookies from 'js-cookie'
import '../Styles/NavBar.css'

function logout()
{
    Cookies.remove("token");
}

export default function NavBar ({leftButtons, modalIsOpen, updateModalIsOpen}){
    return (
        <React.Fragment>
            <nav>
                <Link id="worksy" className="navLinks leftAlign" to="/home">Worksy</Link>
                {leftButtons}
                <button className="rightAlign"><Link className="navLinks" onClick={logout} to="/login">Logout</Link></button>
            </nav>
            
            <PopUpModal title="Create new post" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} content={<CreatePostForm/>}/>
        </React.Fragment>
    )
  }