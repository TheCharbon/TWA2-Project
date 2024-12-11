import React, { useState } from 'react';
import { Container} from '@material-ui/core';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const App = () => {
  const history = useHistory()
  const [values, setValues] = useState({ username: "", password: "" });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = (event) => {
    async function on_ready(){

      event.preventDefault();
      if (validateForm()){
        const url = "http://localhost:5000/auth/login"
        console.log(values.username, " ", values.password)
        const obj = {
          method:"POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({
            "email": values.username,
            "password": values.password 
          })
        }
  
        console.log(obj)
        let result = await fetch(url, obj)
        let body = await result.json()
        if (result.status === 200 || result.status === 201){
          localStorage.setItem("jwt", body.jwt)
          history.push("/main")
        }
      } else {
        console.log("No mesage")
      }
    }
    on_ready()
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