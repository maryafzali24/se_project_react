const latitude = 47.6061;
const longitude = -122.33;
const APIkey = "986a3a7b1fb27458ebdc3589b608f40f";

export const getWeatherApi = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    }
  });
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
