export async function getWeatherOf(cityName, unit) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  //Clima actual
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&lang=es&appid=${API_KEY}`
  );
  const dataCity = await request.json();

  //Pronostico
  const request2 = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${unit}&cnt=10&lang=es&appid=${API_KEY}`
  );
  const dataForecast = await request2.json();

  return { dataCity, dataForecast };
}
