import React, {useState} from 'react'
import './ChangePostForm.css'

export const ChangePostForm = ({post, button, updateIsOpen, user}) => {  
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [categories, setCategories] = useState([]);
    const [descript, setDescript] = useState('');
    const [error, setError] = useState(null);  

    async function createSubmitHandler(event)
    {
        event.preventDefault();
        var currDate = new Date();
        
        try {
            console.log("start")
            const response = await fetch('http://localhost:3001/api/services/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "seller": user._id,
                    "description": descript,
                    "title": title,
                    "price": cost,
                    "created": currDate,
                    "updated": currDate,
                    "categories": categories
                }),
            });
            console.log("end")
    
            const data = await response.json();
            console.log(data);
    
            if (data.message) {
                setError(data.message);
            } 
            else {
                updateIsOpen(false)
            }
        
        } catch (error) {
            setError('An error occurred while registering');
        }
    }

    return (
        <form id="createForm" onSubmit={createSubmitHandler}>
            <div className="floatLeft changeLeft">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required={true} defaultValue={post.title} onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <div>
                    <label htmlFor="cost">Cost:</label>
                    <input type="text" name="cost" required={true} defaultValue={post.price} onChange={(event) => setCost(event.target.value)}/>
                </div>
            </div>
            <div className="floatRight changeRight">
                <div>
                    <label htmlFor="categories">Categories:</label>
                    <select name="cateories" multiple size="9" defaultValue={post.categories} 
                    onChange={(event) => {
                            var optionsArr = Array.from(event.target.options)
                            var categoryList = []
                            var optLen = optionsArr.length

                            for(var i = 0; i < optLen; i++)
                            {
                                if(optionsArr[i].selected)
                                {
                                    categoryList.push(optionsArr[i].value)
                                }
                            }
                            setCategories(categoryList)}
                        }>
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
                    <textarea name="description" rows="5" required={true} defaultValue={post.description} onChange={(event) => setDescript(event.target.value)}/>
                </div>
            </div>
            {button}
        </form>
    )
}