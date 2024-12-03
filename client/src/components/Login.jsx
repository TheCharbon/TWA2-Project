import React, { useState, useEffect } from 'react';
import { Container, Link} from '@material-ui/core';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const App = () => {
  const history = useHistory()
  const [values, setValues] = useState({ username: "", password: "" });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()){
      const { username, password } = values;
      const url = `http://localhost:${process.env.PORT}/auth/login`
      const obj = {
        method:"POST",
        body: JSON.stringify({
          "email": username,
          "password": password 
        })
      }

      let result = await fetch(url, obj)
      let response = await result.json()
      if (response.status === 200){
        localStorage.setItem("jwt", response.body.jwt)
        history.push("/main")
      }
    }
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("username and Password is required.");
      return false;
    } else if (password === "") {
      toast.error("username and Password is required.");
      return false;
    }
    return true;
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
      <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
      <button type="submit">Login</button>
      </form>
    </Container>
  );
};

export default App;