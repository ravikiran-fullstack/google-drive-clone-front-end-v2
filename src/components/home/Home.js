import React, { useState, useEffect } from "react";
import axios from "axios";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";

import File from "../file/File.js";

const Home = () => {
  const [files, setFiles] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const username = JSON.parse(localStorage.getItem("username"));
  if (!token) {
    localStorage.removeItem('token');
    window.location.assign("/home");
  }
  const authenticateUser = async () => {
    console.log("authenticateUser---------------------");
    try {
      await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/authenticateSession`,
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
      localStorage.removeItem('token');
      window.location.assign("/home");
    }
  };

  useEffect(() => {
    console.log("useEffect");
    authenticateUser();
  }, []);
  
  const prepareFilesForUI = (files) => { 
    const updatedFilesArray = files.map(file => { 
      if (file.fileType.indexOf("image") !== -1) {
        file.displayImage = './images/im1.png';
      } else if (file.fileType.indexOf("video") !== -1) {
        file.displayImage = './images/mv1.png';
      } else { 
        file.displayImage = './images/doc.png';
      }
      // file.fileName = file.fileName.slice(6, file.fileName.length);
      // console.log('file.slice(file.fileName.indexOf("_") + 1, file.fileName.length - 1)', file.slice(file.fileName.indexOf("_") + 1, file.fileName.length - 1));
      // file.fileName = file.slice(file.fileName.indexOf("_") + 1, file.fileName.length - 1);

      return file;
    })
    setFiles(updatedFilesArray);
  }

  const fetchFilesInfo = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/allfiles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      prepareFilesForUI(result.data.files);
    } catch (err) {
      console.log(err);
      localStorage.removeItem('token');
      window.location.assign("/home");
    }
  };

  useEffect(() => {
    fetchFilesInfo();
  }, []);

  const classes = useStyles();
  return (
    <>
      <h1>Home</h1>
      <Grid container className={classes.root}>
        {files.map((file) => {
          return (
            <Grid key={file.fileName} item>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  marginRight: "20px"
                }}
              >
                <File {...file} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
