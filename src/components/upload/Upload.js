import React, { useState, useRef } from "react";
import axios from "axios";

import { nanoid } from "nanoid";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import useStyles from "./styles";

const Upload = () => {
  const fileInput = useRef();
  const classes = useStyles();
  const [previewImage, setPreviewImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState();
  const [selectedFile, setSelectedFile] = useState();
  // const [enableUpload, setEna]

  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    localStorage.removeItem("token");
    window.location.assign("/home");
  }

  const fileHandler = (e) => {
    setPreviewImage("");
    setShowPreview(false);
    if (!e.target.files[0]) {
      return;
    }
    console.log("e.target.files[0].filetype", e.target.files[0].type);
    setSelectedFile(e.target.files[0]);
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
    setError(false);
    setSuccess(false);
    setLoading(true);
    setMessage("");
    let file = fileInput.current.files[0];
    if (!file) {
      setLoading(false);
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
      if (s3Response.status === 200) {
        setSuccess(true);
        setLoading(false);
        setMessage("Successfully uploaded your file");
        console.log("s3Response", s3Response);
      } else {
        throw new Error("Error, please try again later");
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
      setLoading(false);
      setMessage("Error occurred please try again later");
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
            {showPreview && (
              <div className="imgHolder">
                <img
                  src={previewImage}
                  alt=""
                  id="img"
                  className={classes.img}
                />
              </div>
            )}

            <Grid container spacing={1} style={{ marginTop: "20px" }}>
              <Grid item xs={4} className={classes.gridItem}>
                <label htmlFor="upload-photo">
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    ref={fileInput}
                    onChange={fileHandler}
                  />
                  <Button
                    color="secondary"
                    variant="contained"
                    component="span"
                    size="small"
                  >
                    Choose File
                  </Button>
                </label>
              </Grid>
              <Grid item xs={8} className={classes.gridItem}>
                {selectedFile ? (
                  <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant="subtitle2">
                        File Name: {selectedFile.name}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Typography variant="subtitle2">
                        Choose a file to upload
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={loading}
            >
              Upload
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
            {error && (
              <Grid
                container
                justify="center"
                className={classes.failureContainer}
              >
                <Grid item>
                  <Typography variant="subtitle2">{message}</Typography>
                </Grid>
              </Grid>
            )}
            {success && (
              <Grid
                container
                justify="center"
                className={classes.successContainer}
              >
                <Grid item>
                  <Typography variant="subtitle2">{message}</Typography>
                </Grid>
              </Grid>
            )}
          </form>
        </div>
      </Container>
    </>
  );
};

export default Upload;
