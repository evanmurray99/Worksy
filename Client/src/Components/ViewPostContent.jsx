import React from 'react'
import './ViewPostContent.css'

export const ViewPostContent = ({post}) => {
    var categories = []
    var categoryArr = post.categories
    var categoryLen = categoryArr.length

    for(var i = 0; i < categoryLen; i++)
    {
        categories.push(<div class="categoryContainer"><span>{categoryArr[i]}</span></div>)
    }

    return (
        <div id="popUpSize">
            <img id="resizeImg" src={post.pinImg}/>
            <div className="viewTextSize">
                <span className="floatLeft">Created by {post.user}</span>
                <span className="floatRight">Cost: CA {post.price}</span>
                <span className="inlineContent flexContainer">
                    <span id="centerVertically">Categories: </span>
                    <div className="flexContainer">{categories}</div>
                </span>
                <span id="flushLeft">{post.description}</span>
            </div>                       
        </div>
    )
}