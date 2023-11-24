import React, { useEffect, useState } from 'react';
import PopUpModal from './PopUpModal';
import ViewPostContent from './ViewPostContent';
import ChangePostForm from './ChangePostForm';
import '../Styles/PostListView.css';

export default function ReviewListView({ reviews, keys, user, updateReview, Reviews}) {

    const [service, setService] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/services/${reviews.service}`)
                .then((response) => { if(response.ok) { return response.json(); } else { console.log('Error in fetching reviews:', response.status); }} )
            .then((reviewData) => { setService(reviewData); /*getUser(data, setUser, userReviewer) ;*/  }); 
            
            } catch (error) {
                console.log('Error in fetching reviews:', error);
            }
            }

            fetchData();
            
    }, []);


    

	let title = service.title;
    console.log(reviews.service);
	const editSubmitButton = (
		<input type="submit" id="createButton" value="Update" />
	);

	const [updateModalIsOpen, setEditModalIsOpen] = useState(false);
	// const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

	// function checkServiceId(services)
	// {
	// 	return services._id != post._id;
	// }

	const deleteContent = (
		<React.Fragment>
			<div id="container">
				<span id="deleteTextFormat">
					This action will delete your Review permanentanly and cannot be undone.
				</span>
				<button
					id="cancelButton"
					className="floatLeft"
					onClick={() => setDeleteModalIsOpen(false)}
				>
					Cancel
				</button>
				<button
					id="deleteButton"
					className="floatRight"
					onClick={async (e) => {
						e.preventDefault();
						// deleteService(post._id);
						// var categories = post.categories;
						var reviewId = reviews._id;

						//This needs to be commented back in when the api to remove a service from a user is setup.
						// const serviceUser = await fetch('http://localhost:3001/api/users/'+user._id+"/remove-service/"+serviceId, {
						// 	method: 'DELETE',
						// });
							
						// const userData = await serviceUser.json();
						// console.log(userData.message);
						
						

						updateServices(services => services.filter(checkServiceId));
						setDeleteModalIsOpen(false);
					}}
				>
					Delete
				</button>
			</div>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<div className="postBackground">
				<button
					className="floatLeft"
					id="edit"
					onClick={() => setEditModalIsOpen(true)}
				>
					<i className="fa fa-pencil" />
				</button>

				{/*add onclick to view post info*/}
				<div
					className="mainPostContent"
					onClick={() => setViewModalIsOpen(true)}
				>
					{/* <img src={post.pinImg} /> */}
					<div id="description">
						<h3>{title}</h3>
						<p>{reviews.text}</p>
                        <div className="review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}
                            style={{ fontSize: '25px', color: star <= reviews.rating ? 'gold' : 'gray' }}>
                            ★
                            </span>
                        ))}
                    </div>
					</div>
				</div>

				<button
					className="floatRight delete"
					onClick={() => setDeleteModalIsOpen(true)}
				>
					<i className="fa fa-trash-o" />
				</button>
			</div>

			{/* <PopUpModal
				title="Edit post"
				isOpen={updateModalIsOpen}
				updateIsOpen={setEditModalIsOpen}
				content={<ChangePostForm post={post} categoryList={categoryList} services={services} updateIsOpen={setEditModalIsOpen}/>}
			/>
			<PopUpModal
				title={title}
				isOpen={viewModalIsOpen}
				updateIsOpen={setViewModalIsOpen}
				content={<ViewPostContent post={post} user={user}/>}
			/>
			<PopUpModal
				title={'Are you sure you want to delete ' + title + '?'}
				isOpen={deleteModalIsOpen}
				updateIsOpen={setDeleteModalIsOpen}
				content={deleteContent}
			/> */}
		</React.Fragment>
	);
}
