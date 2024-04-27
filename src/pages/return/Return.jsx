import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Return = ({ token }) => {
  //membuat penampung data rent
  const [carReturn, setCarReturn] = useState([]);

  //get data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // request api
        const response = await axios.get("http://127.0.0.1:8000/a1/return", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //set data
        console.log(response.data);
        setCarReturn(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/a1/rent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newCarReturn = carReturn.filter((carReturn) => carReturn.id !== id);
      setCarReturn(newCarReturn);
    } catch (error) {
      console.log(error.response.data); // tampilkan pesan error di console
    }
  };
  return (
    <div>
      <h1>Return</h1>

      <Link to={"/return/add"}>add</Link>

      <Table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>No Car</th>
            <th>Date Borrow</th>
            <th>Date Return</th>
            <th>Penalties Total</th>
            <th>Total</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {carReturn.map((carReturn) => (
            <tr key={carReturn.id}>
              <td>{carReturn.rent.tenant}</td>
              <td>{carReturn.rent.no_car}</td>
              <td>{carReturn.rent.date_borrow}</td>
              <td>{carReturn.rent.date_return}</td>
              <td>{carReturn.penalty.total}</td>
              <td>{carReturn.total}</td>
              <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/return/edit/${carReturn.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(carReturn.id)}
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

export default Return;
