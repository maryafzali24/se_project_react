import { Link } from "react-router-dom/cjs/react-router-dom";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const LogInModal = ({
  handleCloseModal,
  isOpen,
  onSubmit,
  buttonText,
  openRegisterModal,
  handleClick,
}) => {
  const { values, handleChange, isValid } = useForm({
    email: "",
    password: "",
  });
  const history = useHistory();

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleFormSubmitLogIn = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handleOpenRegisterModal = (e) => {
    e.preventDefault();
    openRegisterModal();
  };

  return (
    <div className="login">
      <ModalWithForm
        title={"Log in"}
        name={"LogIn_Modal"}
        onCloseModal={handleCloseModal}
        isOpen={isOpen}
        onSubmit={handleFormSubmitLogIn}
        buttonState={isValid}
        buttonText={buttonText}
      >
        <label className="modal__label modal__label-login">
          Email
          <input
            id="login-email"
            className="modal__input modal__input-login"
            type="email"
            placeholder="Email"
            name="email"
            value={values.email}
            onChange={handleChange}
            minLength="1"
            required
            autoComplete="email"
          />
        </label>
        <label className="modal__label modal__label-login">
          Password
          <input
            id="login-password"
            className="modal__input modal__input-login"
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleChange}
            minLength="1"
            autoComplete="off"
            required
          />
        </label>

        <Link
          to="/"
          className="register__link"
          onClick={handleOpenRegisterModal}
        >
          or Register
        </Link>
      </ModalWithForm>
    </div>
  );
};

export default LogInModal;
