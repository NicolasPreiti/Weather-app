//Iconos segun el clima
export const iconWeather = (weather) => {
  if (weather === 'Clear') return 'animated/day.svg';
  else if (weather === 'Clouds') return 'animated/cloudy.svg';
  else if (weather === 'Rain') return 'animated/rainy-6.svg';
  else if (weather === 'Mist') return 'animated/cloudy.svg';
  else if (weather === 'Drizzle') return 'animated/rainy-6.svg';
  else if (weather === 'Fog') return 'animated/rainy-6.svg';
};
