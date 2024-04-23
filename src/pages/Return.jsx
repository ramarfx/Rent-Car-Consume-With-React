import { Table } from "react-bootstrap";

const Return = ({ token }) => {
  return (
    <div>
      <h1>Return</h1>

      <Table>
        <thead>
          <tr>
            <th>Tenant</th>
            <th>No Car</th>
            <th>Date Borrow</th>
            <th>Date Return</th>
            <th>Penalties Total</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Return;
