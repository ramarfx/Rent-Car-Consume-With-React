import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PenaltiesAdd = ({ token, setError }) => {
  const [userId, setUserId] = useState(""); // untuk menampung username
  const [noCar, setNoCar] = useState(""); // untuk menampung password
  const [keterangan, setKeterangan] = useState(""); // untuk menampung password
  const [total, setTotal] = useState(""); // untuk menampung phone
  const navigate = useNavigate(); // untuk navigasi
  const [users, setUsers] = useState([]);

  //get all user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/a1/register", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(response.data)
      } catch (error) {
        console.log(error.response.data);
      }
    }

    fetchData()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault(); //biar gak kerefresh
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/a1/penalties",
        {
          user_id: userId,
          no_car: noCar,
          keterangan,
          total
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message); // tampilkan message
      setNoCar(""); // kosongkan password
      setKeterangan(""); // kosongkan pesan error
      setTotal(""); // kosongkan pesan error
      setError(""); // kosongkan pesan error
      navigate("/penalties"); // redirect ke halaman register
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
      setError(error.response.data.message); // set pesan error
    }
  };
  return (
    <div>
      <h1>Penalty Add</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User</Form.Label>
          <Form.Select type={'text'} value={userId} onChange={e => setUserId(e.target.value)}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formBasicNoCar">
          <Form.Label>no Car</Form.Label>
          <Form.Control
            type="text"
            value={noCar}
            onChange={(e) => setNoCar(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicNoCar">
          <Form.Label>Keterangan</Form.Label>
          <Form.Control
            type="text"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Label>Total</Form.Label>
          <Form.Control
            type="text"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">add penalties</Button>
      </Form>
    </div>
  );
};

export default PenaltiesAdd;
