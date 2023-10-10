import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/clothingItems";

function Main({ weatherTemp, onSelectCard, forecast, day }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 1000;

  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weatherType.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard weatherTemp={temp} day type={forecast} />
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
