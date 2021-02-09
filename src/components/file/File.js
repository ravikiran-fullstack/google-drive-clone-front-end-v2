import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import useStyles from "./styles";

const File = (file) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={file.displayImage}
          title="Contemplative Reptile"
        />
      </CardActionArea>
      <CardActions style={{ display: "flex"}}>
        <div style={{width: '100%', overflow:'hidden', padding:"10px 0", textAlign:"center"}}>
          <Typography gutterBottom variant="subtitle2">
            {file.fileName}
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

export default File;
