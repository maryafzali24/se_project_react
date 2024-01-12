import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  name,
  onCloseModal,
  onSubmit,
  isOpen,
  isEnabled,
}) => {
  const submitButtonClass = `modal__submit-button ${
    isEnabled ? "modal__submit-button_enabled" : "modal__submit-button_disabled"
  }`;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onCloseModal} />
        <form className="modal__form" onSubmit={onSubmit}>
          <h3 className="modal__title">{title}</h3>
          {children}
          <button
            className={submitButtonClass}
            type="submit"
            // disabled={!isEnabled}
          >
            {buttonText}
          </button>
          <button
            className="modal__alt-submit-button"
            type="button"
            onClick={onCloseModal}
          />
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
