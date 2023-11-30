import { useState, useEffect } from "react";
import "../Styles/Chat.css";
import io from "socket.io-client";
import HOST from "../utils/ServerUtils";
import ChatListItem from "./ChatListItem";
import MessageList from "./MessageList";

const socket = io("http://" + HOST + ":3002");

export default function ChatComponent({ loggedInUser }) {
  const [isOpen, updateIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const getSelectedChat = () => {
    // Find the chat object based on the selected _id
    return chats.find((chat) => chat._id === selected) || {};
  };
  useEffect(() => {
    // Simulate a user logging in (replace with your actual login logic)
    const loginUser = async () => {
      try {
        // Your login logic here...

        // Assume you have obtained the user ID after successful login
        const userId = loggedInUser._id; // Replace with the actual user ID

        // Emit the 'login' event to the server with the user ID
        socket.emit("login", userId);
        socket.on("messageReceived", () => {
          setTrigger((prevTrigger) => !prevTrigger);
        });

        console.log("User logged in:", userId);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    };

    loginUser();
  }, []);

  useEffect(() => {
    setSelected("");
    setChats([]);
    getChats();
  }, [isOpen]);

  useEffect(() => {
    // Add the event listener for messageSent
  });

  useEffect(() => {
    setMessage("");
  }, [selected, isOpen, chats]);

  const sendMessage = () => {
    if (selected !== "" && message.trim() !== "") {
      const url = `http://"+HOST+":3001/api/chats/${selected}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ sender: loggedInUser._id, body: message }),
      })
        .then((response) => {
          if (response.status === 200 || response.data === 201)
            return response.json();
          else {
            console.log(response);
            return;
          }
        })
        .then((data) => {
          socket.emit("messageSent", {
            chat: getSelectedChat(),
            senderId: loggedInUser._id,
            message,
          });
          setTrigger((prevTrigger) => !prevTrigger);
        })
        .catch((e) => console.log(e.message));
      setMessage("");
    }
  };

  const getChats = () => {
    setChats([]);
    const url = `http://"+HOST+":3001/api/chats/buyer/${loggedInUser._id}`;
    const url2 = `http://"+HOST+":3001/api/chats/seller/${loggedInUser._id}`;

    fetch(url)
      .then((response) => {
        if (response.status === 200) return response.json();
        else return [];
      })
      .then((data) => {
        console.log("Call 1" + data);
        if (data && data.length !== 0) {
          setChats((prevChats) => [...prevChats, ...data]);
        }
        return fetch(url2); // Chain the second fetch
      })
      .then((response) => {
        if (response.status === 200) return response.json();
        else return [];
      })
      .then((data) => {
        console.log("Call 2" + data);
        if (data && data.length !== 0) {
          setChats((prevChats) => [...prevChats, ...data]);
        }
      })
      .catch((e) => console.log(e.message));
  };

  return loggedInUser ? (
    <>
      <div className="chatContainer">
        <button
          className="chatPopup"
          onClick={() => updateIsOpen(!isOpen)}
        ></button>
      </div>
      {isOpen ? (
        <div className="popup">
          <div className="chatList">
            <div className="chatTitle">Messages</div>
            <div className="chatListItems">
              {chats.length !== 0 ? (
                chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={`chatListItem ${
                      selected === chat._id ? "selected" : ""
                    } `}
                    onClick={() => setSelected(chat._id)}
                  >
                    <ChatListItem loggedInUser={loggedInUser} chat={chat} />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="chatListEnd"></div>
          </div>
          <div className="selectedChat">
            {selected !== "" ? (
              <div className="messageBox">
                <div className="messageList">
                  <MessageList
                    loggedInUser={loggedInUser}
                    chat={getSelectedChat()}
                    trigger={trigger}
                  />
                </div>
                <div className="messageActions">
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <button className="sendButton" onClick={() => sendMessage()}>
                    SEND
                  </button>
                </div>
              </div>
            ) : (
              <div className="noMessage">
                <div>Select a chat to send messages</div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
}
