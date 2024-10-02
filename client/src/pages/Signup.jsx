import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    console.log(userData);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    };

    fetch("/api/Users", options)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.success) {
          localStorage.setItem('username', username);

          const loginData = {
            username,
            password,
          };
          const loginOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          };
          fetch("api/auth/login", loginOptions)
            .then((loginResponse) => loginResponse.json())
            .then((loginResponse) => {
              console.log(loginResponse);
              if (loginResponse.token) {
                localStorage.setItem("token", loginResponse.token);
                navigate('/ReccVibes');
              }
            })
            .catch((err) => console.error('Login error:', err));
        }
      })
      .catch((err) => console.error('Login error:', err));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
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
        Register
      </Button>
      <Form.Text className="d-block">
        Already have an account?{" "}
        <Link to="/login" className="login-here">
          Login here
        </Link>
      </Form.Text>
    </Form>
  );
};

export default Signup;
