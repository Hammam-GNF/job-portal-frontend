import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import { useAuthHydrate } from "./hooks/useAuth";

// Routes
import AdminRoute from "./routes/AdminRoute";
import EmployerRoute from "./routes/EmployerRoute";
import ApplicantRoute from "./routes/ApplicantRoute";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import EmployerLayout from "./layouts/EmployerLayout";
import ApplicantLayout from "./layouts/ApplicantLayout";

// Pages
import AdminDashboard from "./pages/admin/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import ApplicantDashboard from "./pages/applicant/Dashboard";

function HomeRedirect() {
  return <Navigate to="/login" replace />;
}

export default function App() {
  useAuthHydrate();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>

        {/* Employer Routes */}
        <Route element={<EmployerRoute />}>
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<EmployerDashboard />} />
          </Route>
        </Route>

        {/* Applicant Routes */}
        <Route element={<ApplicantRoute />}>
          <Route path="/applicant" element={<ApplicantLayout />}>
            <Route index element={<ApplicantDashboard />} />
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}