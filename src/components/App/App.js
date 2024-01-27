import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LogInModal from "../LogInModal/LogInModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  Switch,
  Route,
  useHistory,
} from "react-router-dom/cjs/react-router-dom";
import {
  getWeatherApi,
  parseWeatherData,
  parseLocationData,
  parseForecastData,
  parseTimeOfDay,
} from "../../utils/WeatherApi";
import {
  getClothingItems,
  addNewClothingItem,
  deleteClothingItems,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";

import * as auth from "../../utils/Auth";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState("");
  const [day, setDay] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inputError, setInputError] = useState("");

  const history = useHistory();

  /***************Modals****************/

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (!activeModal) return;
    function handleClickOffModal(event) {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    }

    document.addEventListener("click", handleClickOffModal);
    return () => document.removeEventListener("click", handleClickOffModal);
  }, [activeModal]);

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSubmit = (request) => {
    setIsLoading(true);
    request()
      .then((data) => {
        handleCloseModal();
        return data;
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirm");
  };

  /********************CLothing Items***********************/

  useEffect(() => {
    getClothingItems()
      .then((res) => {
        if (Array.isArray(res)) {
          setClothingItems(res);
        } else {
          console.error("Data received is not an array:", res);
        }
      })
      .catch(console.error);
  }, []);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddNewItemSubmit = (newItem) => {
    const token = localStorage.getItem("jwt");

    function requestAddItem() {
      return addNewClothingItem(newItem, token).then((res) => {
        if (res && res.data) {
          setClothingItems((previousItems) => [res.data, ...previousItems]);
        }
      });
    }

    handleSubmit(requestAddItem);
  };

  const handleDeleteItemSubmit = (selectedCard) => {
    const token = localStorage.getItem("jwt");
    const deleteCardRequest = () => {
      return deleteClothingItems(selectedCard._id).then(() => {
        const newItem = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(newItem);
      });
    };
    handleSubmit(deleteCardRequest);
  };

  const handleLikeClick = ({ id, isLiked }) => {
    const jwt = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, jwt)
          .then((newItem) => {
            setClothingItems((cards) => {
              return cards.map((card) =>
                card._id === id ? newItem.data : card
              );
            });
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, jwt)
          .then((newItem) => {
            setClothingItems((cards) => {
              return cards.map((card) =>
                card._id === id ? newItem.data : card
              );
            });
          })
          .catch((err) => console.log(err));
  };

  /*****************************Users***********************************/

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.data);
          }
        })
        .then(() => {
          if (currentUser) {
            history.push("/profile");
          } else {
            history.push("/");
          }
        })
        .catch(console.error);
    }
  }, []);
  const handleAuthErrors = (error) => {
    const errorMessage = error.message || "";
    setInputError(
      errorMessage.includes("invalid email")
        ? "Invalid Email"
        : errorMessage.includes("incorrect password")
        ? "Incorrect Password"
        : "Login Failed. Please Try Again"
    );
    console.error(error);
  };

  const handleRegisterModal = () => {
    setActiveModal("register-signup");
  };

  const handleRegisterSubmit = (data) => {
    console.log("value of data top of RegisterSubmit app.js: ", data);
    setIsLoading(true);
    return auth
      .register(data)
      .then((res) => {
        console.log("registration response in registersubmit: ", res);
        handleLogInSubmit(data);
        history.push("/profile");
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogInModal = () => {
    setActiveModal("login-signin");
  };

  const handleLogInSubmit = (data) => {
    setIsLoading(true);
    return auth.logIn(data).then((res) => {
      console.log("user is logged in ");
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        auth
          .checkToken(res.token)
          .then((user) => {
            setCurrentUser(user.data);
            history.push("/profile");
            console.log("about to close modal");
            handleCloseModal();
            console.log("modal is closed");
          })
          .catch(handleAuthErrors)
          .finally(() => setIsLoading(false));
      }
    });
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = (data) => {
    setIsLoading(true);
    return auth
      .editProfile(data)
      .then((update) => {
        setCurrentUser(update.data);
        handleCloseModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogOut = () => {
    console.log("Logout");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    history.push("/");
  };

  /************************Weather********************* */

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeatherApi()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const locationData = parseLocationData(data);
        setLocation(locationData);
        const forecastData = parseForecastData(data);
        setForecast(forecastData);
        console.log(forecastData);
        const currentTimeOfDay = parseTimeOfDay(data);
        setDay(currentTimeOfDay);
        console.log(currentTimeOfDay);
      })
      .catch(console.error);
  }, []);

  // console.log(temp, "This is set temp");
  // console.log(location, "This is current location");
  // console.log(forecast, "This is current weather forecast");
  // console.log(day, "Is it day time???");

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherLocation={location}
            onCreateModal={handleCreateModal}
            temp={temp}
            isLoggedIn={isLoggedIn}
            onLogInModal={handleLogInModal}
            onRegisterModal={handleRegisterModal}
          />
          <Switch>
            <Route exact path="/">
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
                weatherForecast={forecast}
                isDay={day}
                onLikeClick={handleLikeClick}
              />
            </Route>
            <Route path="/profile">
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  clothingItems={clothingItems}
                  onCreateModal={handleCreateModal}
                  onSelectCard={handleSelectedCard}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  onLogOut={handleLogOut}
                  handleEditProfileModal={handleEditProfileModal}
                  onLikeClick={handleLikeClick}
                />
              </ProtectedRoute>
            </Route>
          </Switch>
          <Footer />

          {activeModal === "create" && (
            <AddItemModal
              isOpen={activeModal === "create"}
              onClose={handleCloseModal}
              buttonText={isLoading ? "Saving..." : "Add garment"}
              onAddItem={handleAddNewItemSubmit}
              handleSubmit={handleSubmit}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteCard={handleOpenConfirmationModal}
            />
          )}
          {activeModal === "confirm" && (
            <ConfirmationModal
              selectedCard={selectedCard}
              onClose={handleCloseModal}
              onDeleteItem={handleDeleteItemSubmit}
              buttonText={isLoading ? "Deleting..." : "Yes, delete item"}
            />
          )}
          {activeModal === "register-signup" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "register-signup"}
              buttonText={isLoading ? "Signing Up..." : "Next"}
              onSubmit={handleRegisterSubmit}
              openLogInModal={handleLogInModal}
            />
          )}
          {activeModal === "login-signin" && (
            <LogInModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login-signin"}
              buttonText={isLoading ? "Logging In..." : "Log In"}
              onSubmit={handleLogInSubmit}
              openRegisterModal={handleRegisterModal}
              inputError={inputError}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "dedit-profile"}
              buttonText={isLoading ? "Saving.." : "Save Changes"}
              onSubmit={handleEditProfileSubmit}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
