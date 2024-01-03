import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
// import avatar from "../../images/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import AvatarPlaceHolder from "../AvatarPlaceHolder/AvatarPlaceHolder";

const Header = ({
  weatherLocation,
  onCreateModal,
  onRegisterModal,
  isLoggedIn,
  onLogInModal,
}) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="App logo" />
        </Link>

        <p className="header__date">
          {currentDate}, {weatherLocation}
        </p>
      </div>

      <ToggleSwitch />
      <div className="header__button-container">
        {isLoggedIn ? (
          <button
            className="header__add-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        ) : (
          <button
            className="header__register-button"
            type="button"
            onClick={onRegisterModal}
          >
            Sign Up
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <Link to="/profile" className="link__container">
          <h3 className="header__name">{currentUser.name}</h3>
          <div>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                className="header__avatar-img"
                alt="avatar"
              />
            ) : (
              <AvatarPlaceHolder />
            )}
          </div>
        </Link>
      ) : (
        <Link to="/" className="header__login-link" onClick={onLogInModal}>
          Log In
        </Link>
      )}
    </header>
  );
};

export default Header;
