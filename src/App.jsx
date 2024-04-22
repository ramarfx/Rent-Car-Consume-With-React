import Navbar from "./components/Topbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Return from "./pages/Return";
import Register from "./pages/Register";
import Penalties from "./pages/Penalties";
import Login from "./pages/Login";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/return" element={<Return />} />
            <Route path="/register" element={<Register />} />
            <Route path="/penalties" element={<Penalties />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
