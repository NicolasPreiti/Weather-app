import React, { useState } from 'react';

export const ThemeContext = React.createContext({});

//Dark theme
const dark = {
  type: 'dark',
  colors: {
    one: '#141B26',
    two: '#fff',
    three: '#0D1219',
  },
};

//Light theme
const light = {
  type: 'light',
  colors: {
    one: '#fff',
    two: '#000',
    three: '#E8EDF5',
  },
};

export function ThemeProvider(props) {
  const [theme, setTheme] = useState(dark);

  //Alterna el tema
  const changeTheme = (theme) => {
    if (theme == dark) setTheme(light);
    else setTheme(dark);
  };

  const value = { theme, changeTheme };

  return <ThemeContext.Provider value={value} {...props} />;
}
