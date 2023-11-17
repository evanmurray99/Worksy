import React, {useState, useEffect} from 'react'
import '../Styles/ViewPostContent.css'

function createMsg(message, currUser, pos)
{
    var messageType = "currentUser"
    // if(message)
    // {
    //     var createdDate = new Date(message.created)
    // }

    if(message.sender !== currUser._id)
    {
        var messageType = "otherUser"
    }
    console.log(message)

    return (
        <div key={"message"+pos} className={'message '+messageType}>
            <p>{message.body}</p>
            {/* <p className="messageDate">{createdDate.getUTCMonth() + " " + createdDate.getUTCDate() + ", " +  createdDate.getUTCFullYear()}</p> */}
        </div>
    );
}

export default function ViewChatHistory ({chat, currUser, otherUser}) {
    const[messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState('');
    const [messageList, setMsgList] = useState([]);

    useEffect(() => {
        async function fetchData(){
        setMessages([])
        var numMessages = chat.messages.length
        var messageArr = chat.messages

        for( var i = 0; i < numMessages; i++)
        {
            var currUrl = 'http://localhost:3001/api/chats/message/' + messageArr[i]

            await fetch(currUrl, {
                method: 'GET',
                headers: {
                  'Content-type': 'application/json',
                },
              })
                .then((response) => {
                  if (response.status === 200) return response.json();
                  else throw new Error('Error in getChat');
                })
                .then((data) => {
                    console.log(data)
                    setMessages(prevMsgs => [...prevMsgs, data]);
                })
                .catch((e) => console.log(e.message));
            // console.log(chat.messages[i])
        }
        console.log(messages)
        console.log(messageList)
        // var messages = chat.messages;
        }
        fetchData();
        
    }, [chat.messages, ]);

    useEffect(() => {
        for(var i = 0; i < messages.length; i++)
        {
            setMsgList([...messageList, createMsg(messages[i], currUser, i)])
        }
    }, [messages]);

    async function createSubmitHandler(event) {
		event.preventDefault();

        var currDate = new Date();
        var newMsgContent = {
            sender: currUser._id,
            created: Date.UTC(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), currDate.getUTCHours(), currDate.getUTCMinutes(), currDate.getUTCSeconds()),
            body: newMsg,
        };

        try {
            const response = await fetch('http://localhost:3001/api/chats/'+chat._id, {
            method: 'PUT',
             headers: {
                 'Content-type': 'application/json',
            },
                 body: JSON.stringify(newMsgContent),
            });
    
            const data = await response.json();
            setMessages(messageArr => [...messageArr, newMsgContent]);

            // setMsgList(msgList => [...msgList, createMsg(newMsgContent, currUser, messages.length)])
        } catch (error) {
            setError('An error occurred while creating a server.');
        }
	}

	const handleEnter = (event) => {
		if(event.key === "Enter")
		{
			createSubmitHandler(event);
		}
	}

    return (
        <div>
            {messageList}
            <form id="createMsgForm" onSubmit={createSubmitHandler} onKeyDown={handleEnter}>
                <input type="text" id="chatBox" onChange={(event) => setNewMsg(event.target.value)}/>
                <button id="createMsg">Send</button>
            </form>
        </div>);

    // var categoryArr = post.categories
    // var categoryLen = categoryArr.length

    // for(var i = 0; i < categoryLen; i++)
    // {
    //     categories.push(<div className="categoryContainer"><span>{categoryArr[i]}</span></div>)
    // }

    // return (
    //     <div id="popUpSize">
    //         <img id="resizeImg" src={post.pinImg}/>
    //         <div className="viewTextSize">
    //             <span className="floatLeft">Created by {user.firstName} {user.lastName}</span>
    //             <span className="floatRight">Cost: CA ${post.price}</span>
    //             <span className="inlineContent flexContainer">
    //                 <span id="centerVertically">Categories: </span>
    //                 <div className="flexContainer">{categories}</div>
    //             </span>
    //             <span id="flushLeft">{post.description}</span>
    //         </div>                       
    //     </div>
   // )
}