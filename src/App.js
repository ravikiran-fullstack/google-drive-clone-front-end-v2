import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import ConfirmEmailForgotPassword from "./components/auth/confirmEmailForgotPassword/ComfirmEmailForgotPassword";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";

import Home from "./components/home/Home";
import Upload from "./components/upload/Upload";
import MenuAppBar from "./components/menuappbar/MenuAppBar";

import Container from "@material-ui/core/Container";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green, blue } from "@material-ui/core/colors";

//hooks
import useToken from "./hooks/useToken";
import useStyles from "./appStyles";

const App = () => {
  const [isDark, setIsDark] = useState(false);  
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  
  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#fff"
      },
      secondary: {
        main: blue[800]
      }
    },
  });

  const handleThemeChange = () => { 
    setIsDark(!isDark);
  }

  const currentUrl = window.location.pathname;
  const { token, setToken } = useToken();

  const classes = useStyles();

  if (currentUrl.includes("/signup")) {
    localStorage.removeItem('token');
    return <SignUp />;
  }

  if (currentUrl.includes("/confirmemail")) {
    localStorage.removeItem('token');
    return <ConfirmEmailForgotPassword />;
  }

  if (currentUrl.includes("/reset")) {
    localStorage.removeItem('token');
    return <ResetPassword />;
  }

  if (!token && !currentUrl.includes("/signup")) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <ThemeProvider theme={ isDark? darkTheme: lightTheme }>
      <div>
        <BrowserRouter>
          <MenuAppBar handleThemeChange={ handleThemeChange} isDark={isDark} />
          <Container component="main" className={classes.container}>
                <Switch>
                  <Route exact path="/">
                    <Home></Home>
                  </Route>
                  <Route path="/home">
                    <Home></Home>
                  </Route>
                  <Route path="/upload">
                    <Upload></Upload>
                  </Route>
                </Switch>
          </Container>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
