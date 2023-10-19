import React from 'react'
import './ChangePostForm.css'

export const ChangePostForm = ({post}) => {
    return (
        <React.Fragment>
            <div className="floatLeft changeLeft">
                <div>
                    <label htmlFor="coverImg">Cover Image:</label>
                    <input type="file" name="coverImg" defaultValue={post.imgPin}/>
                </div>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" defaultValue={post.title}/>
                </div>
                <div>
                    <label htmlFor="cost">Cost:</label>
                    <input type="text" name="cost" defaultValue={post.price}/>
                </div>
            </div>
            <div className="floatRight changeRight">
                <div>
                    <label htmlFor="categories">Categories:</label>
                    <select name="cateories" multiple size="9" defaultValue={post.categories}>
                        <option value="Webdesign">Webdesign</option>
                        <option value="Videographer">Videographer</option>
                        <option value="Painting">Painting</option>
                        <option value="Woodwork">Woodwork</option>
                        <option value="Graphic_Design">Graphic Design</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="diffTag">diffTag</option>
                    </select>
                </div>
            </div>
            <div className="belowFloats">
                <div>
                    <label htmlFor="description">
                        Description:
                    </label>
                    <textarea name="description" rows="5" defaultValue={post.description}/>
                </div>
            </div>
        </React.Fragment>
    )
}