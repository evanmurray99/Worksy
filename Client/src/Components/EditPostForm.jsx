
import {ChangePostForm} from './ChangePostForm'
import './EditPostForm.css'

export const EditPostForm = ({post}) => {

    return (
        <div id="updateForm">
            <ChangePostForm post={post}/>
            {/* We need to call the post request from onClick to edit the services in the server */}
            <button id="updateButton">Update</button>
        </div>
    )
}