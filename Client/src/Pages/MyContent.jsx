import React from 'react'
import {NavBar} from '../Components/NavBar'

export const MyContent = () => {
    let links = [{name: "Home", link: "HomePage"}, {name: "CreatePost", link: ""}]

    return (
        <div>
            <NavBar leftButtons={links}/>
            <h1>My Content</h1>
            <p>I will implement this page.</p>
        </div>
    )
}