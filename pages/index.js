import React from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
    <Container maxWidth="xs">
      <div className="container">
        <TextField
          autoFocus={true}
          label="email"
          required={true}
          variant="outlined"
        />
        <TextField
          autoFocus={true}
          label="password"
          required={true}
          type="password"
          variant="outlined"
        />
      </div>
    </Container>

    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        text-align: center;
      }
    `}</style>
  </div>
);

export default Home;
