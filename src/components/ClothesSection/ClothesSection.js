import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({
  onSelectCard,
  onCreateModal,
  clothingItems,
  onLikeClick,
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const userClothingItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });

  return (
    <section className="clothes-section">
      <div className="clothes-section__container">
        <h3 className="clothes-section__title">Your Items</h3>
        <button
          className="clothes-section__btn"
          type="button"
          onClick={onCreateModal}
        >
          + Add items
        </button>
      </div>
      <ul className="clothes-section__cards">
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onSelectCard={onSelectCard}
              onLikeClick={onLikeClick}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
