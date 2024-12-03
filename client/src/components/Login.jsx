import React, { useState, useEffect } from 'react';
import { Container} from '@material-ui/core';

export const App = () => {
  const [values, setValues] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
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