import React from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, handleCloseModal, buttonText, onAddItem }) => {
  const initialValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, setValues } = useForm({
    initialValues,
  });

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    if (!isOpen) {
      setValues(initialValues);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New Garment"
      isOpen={isOpen}
      onClose={handleCloseModal}
      buttonText={buttonText}
      onSubmit={handleAddItemSubmit}
    >
      <div className="modal__text-inputs">
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="imageUrl"
            minLength="1"
            maxLength="1000"
            id="link"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <p className="modal__select-weather">Select the weather type:</p>
      <div className="modal__radio-inputs">
        <div className="modal__radio-set">
          <label className="modal__radio-btn-label">
            <input
              className="modal__radio-btn"
              name="weather"
              type="radio"
              id="hot"
              value="hot"
              onChange={handleChange}
              checked={values.weather === "hot"}
            />
            Hot
          </label>
        </div>
        <div className="modal__radio-set">
          <label className="modal__radio-btn-label">
            <input
              className="modal__radio-btn"
              name="weather"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleChange}
              checked={values.weather === "warm"}
            />
            Warm
          </label>
        </div>
        <div className="modal__radio-set">
          <label className="modal__radio-btn-label">
            <input
              className="modal__radio-btn"
              name="weather"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleChange}
              checked={values.weather === "cold"}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
