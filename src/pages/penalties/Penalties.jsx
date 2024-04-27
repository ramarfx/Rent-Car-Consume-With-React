import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Penalties = ({ token }) => {
  //membuat penampung data rent
  const [penalties, setPenalties] = useState([]);

  //get data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // request api
        const response = await axios.get("http://127.0.0.1:8000/a1/penalties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        //set data
        console.log(response.data);
        setPenalties(response.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/a1/penalties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newPenalties = penalties.filter((penalty) => penalty.id !== id);
      setPenalties(newPenalties);
    } catch (error) {
      console.log(error.response); // tampilkan pesan error di console
    }
  };

  return (
    <div>
      <h1>Penalties</h1>

    <Link to={'/penalties/add'}>Add Penalty</Link>
      <Table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Keterangan</th>
            <th>Total</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {penalties.map((penalty) => (
            <tr key={penalty.id}>
                <td>{penalty.user_id}</td>
                <td>{penalty.keterangan}</td>
                <td>{penalty.total}</td>
                <td>
                <Button
                  variant="warning"
                  as={Link}
                  to={`/penalties/edit/${penalty.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(penalty.id)}
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

export default Penalties;
