import React, { useState, useEffect } from "react";

import axios from "axios";

import useStyles from "./styles";

const Home = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("username"));
  if (!token) {
    localStorage.clear();
    window.location.assign("/home");
  }

  const authenticateUser = async () => {
    console.log("authenticateUser---------------------");
    try {
      await axios.post(
        "http://localhost:8585/authenticateSession",
        {
          token,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
      localStorage.clear();
      window.location.assign("/home");
    }
  };

  useEffect(() => {
    console.log("useEffect");
    authenticateUser();
  }, []);

  const classes = useStyles();
  return <h1>Home</h1>;
};

export default Home;
