import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RegisteAdd = ({ token, setError }) => {
  const [username, setUsername] = useState(""); // untuk menampung username
  const [password, setPassword] = useState(""); // untuk menampung password
  const [phone, setPhone] = useState(""); // untuk menampung phone
  const navigate = useNavigate(); // untuk navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/a1/register",
        {
          username,
          password,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message); // tampilkan message
      setUsername(""); // kosongkan username
      setPassword(""); // kosongkan password
      setPhone(""); // kosongkan phone
      setError(""); // kosongkan pesan error
      navigate("/register"); // redirect ke halaman register
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
      setError(error.response.data.message); // set pesan error
    }
  };
  return (
    <div>
      <h1>Register Add</h1>

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
        <Form.Group controlId="formBasicPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisteAdd;
