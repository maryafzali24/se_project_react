import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

const ItemModal = ({
  selectedCard,
  onCloseModal,
  onDeleteCard,
  buttonText,
}) => {
  // Checking if the current user is the owner of the current clothing item
  // const userContext = useContext(CurrentUserContext);
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser._id;

  const handleDeleteCard = () => {
    onDeleteCard(selectedCard);
  };

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `button__delete-preview ${
    isOwn ? "button__delete-preview_visible" : "button__delete-preview_hidden"
  }`;

  return (
    <div className="modal">
      <div className="modal__preview-container">
        <button
          className="modal__close-btn-white"
          type="button"
          onClick={onCloseModal}
        />
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__preview-name">{selectedCard.name}</div>
        <div className="modal__preview-weather">
          Weather: {selectedCard.weather}
        </div>
        {isOwn && (
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteCard}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemModal;
