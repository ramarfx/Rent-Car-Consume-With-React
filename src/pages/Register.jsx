import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registers, setRegisters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/a1/registers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRegisters(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Register</h1>

      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {registers.map((register) => (
            <tr key={register.id}>
              <td>{register.username}</td>
              <td>{register.phone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Register;
