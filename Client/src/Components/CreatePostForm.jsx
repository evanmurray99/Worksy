import React from 'react'
import {ChangePostForm} from './ChangePostForm'
import './CreatePostForm.css'

export const CreatePostForm = ({}) => {
    let post = {title: "", pinImg: "", price: "", description: "", categories: []}
    return (
        <div id="createForm">
            <ChangePostForm post={post}/>
            {/* We need to call the post request from onClick to add the services to the server */}
            <button id="createButton">Create New</button>
        </div>
    )
}