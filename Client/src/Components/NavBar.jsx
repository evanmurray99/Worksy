import React from "react";
import { Link } from "react-router-dom";
import PopUpModal from "./PopUpModal";
import ChangePostForm from "./ChangePostForm";
import Cookies from "js-cookie";
import "../Styles/NavBar.css";
import SearchBar from "./SearchBar";

export default function NavBar({
  leftButtons,
  modalIsOpen,
  updateModalIsOpen,
  user,
  updateServices,
  categoryList,
  setToken,
  token,
}) {
  let post = null;

  var logout = (event) => {};
  var logText = "Login";

  if (token !== undefined) {
    logText = "Logout";

    var logout = (event) => {
      Cookies.remove("token");
      setToken(undefined);
    };
  }

  return (
    <React.Fragment>
      <nav>
        <Link id="worksy" className="navLinks leftAlign" to="/">
          Worksy
        </Link>
        {leftButtons}
        <button className="rightAlign">
          <Link className="navLinks" onClick={logout} to="/login">
            {logText}
          </Link>
        </button>
      </nav>

      <PopUpModal
        title="Create new post"
        isOpen={modalIsOpen}
        updateIsOpen={updateModalIsOpen}
        content={
          <ChangePostForm
            post={post}
            user={user}
            updateIsOpen={updateModalIsOpen}
            updateServices={updateServices}
            categoryList={categoryList}
          />
        }
      />
    </React.Fragment>
  );
}
