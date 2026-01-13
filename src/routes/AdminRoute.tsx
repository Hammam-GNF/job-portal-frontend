import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/admin/Dashboard";
import UsersPage from "../pages/admin/UsersPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import CompaniesPage from "../pages/admin/CompaniesPage";

export const AdminRoute: RouteObject = {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
        {
            element: <AdminLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "users", element: <UsersPage /> },
                { path: "categories", element: <CategoriesPage /> },
                { path: "companies", element: <CompaniesPage /> },
            ],
        },
    ],
};

