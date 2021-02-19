import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paperContainer: {
    backgroundImage: `url(${Image})`,
  },
  root: {
    width: "200px",
    height: "230px",
    marginBottom: "10px",
    borderRadius: "10px",
  },
  media: {
    width: "220px",
    height: "170px",
    
  },
  contextMenu: {
    width: "200px",
    zIndex: "500",
  },
  contextMenuItem: {
    borderBottom: "1px solid black",
    padding: "10px",
    cursor: "pointer",
    background: "#f1f1f1",
    "&:hover": {
      background: "#e2e2e2",
    },
  },
  anchor: {
    marginRight: "10px",
  },
  cardActions: {
    display: "flex",
    cursor: "pointer",
    background: "#f1f1f1",
    color:'black',
    "&:hover": {
      background: "#c2c2c2",
    },
  },
  truncate: {
    marginLeft:"10px", 
    width: "120px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
}));
