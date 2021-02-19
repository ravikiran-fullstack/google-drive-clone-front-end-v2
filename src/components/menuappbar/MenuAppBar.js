import React from "react";

import { Link } from "react-router-dom";

import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import BackupIcon from "@material-ui/icons/Backup";

import useStyles from "./styles";

export default function MenuAppBar({ handleThemeChange, isDark }) {
  const classes = useStyles();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.assign("/home");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
        <img className="gb_uc gb_8d" src="//ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png" alt="" aria-hidden="true" style={{ width: "40px", height: "40px"}}/>
          <Typography variant="h6" noWrap style={{ flexGrow: "1", marginLeft: '8px' }}>
            Drive Clone
          </Typography>
          <Switch checked={isDark} onClick={handleThemeChange} />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home"></ListItemText>
              </ListItem>
            </Link>
            <Link to="/upload" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon />
                </ListItemIcon>
                <ListItemText>Upload</ListItemText>
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
