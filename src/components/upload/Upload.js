import React, { useRef } from "react";

import S3 from 'react-aws-s3';

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const Upload = () => {
  const fileInput = useRef();
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      dirName: process.env.REACT_APP_DIR_NAME /* optional */,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
      } else {
        console.log("fail");
      }
    });
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
            <label>
              Upload file:
              <input type="file" ref={fileInput} />
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
