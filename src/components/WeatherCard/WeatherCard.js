import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
console.log(weatherOptions);
const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  console.log(day);
  console.log(type);
  const weatherOption = weatherOptions.find((option) => {
    return option.day === day && option.type === type;
  });
  console.log(type);
  console.log(day);
  console.log(weatherOptions);
  // // const weatherOptionUrl = weatherOption?.imageUrl || "";
  // const weatherOptionUrl = weatherOption ? weatherOption.url : "";
  const weatherOptionUrl = weatherOption?.url || "";
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
