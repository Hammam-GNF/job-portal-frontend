import { useRoutes } from "react-router-dom";
import { AdminRoute } from "./AdminRoute";
import { ApplicantRoute } from "./ApplicantRoute";
import { EmployerRoute } from "./EmployerRoute";

import LoginPage from "../pages/auth/LoginPage";

export default function AppRoutes() {
    return useRoutes([
        { path: "/", element: <LoginPage /> },
        AdminRoute,
        EmployerRoute,
        ApplicantRoute
    ]);
}