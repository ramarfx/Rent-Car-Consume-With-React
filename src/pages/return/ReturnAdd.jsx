import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ReturnAdd = ({ token, setError }) => {
  const [rentId, setRentId] = useState(""); // untuk menampung username
  const [penaltiesId, setPenaltiesId] = useState(""); // untuk menampung username
  const [dateReturn, setDateReturn] = useState(""); // untuk menampung password
  const [total, setTotal] = useState(""); // untuk menampung phone
  const navigate = useNavigate(); // untuk navigasi
  const [rents, setRents] = useState([]);
  const [penalties, setPenalties] = useState([]);

  //get all user
  useEffect(() => {
    const fetchRent = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/a1/rent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRents(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    const fetchPenalties = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/a1/penalties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPenalties(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchRent();
    fetchPenalties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); //biar gak kerefresh
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/a1/return",
        {
          rent_id: rentId,
          penalty_id: penaltiesId,
          date_return: dateReturn,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message); // tampilkan message
      setDateReturn(""); // kosongkan pesan error
      setTotal(""); // kosongkan pesan error
      setError(""); // kosongkan pesan error
      navigate("/rent"); // redirect ke halaman register
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
      setError(error.response.data.message); // set pesan error
    }
  };
  return (
    <div>
      <h1>Return Add</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Rent</Form.Label>
          <Form.Select
            type={"text"}
            value={rentId}
            onChange={(e) => setRentId(e.target.value)}
          >
            {rents.map((rent) => (
              <option key={rent.id} value={rent.id}>
                {rent.tenant}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Penalty</Form.Label>
          <Form.Select
            type={"text"}
            value={penaltiesId}
            onChange={(e) => setPenaltiesId(e.target.value)}
          >
            <option value={null}>Tidak ada</option>
            {penalties.map((penalty) => (
              <option key={penalty.id} value={penalty.id}>
                ({penalty.id}) {penalty.keterangan} - {penalty.total}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
          <Form.Label>date return</Form.Label>
          <Form.Control
            type="date"
            value={dateReturn}
            onChange={(e) => setDateReturn(e.target.value)}
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
        <Button type="submit">return</Button>
      </Form>
    </div>
  );
};

export default ReturnAdd;
