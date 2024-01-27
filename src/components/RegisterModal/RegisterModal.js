// Register.js

import { Link, useHistory } from "react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  buttonText,
  onSubmit,
  openLogInModal,
}) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const history = useHistory();

  const handleFormSubmitRegister = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleOpenLogin = (e) => {
    e.preventDefault();
    openLogInModal();
  };

  return (
    <div className="register">
      <ModalWithForm
        title="Sign up"
        isOpen={isOpen}
        onClose={handleCloseModal}
        buttonText={buttonText}
        onSubmit={handleFormSubmitRegister}
        name={"Register_modal"}
      >
        <label className="modal__label modal__label_register">
          Email*
          <input
            id="register-email"
            className="modal__input-text modal__input_text-register"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            minLength="1"
            maxLength="30"
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Password*
          <input
            className="modal__input-text modal__input_text-register"
            id="register-password"
            name="password"
            type="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            minLength="1"
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Name
          <input
            className="modal__input-text modal__input_text-register"
            id="register-name"
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label modal__label_register">
          Avatar URL
          <input
            className="modal__input-text modal__input_text-register"
            id="register-avatar"
            name="avatar"
            type="url"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
            minLength="1"
            autoComplete="off"
          />
        </label>
        <Link to="/" className="login__link" onClick={handleOpenLogin}>
          or Log In
        </Link>
      </ModalWithForm>
    </div>
  );
};

export default RegisterModal;
