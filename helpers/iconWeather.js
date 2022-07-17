//Iconos segun el clima
export const iconWeather = (weather) => {
  if (weather === 'Clear') return 'src/animated/day.svg';
  else if (weather === 'Clouds') return 'src/animated/cloudy.svg';
  else if (weather === 'Rain') return 'src/animated/rainy-6.svg';
  else if (weather === 'Mist') return 'src/animated/cloudy.svg';
  else if (weather === 'Drizzle') return 'src/animated/rainy-6.svg';
  else if (weather === 'Fog') return 'src/animated/rainy-6.svg';
};
