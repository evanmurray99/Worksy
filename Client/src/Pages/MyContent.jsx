import React from 'react'
import {NavBar} from '../Components/NavBar'
import {Accordion} from '../Components/Accordion'
import {AccountForm} from '../Components/AccountForm'

export const MyContent = () => {
    let links = [{name: "Home", link: "HomePage"}, {name: "CreatePost", link: ""}]
    let accordContent = "random text";
    //this needs to be replaced by a getUser request. The current assumption is that getUser returns an object.
    //There may need to be some parsing if the return value is not an object.
    let user = {email: "haywardc@myumanitoba.ca", firstName: "Casandra", lastName: "Hayward"}

    return (
        <React.Fragment>
            <NavBar leftButtons={links}/>
            <Accordion title="Account Information" content={(<AccountForm user={user}/>)} hasBackdrop={false}/>
            <Accordion title="Your Posts" content={accordContent} hasBackdrop={true}/>
        </React.Fragment>
    )
}