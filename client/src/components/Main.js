import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './Posts/Posts';
import Form from './Form/Form';
import { getPosts } from '../actions/posts';
import useStyles from '../styles';
import memories from '../images/memories.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const App = () => {
  const history = useHistory()
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    async function on_ready() {
      dispatch(getPosts());
      const token = localStorage.getItem("jwt")
      if (token) {
        const url = `http://localhost:5000/auth/validate`
        const obj = {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify({
            "token": token
          })
        }

        let response = await fetch(url, obj)
        console.log("pass1");
        if (response.status !== 200) {
          console.log("pass2");
          history.push("/")
        }
      } else {
        history.push("/")
      }
    }
    on_ready()
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;