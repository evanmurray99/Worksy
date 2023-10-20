import React, {useState} from 'react'
import {PopUpModal} from '../components/PopUpModal'
import {ViewPostContent} from './ViewPostContent'
import {ChangePostForm} from '../components/ChangePostForm'
import './PostListView.css'

export const PostListView = ({post, user}) => {
    let title = post.title
    const editSubmitButton = <input type="submit" id="createButton" value="Update"/>

    const [updateModalIsOpen, setEditModalIsOpen] = useState(false)
    const [viewModalIsOpen, setViewModalIsOpen] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)

    const deleteContent = (
        <React.Fragment>
            <div id="container">
                <span id="deleteTextFormat">
                    This action will delete {title} permanentanly and cannot be undone.
                </span>
                <button id="cancelButton" className="floatLeft" onClick={() => setDeleteModalIsOpen(false)}>
                    Cancel
                </button>
                {/* Will need to add an onclick function that calls deletes the post from the database. */}
                <button id="deleteButton" className="floatRight">
                    Delete
                </button>
            </div>
        </React.Fragment>)

    return (
        <React.Fragment>
            <div className="postBackground">
                <button className="floatLeft" id="edit" onClick={() => setEditModalIsOpen(true)}>
                    <i className="fa fa-pencil"/>
                </button>

                {/*add onclick to view post info*/}
                <div className="mainPostContent" onClick={() => setViewModalIsOpen(true)}>
                    <img src={post.pinImg}/>
                    <div id="description">
                        <h3>{title}</h3>
                        <p>{post.description}</p>
                    </div>
                </div>

                <button className="floatRight delete" onClick={() => setDeleteModalIsOpen(true)}>
                    <i className="fa fa-trash-o"/>
                </button>
            </div>

            <PopUpModal title="Edit post" isOpen={updateModalIsOpen} updateIsOpen={setEditModalIsOpen} content={<ChangePostForm updateIsOpen={updateModalIsOpen} post={post} button={editSubmitButton} user={user}/>}/>
            <PopUpModal title={title}  isOpen={viewModalIsOpen} updateIsOpen={setViewModalIsOpen} content={<ViewPostContent post={post}/>}/>
            <PopUpModal 
                title={"Are you sure you want to delete " +  title + "?"}  
                isOpen={deleteModalIsOpen} 
                updateIsOpen={setDeleteModalIsOpen}
                content={deleteContent}
            />
        </React.Fragment>
    )
}