import type { RouteObject } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ApplicantLayout from "../layouts/ApplicantLayout";

import Dashboard from "../pages/applicant/Dashboard";
import MyApplications from "../pages/applicant/MyApplications";
import JobListings from "../pages/applicant/JobListings";

export const ApplicantRoute: RouteObject = {
    path: "/applicant",
    element: <ProtectedRoute allowedRoles={["applicant"]} />,
    children: [
        {
            element: <ApplicantLayout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "job-listings", element: <JobListings /> },
                { path: "applications", element: <MyApplications /> },
            ],
        },
    ],
};