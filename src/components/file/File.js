import React, { useState } from "react";
import JsFileDownloader from "js-file-downloader";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { useModal } from "react-modal-hook";
import copy from "copy-to-clipboard";

import {
  MdLink,
  MdFileDownload,
  MdDeleteForever,
  MdContentCopy,
} from "react-icons/md";
import axios from "axios";

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import useStyles from "./styles";

const File = (file) => {
  const token = JSON.parse(localStorage.getItem("token"));
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
        // console.log('signed url ',response.data.url);
        setLink(response.data.url);
        showModal();
        // setIsOpen(true);
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
          url: response.data.url,
        })
          .then(function () {
            console.log("file download over");
          })
          .catch(function (error) {
            console.log("error occurred");
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
    showModal();
  }

  const copyCodeToClipboard = () => {
    // console.log('copyCodeToClipboard', link);
    // const el = document.createElement("textarea");
    // el.value = link;
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand("copy");
    // document.body.removeChild(el);
    copy(link);
  };

  const [showModal, hideModal] = useModal(({ in: open, onExited }) => (
    <Dialog open={open} onExited={onExited} onClose={hideModal}>
      <div style={{ width: "200px" }}>
        <DialogTitle>
          <div>
            <a
              className={classes.anchor}
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              File link
            </a>
            { link && <Button
              variant="outlined"
              color="secondary"
              onClick={() => copyCodeToClipboard(link)}
            >
              <MdContentCopy />
            </Button>}
          </div>
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={hideModal}
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  ), [link]);

  return (
    <Card className={classes.root}>
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
        <CardActions className={classes.cardActions}>
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
