import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onCloseModal, buttonText }) => {
  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      buttonText={buttonText}
    >
      <label className="modal__form-label">
        Name
        <input
          className="modal__form-input
       modal__input_type_text"
          type="text"
          name="name"
          minLength="1"
          maxLength="100"
          placeholder="Name"
          required
        />
      </label>
      <label className="modal__form-label">
        Image
        <input
          className="modal__form-input modal__input_type_text"
          type="url"
          name="Link"
          minLength="1"
          maxLength="30"
          id="link"
          placeholder="Image URL"
          required
        />
      </label>
      <p className="modal__form-subtitle">Select the weather type:</p>
      <div className="modal__form-radio-inputs">
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              name="radio-btn-weather"
              type="radio"
              id="hot"
              value="hot"
            />
            Hot
          </label>
        </div>
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              type="radio"
              id="warm"
              value="warm"
            />
            Warm
          </label>
        </div>
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              type="radio"
              id="cold"
              value="cold"
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
