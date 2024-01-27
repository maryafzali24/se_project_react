import React from "react";
import "./SideBar.css";
// import avatar from "../../images/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AvatarPlaceHolder from "../AvatarPlaceHolder/AvatarPlaceHolder";

const SideBar = ({ onLogOut, handleEditProfileModal, isLoggedIn }) => {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__content">
        {currentUser.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        ) : (
          <AvatarPlaceHolder name={currentUser.name} />
        )}
        <p className="sidebar__name">{currentUser.name}</p>
      </div>
      <button
        className="sidebar__button-edit"
        type="button"
        onClick={handleEditProfileModal}
      >
        Change Profile Data
      </button>

      <button
        className="sidebar__button-logout"
        type="button"
        onClick={onLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default SideBar;
