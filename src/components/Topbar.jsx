import { Link } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const Topbar = () => {
  return (
    // <div>
    //   <h1>Navbar</h1>
    //   <Link to={"/"}>Home</Link>
    //   <Link to={"/about"}>About</Link>
    //   <Link to={"/contact"}>Contact</Link>
    // </div>
    <Navbar className="bg-tertiary">
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
            <Nav.Link as={Link} to={"/login"}>
              Login
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
