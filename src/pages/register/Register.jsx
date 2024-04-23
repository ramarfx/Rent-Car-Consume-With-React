import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Register = ({ token }) => {
  const [registers, setRegisters] = useState([]); // untuk menampung data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/a1/register", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRegisters(response.data); // tampung data
      } catch (error) {
        console.log(error.response.data); // tampilkan pesan error di console
      }
    };
    fetchData();
  }, []);

  // Fungsi delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/a1/register/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newRegisters = registers.filter((register) => register.id !== id);
      setRegisters(newRegisters);
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <Link to="/register/add">Register Add</Link>

      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {registers.map((register) => (
            <tr key={register.id}>
              <td>{register.username}</td>
              <td>{register.phone}</td>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/register/edit/${register.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(register.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Register;
