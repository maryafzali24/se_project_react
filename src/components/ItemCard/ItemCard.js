import React from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard, onLikeClick }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked =
    currentUser && item.likes && item.likes.includes(currentUser._id);

  const likeButtonClassName = `like__button ${
    isLiked ? "like__button_active" : "like__button_inactive"
  }`;

  const handleLike = (e) => {
    e.preventDefault();
    onLikeClick({ id: item._id, isLiked });
  };

  return (
    <div className="card">
      <img
        src={item.imageUrl}
        className="card__image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
      <h2 className="card__name"> {item.name}</h2>
      <div className="like__button-container">
        {currentUser && (
          <button
            className={`like__button ${likeButtonClassName}`}
            onClick={handleLike}
          ></button>
        )}
      </div>
    </div>
  );
};
export default ItemCard;
