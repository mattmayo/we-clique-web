import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  containerChild: {
    margin: "16px"
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.container} maxWidth="xs">
        <Typography
          align="center"
          className={classes.containerChild}
          variant="h4"
        >
          We Clique
        </Typography>
        <TextField
          autoFocus={true}
          className={classes.containerChild}
          label="email"
          required={true}
          variant="outlined"
        />
        <TextField
          autoFocus={true}
          className={classes.containerChild}
          label="password"
          required={true}
          type="password"
          variant="outlined"
        />
      </Container>
    </div>
  );
};

export default Home;
