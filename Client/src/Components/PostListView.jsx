import React, { useState, useEffect } from "react";
import PopUpModal from "./PopUpModal";
import ViewPostContent from "./ViewPostContent";
import ChangePostForm from "./ChangePostForm";
import ReviewPopUp from "./ReviewPopUp";
import "../Styles/PostListView.css";

export default function PostListView({
  post,
  user,
  deleteService,
  updateServices,
  categoryList,
  services,
}) {
  let title = post.title;

  const [updateModalIsOpen, setEditModalIsOpen] = useState(false);
  const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [isReviewPopUpOpen, setReviewPopUpOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  let averageRating = 0;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = Math.round(totalRating / reviews.length);
  }

  const editSubmitButton = (
    <input type="submit" id="createButton" value="Update" />
  );

  function checkServiceId(services) {
    return services._id != post._id;
  }

  const displayReview = () => {
    setReviewPopUpOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setReviews([]);
      try {
        const response = await fetch(
          `http://localhost:3001/api/reviews/service/${post._id}`
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log("Error in fetching reviews:", response.status);
            }
          })
          .then((reviewData) => {
            setReviews([
              ...reviewData,
            ]); /*getUser(data, setUser, userReviewer) ;*/
          });
      } catch (error) {
        console.log("Error in fetching reviews:", error);
      }
    };

    fetchData();
  }, [post]);

  const deleteContent = (
    <React.Fragment>
      <div id="container">
        <span id="deleteTextFormat">
          This action will delete {title} permanentanly and cannot be undone.
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
            deleteService(post._id);
            var categories = post.categories;
            var serviceId = post._id;

            //This needs to be commented back in when the api to remove a service from a user is setup.
            // const serviceUser = await fetch('http://localhost:3001/api/users/'+user._id+"/remove-service/"+serviceId, {
            // 	method: 'DELETE',
            // });

            // const userData = await serviceUser.json();
            // console.log(userData.message);

            for (var i = 0; i < categories.length; i++) {
              console.log(categories[i]);
              const serviceCategory = await fetch(
                "http://localhost:3001/api/categories/" +
                  categories[i] +
                  "/remove-service/" +
                  serviceId,
                {
                  method: "DELETE",
                }
              );

              const categoryData = await serviceCategory.json();
              console.log(categoryData.message);
            }

            updateServices((services) => services.filter(checkServiceId));
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
          className="floatLeft delete buttonWidth"
          onClick={() => setDeleteModalIsOpen(true)}
        >
          <i className="fa fa-trash-o" />
        </button>

        {/*add onclick to view post info*/}
        <div
          className="mainPostContent"
          onClick={() => setViewModalIsOpen(true)}
        >
          <img src={post.pinImg} />
          <div>
            <h3 id="reviewTitle">{title}</h3>
            <p id="description">{post.description}</p>
          </div>
        </div>
        <div className="floatRight updateReview">
          <div className="servicePrice">{`CAD $${post.price}`}</div>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "25px",
                  color: star <= averageRating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>
          <button
            className="reviewPop"
            onClick={displayReview}
          >{`${reviews.length} review`}</button>
          {/* <div className="bg-white rounded-xl">
						<input type="text" className="transparentBackDrop" defaultValue={"test"}/>
					</div> */}
        </div>

        <button
          className="floatRight buttonWidth"
          id="edit"
          onClick={() => setEditModalIsOpen(true)}
        >
          <i className="fa fa-pencil" />
        </button>
      </div>

      <PopUpModal
        title="Edit post"
        isOpen={updateModalIsOpen}
        updateIsOpen={setEditModalIsOpen}
        content={
          <ChangePostForm
            post={post}
            categoryList={categoryList}
            services={services}
            updateIsOpen={setEditModalIsOpen}
          />
        }
      />
      <PopUpModal
        title={title}
        isOpen={viewModalIsOpen}
        updateIsOpen={setViewModalIsOpen}
        content={<ViewPostContent post={post} user={user} />}
      />
      <PopUpModal
        title={"Are you sure you want to delete " + title + "?"}
        isOpen={deleteModalIsOpen}
        updateIsOpen={setDeleteModalIsOpen}
        content={deleteContent}
      />
      <ReviewPopUp
        reviews={reviews}
        setReviews={setReviews}
        post_id={post._id}
        user={user}
        isOpen={isReviewPopUpOpen}
        closePopUp={setReviewPopUpOpen}
        showForm={false}
      />
    </React.Fragment>
  );
}
