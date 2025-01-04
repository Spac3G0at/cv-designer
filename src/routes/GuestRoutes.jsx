import { useRoutes, Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";

const GuestRoutes = () => {
  const routes = [
    // { path: "/", element: <Home /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Navigate to="/login" replace /> },
  ];

  return useRoutes(routes);
};

const Register = () => <h1>Register Page</h1>;

export default GuestRoutes;
