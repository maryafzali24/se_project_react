import "./WeatherCard.css";
import "../App/App";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day = true, type = "sunny", weatherTemp = "" }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const imageSrc = weatherOptions.find((i) => {
    return i.day === day && i.type === type;
  });

  const imageSrcUrl = imageSrc ? imageSrc.url : "";
  console.log(imageSrcUrl, "This is weather card");
  return (
    <section className="weather" id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <div>
        <img src={imageSrcUrl} className="weather__image" alt={type} />
      </div>
    </section>
  );
};

export default WeatherCard;
