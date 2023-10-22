import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const AddItemModal = ({ isOpen, onCloseModal, buttonText, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, imageUrl, weatherType };
    onAddItem(newItem);
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onCloseModal={onCloseModal}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <label className="modal__form-label">
        Name
        <input
          className="modal__form-input
       modal__input_type_text"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
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
          maxLength="1000"
          id="link"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <p className="modal__form-subtitle">Select the weather type:</p>
      <div className="modal__form-radio-inputs">
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              name="weatherType"
              type="radio"
              id="hot"
              value="hot"
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
        </div>
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              name="weatherType"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
        </div>
        <div>
          <label>
            <input
              className="modal__form-radio-btn"
              name="weatherType"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
