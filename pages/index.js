import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import feathers from "@feathersjs/client";
import axios from "axios";
import { useRouter } from "next/router";
import ErrorIcon from "@material-ui/icons/Error";

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
  },
  error: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: "16px"
  }
});

const feathersApp = feathers();
// const restClient = feathers.rest("http://localhost:3030");
const restClient = feathers.rest("https://api.mattmayo.org");
feathersApp.configure(restClient.axios(axios));
feathersApp.configure(feathers.authentication());

const postLogin = (email, password, setError, router) => {
  feathersApp
    .authenticate({
      strategy: "local",
      email,
      password
    })
    .then(() => {
      console.log("Logged in");
      router.push("/events");
    })
    .catch(e => {
      setError(e.message);
    });
};

const Error = props => {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <ErrorIcon color="error" />
      <Typography className={props.className} color="error" variant="body1">
        {props.children}
      </Typography>
    </div>
  );
};

const Home = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
          onClick={() => postLogin(email, password, setError, router)}
          variant="outlined"
        >
          Login
        </Button>
        {error && <Error className={classes.containerChild}>{error}</Error>}
      </Container>
    </div>
  );
};

export default Home;
