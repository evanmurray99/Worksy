import React from 'react'
import {NavBar} from '../Components/NavBar'
import {Accordion} from '../Components/Accordion'
import {AccountForm} from '../Components/AccountForm'
import {PostListView} from '../Components/PostListView'
import img1 from '../Images/StubImg1.jpg'
import img2 from '../Images/StubImg2.jpg'

function postToElement (posts)
{
    let numPosts = posts.length
    let postList = []

    for(var i = 0; i < numPosts; i++)
    {
        postList.push(<PostListView post={posts[i]} key={"yourPosts"+i}/>)
    }

    return postList
}

export const MyContent = () => {
    let links = [{name: "Home", link: "HomePage"}, {name: "CreatePost", link: ""}]

    //This needs to be replaced by a api call to get all posts created by this user.
    //There may need to be some additional parsing as I am assuming the list is a list of post objects.
    let accordContent = [
        {id:0, userId:0, title:"Test Post", description:"Simple description designed to test how well the view post handles longer text inputs.", pinImg: img1, categories:["test", "tags"]}
        ,{id:1, userId:1, title:"Another Post", description: "Test descript", pinImg: img2, categories: ["diffTag","tag2","testTag"]}
    ];

    let postList = postToElement(accordContent)
    
    //this needs to be replaced by a getUser request. The current assumption is that getUser returns an object.
    //There may need to be some parsing if the return value is not an object.
    let user = {email: "haywardc@myumanitoba.ca", firstName: "Casandra", lastName: "Hayward"}

    return (
        <React.Fragment>
            <NavBar leftButtons={links}/>
            <Accordion title="Account Information" content={(<AccountForm user={user}/>)} hasBackdrop={false}/>
            <Accordion title="Your Posts" content={postList} hasBackdrop={true}/>
        </React.Fragment>
    )
}