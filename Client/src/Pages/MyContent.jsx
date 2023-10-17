import React from 'react'
import {NavBar} from '../Components/NavBar'
import {Accordion} from '../Components/Accordion'

export const MyContent = () => {
    let links = [{name: "Home", link: "HomePage"}, {name: "CreatePost", link: ""}]
    let accordContent = "random text";
   // let accords = [{title: "Account Information", content: accordContent}]

    return (
        <React.Fragment>
            <NavBar leftButtons={links}/>
            <Accordion title="Account Information" content={accordContent} hasBackdrop={true}/>
            <h1>My Content</h1>
            <p>I will implement this page.</p>
        </React.Fragment>
    )
}