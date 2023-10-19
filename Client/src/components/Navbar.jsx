

export const NavBar = ({leftButtons, modalIsOpen, updateModalIsOpen}) => {
    return (
        <React.Fragment>
            <nav>
                <Link id="worksy" className="navLinks leftAlign" to="/HomePage">Worksy</Link>
                {leftButtons}
                <button className="rightAlign"><Link className="navLinks" to="/">Logout</Link></button>
            </nav>
            
            <PopUpModal title="Create new post" isOpen={modalIsOpen} updateIsOpen={updateModalIsOpen} content={<CreatePostForm/>}/>
        </React.Fragment>
    )
  }

