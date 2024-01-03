import { latitude, longitude, APIkey } from "./constants";
import { proccessServerResponse } from "./Api";

navigator.geolocation.getCurrentPosition((position) => {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(`Latitude is: ${latitude}`);
  console.log(`Longitude is: ${longitude}`);

  getWeatherApi(latitude, longitude)
    .then((data) => {
      const weather = parseWeatherData(data);
      const location = parseLocationData(data);
      const forecast = parseForecastData(data);
      const isDaytime = parseTimeOfDay(data);

      console.log("Weather:", weather);
      console.log("Location:", location);
      console.log("Forecast:", forecast);
      console.log("Is Daytime:", isDaytime);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
});

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
  const sunrise = timeOfDay.sunrise * 1000;
  const sunset = timeOfDay.sunset * 1000;

  if (currentTime > sunrise && currentTime < sunset) {
    return true;
  } else {
    return false;
  }
};
