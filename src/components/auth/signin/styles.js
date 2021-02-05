import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: pink[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  // messageSuccess: {
  //   color: 'green'
  // },
  // messageFailure: {
  //   color: 'red'
  // },
  failureContainer: {
    background: '#ed1313',
    color: 'white',
    padding: '5px',
  },
  successContainer: {
    background:'#6de5b3',
    color: 'white'
  }
}));