import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import SignIn from "./components/auth/signin/SignIn";
import SignUp from "./components/auth/signup/SignUp";
import ConfirmEmailForgotPassword from "./components/auth/confirmEmailForgotPassword/ComfirmEmailForgotPassword";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";

import Home from "./components/home/Home";
import Upload from "./components/upload/Upload";
import MenuAppBar from './components/menuappbar/MenuAppBar';

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

//hooks
import useToken from "./hooks/useToken";
import useStyles from "./appStyles";

const App = () => {
  const currentUrl = window.location.pathname;
  const { token, setToken } = useToken();

  const classes = useStyles();

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
    <div>
      <BrowserRouter>
        <MenuAppBar/>
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
    </div>
  );
};

export default App;
