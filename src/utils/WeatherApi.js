import { latitude, longitude, APIkey } from "./constants";
import { proccessServerResponse } from "./api";

export const getWeatherApi = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(proccessServerResponse);

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;
  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };
  console.log(weather);
  return weather;
};

export const parseLocationData = (data) => {
  const userLocation = data.name;
  console.log(userLocation, "This is user current location");
  return userLocation;
};

export const parseForecastData = (data) => {
  const weather = data.weather;
  console.log(weather);
  const forecast = weather && weather[0].main.toLowerCase();
  return forecast;
};

export const parseTimeOfDay = (data) => {
  const currentTime = Date.now();
  const timeOfDay = data.sys;
  const sunrise = timeOfDay.sunrise;
  const sunset = timeOfDay.sunset;

  if (currentTime > sunrise && currentTime < sunset) {
    return true;
  } else {
    return false;
  }
};
