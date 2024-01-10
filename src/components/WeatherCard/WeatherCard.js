import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.weather === type;
  });
  console.log(type);
  console.log(day);
  console.log(weatherOption);
  // const weatherOptionUrl = weatherOption?.imageUrl || "";
  const weatherOptionUrl = weatherOption ? weatherOption.url : "";
  console.log(weatherOptionUrl);

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
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
