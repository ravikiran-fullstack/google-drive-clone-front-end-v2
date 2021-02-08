import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import ConfirmEmailForgotPassword from "./components/auth/confirmEmailForgotPassword/ComfirmEmailForgotPassword";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";

import Home from "./components/home/Home";
import Upload from "./components/upload/Upload";
import MenuAppBar from "./components/menuappbar/MenuAppBar";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { red, green } from "@material-ui/core/colors";

//hooks
import useToken from "./hooks/useToken";
import useStyles from "./appStyles";
import { dark } from "@material-ui/core/styles/createPalette";

const App = () => {
  const [isDark, setIsDark] = useState(false);  
  const { token, setToken } = useToken();
  
  const classes = useStyles();
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  
  const lightTheme = createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: red[400]
      },
      secondary: {
        main: green[400]
      }
    },
  });
  const handleThemeChange = () => { 
    setIsDark(!isDark);
  }

  const currentUrl = window.location.pathname;
  if (currentUrl.includes("/signup")) {
    localStorage.clear();
    return <SignUp />;
  }

  if (currentUrl.includes("/confirmemail")) {
    localStorage.clear();
    return <ConfirmEmailForgotPassword />;
  }

  if (currentUrl.includes("/reset")) {
    localStorage.clear();
    return <ResetPassword />;
  }

  if (!token && !currentUrl.includes("/signup")) {
    return <SignIn setToken={setToken} />;
  }

  return (
    <ThemeProvider theme={ isDark? darkTheme: lightTheme }>
        <BrowserRouter>
          <MenuAppBar handleThemeChange={ handleThemeChange} isDark={isDark} />
          <Container component="main" className={classes.container}>
            <Grid container justify="center">
              <Grid item>
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
              </Grid>
            </Grid>
          </Container>
        </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
