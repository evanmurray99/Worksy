import { useEffect, useState } from 'react';
import '../Styles/Chat.css';

export default function MessageList({ loggedInUser, chat, trigger }) {
  const [messages, setMessages] = useState([]);

  const renderMessages = (chatData) => {
    // Sort messages by created timestamp
    if(chatData){
        const sortedMessages = chatData.sort((a, b) => a.created - b.created);

    return sortedMessages.map((message) => (
      <div
        key={message._id}
        className={message.sender === loggedInUser._id ? 'right-message' : 'left-message'}
      >
        {message.body}
      </div>
    ));
    }
    
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call API to get chat messages
        const response = await fetch(`http://localhost:3001/api/chats/messages/${chat._id}`);
        const chatData = await response.json();
        if(chatData){
            setMessages(chatData.messages);
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [chat]);

  useEffect(() => {
    console.log(trigger)
    const fetchData = async () => {
      try {
        // Call API to get chat messages
        const response = await fetch(`http://localhost:3001/api/chats/messages/${chat._id}`);
        const chatData = await response.json();
        if(chatData){
            setMessages(chatData.messages);
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [trigger]);

  return <div className="message-list">{renderMessages(messages)}</div>;
}
