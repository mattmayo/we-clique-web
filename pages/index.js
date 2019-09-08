import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import feathers from "@feathersjs/client";
import axios from "axios";

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

const feathersApp = feathers();
const restClient = feathers.rest("http://localhost:3030");
feathersApp.configure(restClient.axios(axios));
feathersApp.configure(feathers.authentication());

const postLogin = (email, password, setError) => {
  feathersApp
    .authenticate({
      strategy: "local",
      email,
      password
    })
    .then(() => {
      console.log("Logged in");
    })
    .catch(e => {
      setError(e.message);
    });
};

const Error = props => {
  return (
    <Typography className={props.className} variant="body1">
      {props.children}
    </Typography>
  );
};

const Home = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
          onChange={e => setEmail(e.target.value)}
          required={true}
          value={email}
          variant="outlined"
        />
        <TextField
          autoFocus={true}
          className={classes.containerChild}
          label="password"
          onChange={e => setPassword(e.target.value)}
          required={true}
          type="password"
          value={password}
          variant="outlined"
        />
        <Button
          className={classes.containerChild}
          color="primary"
          onClick={() => postLogin(email, password, setError)}
          variant="outlined"
        >
          Login
        </Button>
        <Error className={classes.containerChild}>{error}</Error>
      </Container>
    </div>
  );
};

export default Home;
