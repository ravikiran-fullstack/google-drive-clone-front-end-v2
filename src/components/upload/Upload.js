import React, { useRef } from "react";

// import S3 from 'react-aws-s3';
import {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import { nanoid } from "nanoid";

import useStyles from "./styles";

const Upload = () => {
  const fileInput = useRef();
  const classes = useStyles();
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: process.env.REACT_APP_DIR_NAME /* optional */,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const randomName = nanoid(10).toLowerCase();
    const uploadParams = {
      Bucket: config.bucketName,
      // Specify the name of the new object. For example, 'index.html'.
      // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
      Key: `google-drive-clone/${randomName}.jpg`,
      // Content of the new object.
      Body: file,
      ACL:'public-read'
    };
    const bucketParams = { Bucket: config.bucketName }; 
    const creds = {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    };

    const s3 = new S3Client({
      apiVersion: "2006-03-01",
      region: config.region,
      credentials: creds,
    });
    let str = `https://${config.bucketName}.s3-${config.region}.amazonaws.com/google-drive-clone/${randomName}.jpg`
    console.log('str ',str);
    s3.send(new PutObjectCommand(uploadParams))
      .then((data) => console.log(data, str))
      .catch((err) => console.log(err));

    s3.send(new ListBucketsCommand(bucketParams))
      .then((data) => console.log('ListBucketsCommand ',data))
      .catch((err) => console.log(err));

    // const ReactS3Client = new S3(config);
    // ReactS3Client.uploadFile(file, newFileName).then((data) => {
    //   console.log(data);
    //   if (data.status === 204) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //   }
    // });
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
