import {useState, useEffect} from 'react'
import '../Styles/Chat.css'
export default function ChatComponent({loggedInUser}){
    const [isOpen, updateIsOpen] = useState(false)
    const [selected, setSelected] = useState('')
    const [chats,setChats] = useState([])

    useEffect(()=>{
       getChats()
    },[isOpen])

    const getChats = ()=>{
        const url = `http://localhost:3001/api/chats/buyer/${loggedInUser._id}`;
        const url2 = `http://localhost:3001/api/chats/seller/${loggedInUser._id}`;
        fetch(url, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json()
				else {
					return 
				}
			})
			.then((data) => {
                
                if(data && data.length!=0) {
                    data.ForEach((item)=>{
                        setChats([...data,item])
                    })
                    
                }
                
			})
			.catch((e) => console.log(e.message))
            .then(
                
        fetch(url2, {
			method: 'GET',
		})
			.then((response) => {
				if (response.status === 200) return response.json()
				else {
					return 
				}
			})
			.then((data) => {
                if(data && data.length!=0) {
                    data.ForEach((item)=>{
                        setChats([...data,item])
                    })
                    
                }
                
                
			})
			.catch((e) => console.log(e.message))
            )

        
    }
 
		
    return(
       
        loggedInUser ?
        (   
            <>
            <div className='chatContainer'>
                <button className = 'chatPopup' onClick={()=>updateIsOpen(!isOpen)}></button>
            </div>
            {
                isOpen?
                <div className='popup'>
                    <div className='chatList'>
                        <div className = 'chatTitle'>
                            Messages
                        </div>
                        <div className = 'chatListItems'>
                            {
                                chats.length !== 0 ?
                                chats.map((chat)=>(
                                    <div key = {chat._id} className={`chatListItem ${selected === chat._id ? 'selected':''} `} onClick={()=>setSelected(chat._id)}>
                                        getChatDetails(chats.length)
                                    </div>
                                ))
                                :
                                <></>
                            }
                        </div>
                        <div className = 'chatListEnd'>
                            
                        </div>
                    </div> 
                    <div className='selectedChat'>

            
                    </div>
                </div>
                :
                <></>
            }

            </>
            
            
        ):
        (<></>)
    )
}