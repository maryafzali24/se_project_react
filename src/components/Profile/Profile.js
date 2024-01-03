import React from "react";
import "../Profile/Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems,
  onSelectCard,
  onCreateModal,
  handleLogOut,
  isLoggedIn,
  handleEditProfileModal,
  onCardLike,
}) {
  // const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="profile">
      <SideBar
        handleLogOut={handleLogOut}
        isLoggedIn={isLoggedIn}
        handleEditProfileModal={handleEditProfileModal}
      />
      <ClothesSection
        clothingItems={clothingItems}
        onSelectCard={onSelectCard}
        onCreateModal={onCreateModal}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;
