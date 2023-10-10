import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day = true, type = "sunny", weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });

  const weatherOptionUrl = weatherOption ? weatherOption.url : "";
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <div>
        <img src={weatherOptionUrl} className="weather__image" alt={type} />
      </div>
    </section>
  );
};

export default WeatherCard;
