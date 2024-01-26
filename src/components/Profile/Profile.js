import React from "react";
import "../Profile/Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onSelectCard,
  onCreateModal,
  onLogOut,
  isLoggedIn,
  handleEditProfileModal,
  onLikeClick,
}) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="profile">
      <SideBar
        onLogOut={onLogOut}
        isLoggedIn={isLoggedIn}
        handleEditProfileModal={handleEditProfileModal}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        isLoggedIn={isLoggedIn}
        onLikeClick={onLikeClick}
      />
    </main>
  );
}

export default Profile;
