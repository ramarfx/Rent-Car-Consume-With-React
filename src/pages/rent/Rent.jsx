import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Rent = ({ token }) => {
    //membuat penampung data rent
    const [rents, setRents] =useState([])

    //get data dari API
    useEffect(() => {
        const fetchData = async () => {
          try {
            // request api
            const response = await axios.get('http://127.0.0.1:8000/a1/rent', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            //set data
            console.log(response.data);
            setRents(response.data)
          } catch (error) {

          }
        }

        fetchData()
    },[])

    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://127.0.0.1:8000/a1/rent/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newRents = rents.filter((rent) => rent.id !== id);
          setRents(newRents)
        } catch (error) {
          console.log(error.response.data); // tampilkan pesan error di console
        }
      };
  return (
    <div>
      <h1>Rent</h1>

      <Link to={'/rent/add'}>Add</Link>

      <Table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>No Car</th>
            <th>Date Borrow</th>
            <th>Date Return</th>
            <th>Down Payment</th>
            <th>Total</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {rents.map((rent) => (
            <tr key={rent.id}>
                <td>{rent.tenant}</td>
                <td>{rent.no_car}</td>
                <td>{rent.date_borrow}</td>
                <td>{rent.date_return}</td>
                <td>{rent.down_payment}</td>
                <td>{rent.total}</td>
                <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/rent/edit/${rent.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(rent.id)}
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

export default Rent;
