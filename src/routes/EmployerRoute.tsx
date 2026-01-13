import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmployerLayout from "../layouts/EmployerLayout";

import Dashboard from "../pages/employer/Dashboard";
import MyCompany from "../pages/employer/MyCompany";
import JobListings from "../pages/employer/JobListings";
import Applications from "../pages/employer/Applications";

export const EmployerRoute: RouteObject = {
    path: "/employer",
    element: <ProtectedRoute allowedRoles={["employer"]} />,
    children: [
        {
            element: <EmployerLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "company", element: <MyCompany /> },
                { path: "job-listings", element: <JobListings /> },
                { path: "applications", element: <Applications /> },
            ],
        },
    ],
};