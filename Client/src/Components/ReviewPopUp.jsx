import React, { useState, useEffect } from 'react';
import '../Styles/ReviewPopUp.css';
import { useNavigate } from 'react-router-dom'

export default function ReviewPopUp({ reviews, setReviews, post_id, user, isOpen, closePopUp, showForm}) {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userReviewer, setUser] = useState([]);
  const navigate = useNavigate();
  let buttonClasses = "close-button"
  
  if(showForm === false)
  {
    buttonClasses += " w-full"
  }

  useEffect(() => {
    const fetchUserData = async () => {
    try{
      {
        setUser(await Promise.all(reviews.map(async(rev) => {
        
            const yyresponse = await fetch(`http://localhost:3001/api/users/${rev.reviewer}`);
            const userData = await yyresponse.json();
            var userList = {"reviewDataKey": rev, "reviewObject": userData}
 
            return userList;
        })) )
          
      }
      
  }catch (error){
    console.log('Error in fetching users:', error);
  }
  
};   

fetchUserData();

  }, [reviews]);

  const goToLogin=()=> {
    navigate('/login')
  }   

  let averageRating = 0
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = totalRating / reviews.length;
  }

  const handleRatingChange = (selectedRating) => { setRating(selectedRating) }
  const handleSubmitedReview = async (event) => {
    
    try {
        console.log(user._id);
        const response = await fetch('http://localhost:3001/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' 
        },
          
          body: JSON.stringify({
            service: post_id,
            reviewer: user._id,
            rating: rating,
            text: comment
          }),
        });
        
      if (!response.ok) {
        console.error('Error creating Review:', response.status);
        return;
      }

      const newReviewData = await response.json();
      setReviews([...reviews, newReviewData])

      setComment('')
      setRating(0)
    
    } catch (error) {
      console.log('An error occured while creating new review.',error);
    }

    console.log(userReviewer[0]);
    const firstName = userReviewer.map(innerArray => innerArray.reviewObject.firstName);
    console.log(firstName);
  }
  return (
    <div className={`review-pop-up ${isOpen ? 'open' : ''}`} onClick={() => closePopUp(false)}>
      { user ?   
        <div className="pop-up-content" onClick={(event) => event.stopPropagation()}>

          <div className="reviews-container">
            <h2 className="pop-up-title">Reviews</h2>
            <h2>{Math.round(averageRating * 10) / 10}★</h2>
          </div>

          <div className='review-list-container'>
            <div className="review-list">

            {userReviewer.map((userReviewer, index ) => (  
              
              <div key={index} className="review-item">
                  <p className="review-text">{userReviewer.reviewDataKey.text}</p>

                  <div className="review-star-container">
                    <p className="review-user">By: {userReviewer.reviewObject.firstName}</p> 
                  </div>  

                  <div className="review-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}
                          style={{ fontSize: '25px', color: star <= userReviewer.reviewDataKey.rating ? 'gold' : 'gray' }}>
                          ★
                        </span>
                      ))}
                    </div>
              </div>    
            
              ))}
            </div>            
          </div>

          {showForm === true ? <div className="review-form">
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
          </div>:<></>}

          <div className="buttons-container">

            <button className={buttonClasses} onClick={() => closePopUp(false)}>Close</button>
            {showForm === true ? <button className="submit-button" onClick={handleSubmitedReview}>Submit</button>: <></>}

          </div>

        </div>
        :
        <div className="backDrop" onClick={() => updateModalIsOpen(false)}>            
        <div className="modal" onClick={(event) => event.stopPropagation()}>
					<div className="modalTitle">
						<button
							className="modalClose floatLeft"
							onClick={() => closePopUp(false)}
						>
							X
						</button>
						<p className="largeText">{"You are not loged in."}</p>
					</div>
          

          <div className='noUser'>
            <div className="noUserText">Please login to access this feature</div>
            <button className="loginButton" onClick={goToLogin}>LOGIN</button>
          </div>
        </div>  
        </div>          
      } 
    </div>
  );
}
