import React, { useState } from "react";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const sendEmailToServer = async (credentials) => {
  try {
    console.log("signin user called");
    const url = `${process.env.REACT_APP_BACK_END_URL}/confirmEmailResetPassword`;
    //"https://google-drive-clone-rk.herokuapp.com/confirmEmailResetPassword";
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

const ConfirmEmailForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendEmailToServer({
      username: email,
    });
    console.log("token", data);
    handleResponse(data);
  };

  const handleResponse = (data) => {
    console.log('data', data);
    setShowMessage(true);
    if (data.message === "Sent Successfully") {
      setSuccess(true);
      setMessageContent(
        "Email Sent Successfully, please click on the reset link"
      );
    } else if (data.message === "User doesn't  exists") {
      setSuccess(false);
      setMessageContent("User check the email or Signup with as a new user");
    } else if (data.message === "Enter valid email ID") {
      setSuccess(false);
      setMessageContent("User check the email or Signup with as a new user");
    } else {
      setSuccess(false);
      setMessageContent("An error ocurred, please try again later!");
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            Confirm Email
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate={false}
          >
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
            {showMessage && (
              <Grid container justify="center">
                <Grid item>
                  <Typography className={success? classes.messageSuccess: classes.messageFailure} variant="body2">{messageContent}</Typography>
                </Grid>
              </Grid>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ConfirmEmailForgotPassword;
