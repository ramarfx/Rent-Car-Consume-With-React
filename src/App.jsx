import { Routes, Route, BrowserRouter } from "react-router-dom";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Return from "./pages/Return";
import Register from "./pages/register/Register";
import RegisterAdd from "./pages/register/RegisteAdd";
import Penalties from "./pages/Penalties";
import Login from "./pages/Login";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterEdit from "./pages/register/RegisterEdit";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // untuk simpan status login
  const [token, setToken] = useState(""); // untuk simpan token
  const [error, setError] = useState(""); // untuk simpan pesan error

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      setToken(token);
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Topbar
          loggedIn={loggedIn}
          token={token}
          setToken={setToken}
          setLoggedIn={setLoggedIn}
        />
        <Container>
          {/* Jika ada pesan error, maka tampilkan */}
          {error && <p className="text-danger">{error}</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <Login
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                  setToken={setToken}
                  setError={setError}
                />
              }
            />

            {/**
             * Jika sudah login, maka tampilkan
             * Jika belum login, maka redirect ke halaman login (di handle oleh Protected Route)
             */}
            <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
              <Route path="/rent" element={<Rent token={token} />} />
              <Route path="/return" element={<Return token={token} />} />
              <Route path="/register" element={<Register token={token} />} />
              <Route
                path="/register/add"
                element={<RegisterAdd token={token} setError={setError} />}
              />
              <Route
                path="/register/edit/:id"
                element={<RegisterEdit token={token} setError={setError} />}
              />
              <Route path="/penalties" element={<Penalties token={token} />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
};

export default App;
