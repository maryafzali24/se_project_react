import "./ItemModal.css";

const ItemModal = ({ selectedCard, onCloseModal, handleDeleteButton }) => {
  return (
    <div className="modal">
      <div className="modal__preview-container">
        <button
          className="modal__preview-close-btn"
          type="button"
          onClick={onCloseModal}
        />
        <img
          className="modal__image"
          src={selectedCard.link}
          alt={selectedCard.name}
        />
        <div className="modal__preview-name">{selectedCard.name}</div>
        <div className="modal__preview-type">
          Weather type: {selectedCard.weatherType}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
