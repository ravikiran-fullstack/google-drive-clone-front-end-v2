import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heading: {
    textTransform: "uppercase",
  },
  messageSuccess: {
    color: "green",
  },
  messageFailure: {
    color: "red",
  },
  imgHolder: {
    margin: "auto",
    width: "150px",
    height: "150px",
    border: "3px black solid",
    borderRadius: "5px",
    marginTop: "1rem",
  },
  img:{
    width: "150px",
    height: "150px",
    objectFit: "cover"
  }
}));
