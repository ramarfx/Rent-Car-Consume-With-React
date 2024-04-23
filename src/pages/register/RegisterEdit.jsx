import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const RegisterEdit = ({ token, setError }) => {
  const [username, setUsername] = useState(""); // untuk menampung username
  const [password, setPassword] = useState(""); // untuk menampung password
  const [phone, setPhone] = useState(""); // untuk menampung phone

  const { id } = useParams();
  const navigate = useNavigate();

  // Mendapatkan data register by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/a1/register/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log();
        setUsername(response.data.username);
        setPhone(response.data.phone);
      } catch (error) {
        console.log(error.response.data); // tampilkan pesan error di console
        setError(error.response.data.message); // set pesan error
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/a1/register/${id}`,
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
      setUsername(""); // kosongkan username
      setPassword(""); // kosongkan password
      setPhone(""); // kosongkan phone
      alert(response.data.message);
      navigate("/register");
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Register Edit</h1>
      <Form onSubmit={handleUpdate}>
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
        <Button type="submit">Update</Button>
      </Form>
    </div>
  );
};

export default RegisterEdit;
