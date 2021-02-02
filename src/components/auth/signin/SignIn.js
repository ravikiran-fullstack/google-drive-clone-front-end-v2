import React, { useState } from "react";
import PropTypes from "prop-types";

import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const signInUser = async (credentials) => {
  try {
    console.log("signin user called");
    const url = "https://google-drive-clone-rk.herokuapp.com/login";
    //const url = 'http://localhost:8585/login';
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const status = response.status;
    console.log("res, status", response, status);
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (err) {
    console.log("login error", err);
  }
};

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Google Drive Clone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignIn = ({ setToken }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signInUser({
      username,
      password,
    });
    console.log("token", data);
    setToken(data);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate={ false }>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="username"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/confirmemail" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
};

SignIn.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default SignIn;
