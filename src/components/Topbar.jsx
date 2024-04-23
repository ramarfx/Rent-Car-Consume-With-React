import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import axios from "axios";

const Topbar = ({ loggedIn, token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/a1/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      setToken("");
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>PO Trans Sejahtera</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/rent"}>
              Rent
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/return"}>
              Return
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/penalties"}>
              Penalties
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={"/register"}>
              Register
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {loggedIn ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
