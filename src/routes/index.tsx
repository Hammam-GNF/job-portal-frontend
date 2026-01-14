import type { RouteObject } from "react-router-dom";
import { AdminRoute } from "./AdminRoute";
import { EmployerRoute } from "./EmployerRoute";
import { ApplicantRoute } from "./ApplicantRoute";

// public
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import { Navigate } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },

  AdminRoute,
  EmployerRoute,
  ApplicantRoute,
];
