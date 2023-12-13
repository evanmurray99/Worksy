import { useState, useEffect } from "react";
import "../Styles/Chat.css";
export default function ChatListItem({ loggedInUser, chat }) {
  const [userDisplayName, setUserDisplayName] = useState("");
  const [chatDisplayName, setChatDisplayName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (loggedInUser._id === chat.seller) {
          // Call API to get buyer's information
          const response = await fetch(
            `http://localhost:3001/api/users/${chat.buyer}`
          );
          const userData = await response.json();
          setUserDisplayName(
            `${userData.firstName} ${userData.lastName.charAt(0)}`
          );
        } else {
          // Call API to get seller's information
          const response = await fetch(
            `http://localhost:3001/api/users/${chat.seller}`
          );
          const userData = await response.json();
          setUserDisplayName(
            `${userData.firstName} ${userData.lastName.charAt(0)}`
          );
        }

        // Call API to get service information
        const serviceResponse = await fetch(
          `http://localhost:3001/api/services/${chat.service}`
        );
        const serviceData = await serviceResponse.json();
        setChatDisplayName(serviceData.title);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loggedInUser, chat]);

  return (
    <>
      <div className="chatItem">
        <div className="chatUser">{userDisplayName}</div>
        <div className="chatService">{chatDisplayName}</div>
      </div>
    </>
  );
}
