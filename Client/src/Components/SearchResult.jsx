import {useState, useEffect} from 'react'
import '../Styles/Search.css'
export default function SearchResult({data, displayChatModal, setChatData}){
    
    const [user, setUser] = useState(null);
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
                    <button className = 'chat' onClick={startChat}></button>
                </div>

                <div className = 'rating'>
                    {getRating(data.rating)}
                    {`${data.reviews.length} reviews`}
                </div>
                <div className = 'bookmark'>
                    <button className = 'bookmarkButton checkBookmark'></button>
                </div>
            </div>
            </div>
            
        
    )
                }
}