import React from 'react'
import {NavBar} from '../Components/NavBar'

export const HomePage = () => {
    let links = [{name: "My Content", link: "MyContent"}]

    return (
        <div>
            <NavBar leftButtons={links}/>
            <h1>HomePage</h1>
            <p>Diljot will implement this page.</p>
        </div>
    )
}