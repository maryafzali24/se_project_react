import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useMemo } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherTemp, onSelectCard, clothingItems, forecast, day }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 1000;

  // const getWeatherType = () => {
  //   if (temp >= 86) {
  //     return "hot";
  //   } else if (temp >= 66 && temp <= 85) {
  //     return "warm";
  //   } else if (temp <= 65) {
  //     return "cold";
  //   }
  // };
  // const weatherType = getWeatherType();
  const weatherType = useMemo(() => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    } else if (currentTemperatureUnit === "C") {
      if (temp >= "30") {
        return "hot";
      } else if (temp >= "18" && temp < "30") {
        return "warm";
      } else if (temp < "18") {
        return "cold";
      }
    }
  }, [currentTemperatureUnit, temp]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard weatherTemp={temp} day={day} type={forecast} />
      <section className="cards">
        <div className="card__header">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </div>
        <ul className="card__list">
          {filteredCards.map((item) => (
            <ItemCard
              item={item}
              key={item._id}
              card={filteredCards}
              onSelectCard={onSelectCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
