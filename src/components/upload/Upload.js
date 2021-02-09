import React, { useState, useRef } from "react";
import axios from "axios";

import { nanoid } from "nanoid";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const Upload = () => {
  const fileInput = useRef();
  const classes = useStyles();
  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  // const [enableUpload, setEna]

  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    localStorage.removeItem('token');
    window.location.assign("/home");
  }

  const fileHandler = (e) => {
    setPreviewImage('');
    setShowPreview(false);
    if (!e.target.files[0]) { 
      return;
    }    
    console.log("e.target.files[0].filetype", e.target.files[0].type);

    if (e.target.files[0].type.includes("image")) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setShowPreview(true);
          setPreviewImage(fileReader.result);
        }
      };

      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    if (!file) {
      return;
    }
    // let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    // console.log(file, newFileName, file.type);

    const randomPrefix = nanoid(3).toLowerCase();
    const uploadFileName = `${randomPrefix}_${file.name}`;
    const fileParams = {
      filename: uploadFileName,
      filetype: file.type,
    };
    let uploadUrl;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/puturl`,
        fileParams,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response);
      uploadUrl = response.data.url;
      // console.log(uploadUrl);
      const s3Response = await axios.put(uploadUrl, file, {
        headers: { ContentType: file.type, "Access-Control-Allow-Origin": "*" },
      });
      console.log(s3Response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.heading}>
            Upload File
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate={false}
          >
            { showPreview && <div className="imgHolder">
              <img src={previewImage} alt="" id="img" className={ classes.img} />
            </div>}
            <label>
              <input type="file" ref={fileInput} onChange={fileHandler} />
            </label>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Upload
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Upload;
