import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthHydrate } from "./hooks/useAuth";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Guard
import ProtectedRoute from "./routes/ProtectedRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import ApplicantLayout from "./layouts/ApplicantLayout";

// Dashboards
import AdminDashboard from "./pages/admin/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import ApplicantDashboard from "./pages/applicant/Dashboard";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes(Auth) */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Employer Routes */}
        <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerDashboard />} />
          </Route>
        </Route>

        {/* Applicant Routes */}
        <Route element={<ProtectedRoute allowedRoles={["applicant"]} />}>
          <Route path="/applicant" element={<ApplicantLayout />}>
            <Route index element={<ApplicantDashboard />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}