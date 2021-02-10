import React, { useState } from "react";
import JsFileDownloader from 'js-file-downloader';
import Modal from "react-modal";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { MdLink, MdFileDownload, MdDeleteForever } from "react-icons/md";
import axios from "axios";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import useStyles from "./styles";

const File = (file) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const classes = useStyles();
  const [fileRef, setFileRef] = useState(file);
  const [link, setLink] = useState();

  const fetchPresignedLink = async (fileRef) => {
    var data = JSON.stringify({
      filename: fileRef.fileName,
      filetype: fileRef.fileType,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACK_END_URL}/geturl`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data.url);
        setLink(response.data.url);
        setIsOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const downloadPresignedFile = async (fileRef) => {
    var data = JSON.stringify({
      filename: fileRef.fileName,
      filetype: fileRef.fileType,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BACK_END_URL}/geturl`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data.url);
        new JsFileDownloader({ 
          url: response.data.url
        })
        .then(function () {
          console.log('file download over');
        })
        .catch(function (error) {
          console.log('error occurred')
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function getLink() {
    console.log("getLink", fileRef);
    fetchPresignedLink(fileRef);
  }

  function downloadFile() {
    console.log("download", fileRef);
    downloadPresignedFile(fileRef);
  }

  function removeFile() {
    console.log("removeFile", fileRef);
  }
  return (
    <Card className={classes.root}>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onRequestClose={() => setIsOpen(false)}
        overlayClassName={{
          base: "overlay-base",
          afterOpen: "overlay-after",
          beforeClose: "overlay-before"
        }}
        className={{
          base: "content-base",
          afterOpen: "content-after",
          beforeClose: "content-before"
        }}
        closeTimeoutMS={500}
      >
        <a href={ link } target="_blank" rel="noreferrer">File Link</a>
      </Modal>
      <ContextMenu id={fileRef.fileName} className={classes.contextMenu}>
        <MenuItem
          className={classes.contextMenuItem}
          onClick={() => getLink(file)}
        >
          <MdLink /> &nbsp; Get Link
        </MenuItem>
        <MenuItem
          className={classes.contextMenuItem}
          onClick={() => downloadFile(file)}
        >
          <MdFileDownload />
          &nbsp; Download
        </MenuItem>
        <MenuItem divider />
        <MenuItem
          className={classes.contextMenuItem}
          onClick={() => removeFile(file)}
        >
          <MdDeleteForever /> &nbsp;Remove
        </MenuItem>
      </ContextMenu>

      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={file.displayImage}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <ContextMenuTrigger id={fileRef.fileName}>
        <CardActions style={{ display: "flex" }}>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              padding: "10px 0",
              textAlign: "center",
            }}
          >
            <Typography gutterBottom variant="subtitle2">
              {fileRef.originalName}
            </Typography>
          </div>
        </CardActions>
      </ContextMenuTrigger>
    </Card>
  );
};

export default File;
