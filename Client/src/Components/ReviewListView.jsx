import React, { useEffect, useState } from 'react';
import PopUpModal from './PopUpModal';
import ViewPostContent from './ViewPostContent';
import ChangePostForm from './ChangePostForm';
import { deleteReview } from '../utils/Reviews';
import '../Styles/PostListView.css';

export default function ReviewListView({ review, user, updateReviews, allReviews}) {
	const [rating, setRating] = useState(review.rating);
    const [service, setService] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/services/${review.service}`)
                .then((response) => { if(response.ok) { return response.json(); } else { console.log('Error in fetching reviews:', response.status); }} )
            .then((reviewData) => { setService(reviewData); /*getUser(data, setUser, userReviewer) ;*/  }); 
            
            } catch (error) {
                console.log('Error in fetching reviews:', error);
            }
            }

            fetchData();
            
    }, [allReviews]);

	let title = service.title;
	let descript = service.description;

	const handleRatingChange = (selectedRating) => { setRating(selectedRating) }

    console.log(review.service);
	const editSubmitButton = (
		<input type="submit" id="createButton" value="Update" />
	);

	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

	function checkReviewId(currReview)
	{
		return review._id != currReview._id;
	}

	const deleteContent = (
		<React.Fragment>
			<div id="container">
				<span id="deleteTextFormat">
					This action will delete your review permanentanly and cannot be undone.
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

						deleteReview(review._id);
						updateReviews(allReviews => allReviews.filter(checkReviewId));

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
					className="floatLeft delete leftCornerRounded"
					onClick={() => setDeleteModalIsOpen(true)}
				>
					<i className="fa fa-trash-o" />
				</button>

				<div
					className="mainReviewContent"
					// onClick={() => setViewModalIsOpen(true)}
				>
					
					<h3 id="reviewTitle">{title}</h3>
					<p id="description">{descript}</p>
				</div>

				<div className="floatRight updateReview">
					<div className="review-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} onClick={() => handleRatingChange(star)}
                            style={{ fontSize: '25px', color: star <= rating ? 'gold' : 'gray' }}>
                            ★
                            </span>
                        ))}
                    </div>
					<textarea defaultValue={review.text} className="fixAlign whiteBackDrop" rows="5" cols="50"/>
					<button
						id="updateReview"
						className = "updateButton"
						onClick={() => setEditModalIsOpen(true)}
					>
						Update
					</button>
				</div>
			</div>

			
			<PopUpModal
				title={'Are you sure you want to delete this review?'}
				isOpen={deleteModalIsOpen}
				updateIsOpen={setDeleteModalIsOpen}
				content={deleteContent}
			/>
		</React.Fragment>
	);
}
