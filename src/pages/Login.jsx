import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";

const Login = ({ loggedIn, setLoggedIn, setToken, setError }) => {
  // Membuat state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Jika sudah login, maka tampilkan
  if (loggedIn) {
    return (
      <div>
        <h1>You are already logged in</h1>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/a1/auth/login", {
        username,
        password,
      });
      setLoggedIn(true); // ubah status login
      setToken(response.data.token); // simpan token
      setError(""); // kosongkan pesan error
      localStorage.setItem("token", response.data.token); // simpan token di local storage
    } catch (error) {
      setError(error.response.data.message); // tampilkan pesan error
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
