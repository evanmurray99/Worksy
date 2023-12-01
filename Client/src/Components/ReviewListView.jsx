import React, { useEffect, useState } from "react";
import PopUpModal from "./PopUpModal";
import { deleteReview, editReview } from "../utils/Reviews";
import "../Styles/PostListView.css";

export function validateForm(
  revText,
  rating,
  reviewId,
  setMessage,
  setReviews,
  reviews
) {
  var message = "";
  var result = "error";

  if (revText !== "") {
    editReview(reviewId, { text: revText, rating: rating });

    setReviews((reviews) =>
      reviews.map((currReview) => {
        if (currReview._id === reviewId) {
          return { ...currReview, text: revText, rating: rating };
        } else {
          return currReview;
        }
      })
    );

    message += "Review was successfully updated.\n";
    result = "success";
  } else {
    message += "All reviews need to have a comment.\n";
    result = "error";
  }

  setMessage(<p className={result}>{message}</p>);
}

export default function ReviewListView({
  review,
  user,
  updateReviews,
  allReviews,
}) {
  const [rating, setRating] = useState(review.rating);
  const [service, setService] = useState([]);
  const [revText, setRevText] = useState(review.text);
  const [message, setMessage] = useState(<p></p>);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/services/${review.service}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("Error in fetching reviews:", response.status);
            }
          })
          .then((reviewData) => {
            if (reviewData !== undefined) {
              setService(reviewData);
            }
          });
      } catch (error) {
        console.log("Error in fetching reviews:", error);
      }
    };

    fetchData();
  }, [allReviews]);

  let title = service.title;
  let descript = service.description;

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  var handleSubmit = (event) => {
    event.preventDefault();
    validateForm(
      revText,
      rating,
      review._id,
      setMessage,
      updateReviews,
      allReviews
    );
  };

  const editSubmitButton = (
    <input type="submit" id="createButton" value="Update" />
  );

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  function checkReviewId(currReview) {
    return review._id != currReview._id;
  }

  const deleteContent = (
    <React.Fragment>
      <div id="container">
        <span id="deleteTextFormat">
          This action will delete your review permanentanly and cannot be
          undone.
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
            updateReviews((allReviews) => allReviews.filter(checkReviewId));

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
          className="floatLeft delete leftCornerRounded buttonWidth"
          onClick={() => setDeleteModalIsOpen(true)}
        >
          <i className="fa fa-trash-o" />
        </button>

        <div className="mainPostContent">
          <h3 id="reviewTitle">{title}</h3>

          <p id="description">{descript}</p>
        </div>

        <form
          className="floatRight updateReview"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
				onKeyDown={() => handleRatingChange(star)}
                style={{
                  fontSize: "25px",
                  color: star <= rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            defaultValue={revText}
            className="fixAlign whiteBackDrop"
            onChange={(e) => setRevText(e.target.value)}
            rows="5"
            cols="50"
            required
          />

          {message}
          <button id="updateReview" className="updateButton">
            Update
          </button>
        </form>
      </div>

      <PopUpModal
        title={"Are you sure you want to delete this review?"}
        isOpen={deleteModalIsOpen}
        updateIsOpen={setDeleteModalIsOpen}
        content={deleteContent}
      />
    </React.Fragment>
  );
}
