import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loggedIn }) => {
  /**
   * Jika belum login, maka redirect ke halaman login
   * Jika sudah login, maka tampilkan
   */
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
