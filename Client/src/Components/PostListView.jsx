import React, {useState} from 'react'
import './PostListView.css'

export const PostListView = (props) => {
    let post = props.post
    return (
        <div className="postBackground">
            <button className="floatLeft" id="edit">
                <i className="fa fa-pencil"/>
            </button>

            {/*add onclick to view post info*/}
            <div className="mainPostContent">
                <img src={post.pinImg}/>
                <div id="description">
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                </div>
            </div>

            <button className="floatRight delete">
                <i className="fa fa-trash-o"/>
            </button>
        </div>
    )
}