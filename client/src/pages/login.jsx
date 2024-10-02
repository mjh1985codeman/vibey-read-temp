// todo: login logic
// todo: sign-up logic
// what needs to populate here: logo, 1 form for login with a login button, the login button will take you to th homepage, a sign-up botton will start the process of a sign-up form either in popup or another page. on finish sign-up they will go back to log-in
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { UserContext } from "../App";
import logo from '../assets/VibeyReadsLong.png'

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
    };

    console.log(userData);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    fetch("/auth/login", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.token) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", username);
          setIsAuthenticated(true);
          navigate('/ReccVibes');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <img src={logo} alt="Vibey Reads Logo" className="logo" style={{ width: '750px', height: 'auto', marginBottom: '50px' }} />
        <br></br>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="d-block">
        Don't have an account?{" "}
        <Link to="/signup" className="login-here">
          Register here
        </Link>
      </Form.Text>
    </Form>
  );
};

export default Login;
