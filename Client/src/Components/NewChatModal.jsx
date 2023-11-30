import { useState, useEffect } from "react";
import "../Styles/PopUpModal.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function NewChatModal({
  title,
  isOpen,
  updateIsOpen,
  PageData,
}) {
  var result = null;
  const [loggedInUser, setLoggedInUser] = useState();
  const template = PageData
    ? `Hi! I would like to learn more about your service ${PageData.title}. Thank you!`
    : "";
  const [newMessage, setNewMessage] = useState(template);
  const navigate = useNavigate();

  const checkDuplicate = (dataA, buyer, seller, service) => {
    for (let i = 0; i < dataA.length; i++) {
      if (
        dataA[i].buyer === buyer &&
        dataA[i].seller === seller &&
        dataA[i].service === service
      ) {
        return dataA[i]._id; // Duplicate found
      }
    }

    return null; // No duplicate found
  };

  const initializeChat = (buyer, seller, service) => {
    console.log(buyer, seller, service);
    const url = `http://localhost:3001/api/chats`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        buyer: buyer,
        seller: seller,
        service: service,
      }),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201)
          return response.json();
        else {
          return;
        }
      })
      .then((data) => {
        sendMessage(data._id);
      })
      .catch((e) => console.log(e.message));
  };

  const sendMessage = (id) => {
    const url = `http://localhost:3001/api/chats/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ sender: loggedInUser._id, body: newMessage }),
    })
      .then((response) => {
        if (response.status === 200 || response.data === 201)
          return response.json();
        else {
          console.log(response);
          return;
        }
      })
      .then((data) => {})
      .catch((e) => console.log(e.message));
  };
  const beginNewChat = () => {
    if (newMessage.trim() !== "") {
      const url = `http://localhost:3001/api/chats/buyer/${loggedInUser._id}`;
      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          else if (response.status == 404) {
            initializeChat(loggedInUser._id, PageData.seller, PageData._id);
            return;
          } else {
            return;
          }
        })
        .then((data) => {
          //Check if there is a duplicate
          if (
            checkDuplicate(
              data,
              loggedInUser._id,
              PageData.seller,
              PageData._id
            )
          ) {
            sendMessage(
              checkDuplicate(
                data,
                loggedInUser._id,
                PageData.seller,
                PageData._id
              )
            );
          } else {
            sendMessage(
              initializeChat(loggedInUser._id, PageData.seller, PageData._id)
            );
          }
        })
        .catch((e) => console.log(e.message));
      updateIsOpen(false);
    }
  };
  useEffect(() => {
    const template = PageData
      ? `Hi! I would like to learn more about your service ${PageData.title}. Thank you!`
      : "";
    setNewMessage(template);
    const token = Cookies.get("token");
    const url = "http://localhost:3001/api/users/" + token + "/auth";
    // do a check token before request
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        else {
          return;
        }
      })
      .then((data) => {
        setLoggedInUser(data.user);
      })
      .catch((e) => console.log(e.message));
  }, [PageData]);

  const goToLogin = () => {
    navigate("/login");
  };

  if (isOpen) {
    result = (
      <div className="backDrop" onClick={() => updateIsOpen(false)}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modalTitle">
            <button
              className="modalClose floatLeft"
              onClick={() => updateIsOpen(false)}
            >
              X
            </button>
            <p className="largeText">{title}</p>
          </div>
          {loggedInUser ? (
            <div className="newChat">
              <div className="chatIntro">
                {`Start Chatting with the creator of this service!`}
              </div>
              <form onSubmit={beginNewChat}>
                <textarea
                  type={"text"}
                  className={"newMessage"}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={"Enter a new Message here"}
                ></textarea>
                <button className="loginButton">SEND</button>
              </form>
            </div>
          ) : (
            <div className="noUser">
              <div className="noUserText">
                Please login to access this feature
              </div>
              <button className="loginButton" onClick={goToLogin}>
                LOGIN
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return result;
}
