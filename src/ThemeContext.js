import React, { useState, useEffect } from 'react';

const {Provider, Consumer} = React.createContext();



function ThemeContextProvider(props) {
  const [theme, setTheme ] = useState("light");



  const handleToggleTheme = () => {
     setTheme(prevState => (
      prevState === "light" ? "dark" : "light"
    ))
  }


  return (
    <Provider value={{theme: theme, handleToggleTheme: handleToggleTheme}}>
      {props.children}
    </Provider>
  )
}

export {ThemeContextProvider, Consumer as ThemeContextConsumer};
