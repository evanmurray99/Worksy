import {useState, useEffect} from 'react'
import '../Styles/Search.css'
import NewChatModal from './NewChatModal';
import {useNavigate} from 'react-router-dom'
export default function SearchResult({data, displayChatModal, chatData, updateModalIsOpen, setChatData, currUser, setChats, chats}){
    
    const [user, setUser] = useState(null);
    const [modalIsOpen, updateIsOpen] = useState(false);

    const getRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (rating > 0) {
                stars.push(<span key={i} className="star checkedStar"></span>);
                rating--;
            } else {
                stars.push(<span key={i} className="star"></span>);
            }
        }
    
        return <div className="rating">{stars}</div>;
    };


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
    }, []);
    
    const navigate = useNavigate()

    const startChat = ()=>{
        var len = chats.length
        var noChat = true

        for(var i = 0; i < len; i ++)
        {
            if(chats[i].service === data._id)
            {
                noChat = false;
            }
        }

        console.log(data.seller)
        console.log(user._id)
        if(currUser._id !== data.seller)
        {
            if(noChat === true)
            {
                console.log(data)
                updateIsOpen(true)
                displayChatModal()
            }
            else
            {
                navigate('/chat')
            }
        }
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
                    <button className = 'chat' onClick={startChat}></button>
                </div>

                    {/* here will come the code for the review */}
                <div className = 'rating'>
                    {getRating(data.rating)}
                    <button className = 'reviewPop' onClick={displayReview}>{ `${data.reviews.length} review`}</button>
                </div>
                <div className = 'bookmark'>
                    <button className = 'bookmarkButton checkBookmark'></button>
                </div>
            </div>
                <NewChatModal title="Start New Chat" isOpen={modalIsOpen} updateModalIsOpen={updateIsOpen} data={data} user={currUser} setChats={setChats} chats={chats}/>
            </div>
        )
    }
}