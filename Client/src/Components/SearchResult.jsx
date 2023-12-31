import {useState, useEffect} from 'react'
import '../Styles/Search.css'
import NewChatModal from './NewChatModal';
import ReviewPopUp from './ReviewPopUp';
import {useNavigate} from 'react-router-dom'
export default function SearchResult({data, displayChatModal, updateModalIsOpen, setChatData, currUser, loggedInUser}){
    
    const [user, setUser] = useState(null);
    const [modalIsOpen, updateIsOpen] = useState(false);
    const [isReviewPopUpOpen, setReviewPopUpOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState([]);
    
    useEffect(() => {
    
        const fetchData = async () => {
          setReviews([]);
          try {
            const response = await fetch(`http://localhost:3001/api/reviews/service/${data._id}`)
            .then((response) => { if(response.ok) { return response.json(); } else { console.log('Error in fetching reviews:', response.status); }} )
          .then((reviewData) => { setReviews([...reviewData]); /*getUser(data, setUser, userReviewer) ;*/  }); 
          
          } catch (error) {
            console.log('Error in fetching reviews:', error);
          }

        };

        fetchData();
        
      }, [data]);

    const displayReview = () => {
        setReviewPopUpOpen(true);
    }

    let averageRating = 0
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      averageRating = Math.round(totalRating / reviews.length);
    }




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/${data.seller}`);
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
        // Cleanup function
        return () => {
            // Perform any necessary cleanup here, such as cancelling the ongoing fetch.
        };
    }, [data]);

    const startChat = ()=>{
        setChatData(data)
        displayChatModal()
    }
    
    if(user && data){
    return(
        <div className='servicePost'>
            <div className = 'serviceInfo'>
                <div className = 'serviceTitle'>
                    {data.title}
                </div>
                <div className = 'serviceDescription'>
                    {data.description}
                </div>
                <div className = 'serviceCategories'>
                        {data.categories.map((cat) => (
                            <div key={cat} className='category'>
                                {cat}
                            </div>
                        ))}         
                </div>
            </div>
            
            <div className = 'serviceDetails'>
                <div className = 'servicePrice'>
                    {`CAD $${data.price}`}
                    
                </div>
                <div className = 'serviceUser'>
                    {user && user._id ? `${user.firstName} ${user.lastName[0]}` :
                    ``
                    }
                    { loggedInUser ?
                        (user && ( user._id !== loggedInUser._id )?
                            <button className = 'chat' onClick={startChat}></button>
                            :
                            <></>
                        ):(<button className = 'chat' onClick={startChat}></button>)
                        
                        
                    }
                    
                </div>

                <div className = 'rating'>
                    
                    <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star}
                        style={{ fontSize: '25px', color: star <= averageRating ? 'gold' : 'gray' }}>
                        ★
                      </span>
                    ))}
                    </div>

                    <button className = 'reviewPop' onClick={ displayReview  }>{ `${reviews.length} review`}</button>
                </div>
                <div className = 'bookmark'>
                    <button className = 'bookmarkButton checkBookmark'></button>
                </div>
            </div>
                <ReviewPopUp reviews={reviews} setReviews = {setReviews} post_id={data._id} user={currUser} isOpen ={isReviewPopUpOpen} closePopUp={setReviewPopUpOpen} showForm={true}/>
            </div>
            
        
    )
                }
}