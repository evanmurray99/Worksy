import React, { useState } from 'react';
import '../Styles/ChangePostForm.css';

function createCategories(categoryList)
{
	var result =[];

	for(var i = 0; i < categoryList.length; i++)
	{
		result.push(<option key={categoryList[i]} value={categoryList[i]} >{categoryList[i]}</option>)
	}

	return result;
}

async function createService(user, descript, title, cost, categories, updateServices, updateIsOpen, setError, error)
{
	var currDate = new Date();

	try {
		const response = await fetch('http://localhost:3001/api/services', {
		method: 'POST',
	 	headers: {
	 		'Content-type': 'application/json',
		},
		 	body: JSON.stringify({
				seller: user._id,
				description: descript,
				title: title,
				price: cost*1,
				created: currDate,
				updated: currDate,
				categories: categories,
			   rating: 0,
			   reviews: []
			}),
		});

		const data = await response.json();
		updateServices(services => [...services, data]);

		if (data.message) {
			setError(data.message);
		} else {
			updateIsOpen(false);
		}

		const serviceUser = await fetch('http://localhost:3001/api/users/'+user._id+"/add-service/"+data._id, {
			method: 'PUT',
		});
			
		const userData = await serviceUser.json();
		console.log(userData.message);

		for(var i = 0; i < categories.length; i++)
		{
			console.log(categories[i])
			const serviceCategory = await fetch('http://localhost:3001/api/categories/'+categories[i]+"/add-service/"+data._id, {
				method: 'PUT',
			});
				
			const categoryData = await serviceCategory.json();
			console.log(categoryData.message);
		}
	} catch (error) {
		setError('An error occurred while creating a server.');
	}
}

async function editServices(descript, title, cost, categories, updateServices, updateIsOpen, post, setError, error, services)
{
	try {
		const response = await fetch('http://localhost:3001/api/services/'+post._id, {
		method: 'PUT',
	 	headers: {
	 		'Content-type': 'application/json',
		},
		 	body: JSON.stringify({
				description: descript,
				title: title,
				price: cost*1,
				categories: categories,
			}),
		});
		const data = await response.json();
		updateIsOpen(false);

		var nextServ = [...services];
		for(var i = 0; i < services.length; i++)
		{
			if(post._id === services[i]._id)
			{
				nextServ[i].title = title
				nextServ[i].description = descript
				nextServ[i].categories = categories
				nextServ[i].price = cost
			}
		}

		updateServices(nextServ)
	} catch (error) {
		setError('An error occurred while creating a server.');
	}
}

export default function ChangePostForm({post, updateIsOpen, user, updateServices, categoryList, services}) {
	var buttonLabel = "";
	var isUpdate = false;

	if(post === null)
	{
		post = {id:"1", title: "", price: "", description: "", categories: []}
		buttonLabel = "Create New"
		isUpdate = false;
	}
	else
	{
		buttonLabel = "Update"
		isUpdate = true;
	}

	const [title, setTitle] = useState(post.title);
	const [cost, setCost] = useState(post.price);
	const [categories, setCategories] = useState(post.categories);
	const [descript, setDescript] = useState(post.description);
	const [error, setError] = useState(null);

	const CategoryOptions = createCategories(categoryList);

	async function createSubmitHandler(event) {
		event.preventDefault();

		if(isUpdate === false)
		{
			createService(user, descript, title, cost, categories, updateServices, updateIsOpen, setError, error);
		}
		else
		{
			editServices(descript, title, cost, categories, updateServices, updateIsOpen, post, setError, error, services);
		}
	}

	return (
		<form id="createForm" onSubmit={createSubmitHandler}>
			<div className="floatLeft changeLeft">
				<div>
					<label htmlFor="title">Title:</label>
					<input
						type="text"
						name="title"
						required={true}
						maxLength="25"
						defaultValue={post.title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="cost">Cost:</label>
					<input
						type="number"
						maxLength="10"
						name="cost"
						required={true}
						defaultValue={post.price}
						onChange={(event) => setCost(event.target.value)}
					/>
				</div>
			</div>
			<div className="floatRight changeRight">
				<div>
					<label htmlFor="categories">Categories:</label>
					<select
						name="cateories"
						multiple
						size="9"
						defaultValue={post.categories}
						onChange={(event) => {
							var optionsArr = Array.from(event.target.options);
							var categoryList = [];
							var optLen = optionsArr.length;

							for (var i = 0; i < optLen; i++) {
								if (optionsArr[i].selected) {
									categoryList.push(optionsArr[i].value);
								}
							}
							setCategories(categoryList);
						}}
					>
						{CategoryOptions}
					</select>
				</div>
			</div>
			<div className="belowFloats">
				<div>
					<label htmlFor="description">Description:</label>
					<textarea className="fixAlign"
						name="description"
						rows="5"
						required={true}
						defaultValue={post.description}
						maxLength="1000"
						onChange={(event) => setDescript(event.target.value)}
					/>
				</div>
			</div>
			<button id="createButton">{buttonLabel}</button>
		</form>
	);
}