import React, { useState, useEffect } from 'react';
import '../Styles/ReviewPopUp.css';

export default function ReviewPopUp({ post_id, isOpen, closePopUp }) {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // GET review using post_id
  // update the the state of reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:3001/api/services/${post_id}`);
        const reviewData = await response.json();
        setReviews(reviewData.reviews);

      } catch (error) {
        console.log('Error in fetching reviews:', error);
      }

    };

    fetchData();

  }, []);


  const [reviews, setReviews] = useState([]);

  let averageRating = 0

  if (reviews.length != 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = totalRating / reviews.length;
  }

  const handleRatingChange = (selectedRating) => { setRating(selectedRating) }

  const handleSubmitedReview = async (event) => {

    try {
        // Send POST request to create a new review
        const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
        },
          
          body: JSON.stringify({
            reviewer: 'John',
            rating: rating,
            text: comment
          }),
        });

      if (!response.ok) {
        console.error('Error creating Review:', response.status);
        return;
      }

      // Get the newly created review data
      const newReviewData = await response.json();

      setReviews([...reviews, newReviewData])

      setComment('')
      setRating(0)

    } catch (error) {
      setError('An error occured while creating new review.');
    }


  }
  return (
    <div className={`review-pop-up ${isOpen ? 'open' : ''}`}>
      <div className="pop-up-content">


        <div className="reviews-container">
          <h2 className="pop-up-title">Reviews</h2>
          <h2>{Math.round(averageRating * 10) / 10}★</h2>
        </div>

        <div className="review-list">

          {reviews.map((review, index) => (

            <div key={index} className="review-item">
              <p className="review-text">{review.text}</p>

              <div className="review-star-container">

                <p className="review-user">By: {review.reviewer}</p>
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}
                      style={{ fontSize: '25px', color: star <= review.rating ? 'gold' : 'gray' }}>
                      ★
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        <div className="review-form">
          <div className="comment-container">

            <label htmlFor="review-comment">Comment:</label>
            <div className="rating-container">

              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} onClick={() => handleRatingChange(star)}
                  style={{ fontSize: '25px', cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}>
                  ★
                </span>
              ))}
            </div>
          </div>

          <textarea name="" id="comment" cols="50" rows="4" value={comment} placeholder='Write your reivew here...' onChange={(e) => setComment(e.target.value)}></textarea>
        </div>

        <div className="buttons-container">

          <button className="close-button" onClick={() => closePopUp(false)}>Close</button>
          <button className="submit-button" onClick={handleSubmitedReview}>Submit</button>

        </div>

      </div>
    </div>
  );
}