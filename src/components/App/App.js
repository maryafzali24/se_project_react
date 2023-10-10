import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getWeatherApi,
  parseWeatherData,
  parseLocationData,
  parseForecastData,
  parseTimeOfDay,
} from "../../utils/WeatherApi";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState("");
  const [day, setDay] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
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

  console.log(temp, "This is set temp");
  console.log(location, "This is current location");
  console.log(forecast, "This is current weather forecast");
  console.log(day, "Is it day time???");

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
    function handleClickOffModal(event) {
      if (event.target.classList.contains("modal")) {
        handleCloseModal();
      }
    }

    document.addEventListener("click", handleClickOffModal);
    return () => document.removeEventListener("click", handleClickOffModal);
  }, []);

  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header weatherLocation={location} onCreateModal={handleCreateModal} />
        <Main
          weatherTemp={temp}
          onSelectCard={handleSelectedCard}
          type={forecast}
          day={day}
        />
        {activeModal === "create" && (
          <AddItemModal
            isOpen={activeModal === "create"}
            onCloseModal={handleCloseModal}
            buttonText={"Add garment"}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onCloseModal={handleCloseModal}
          />
        )}

        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
