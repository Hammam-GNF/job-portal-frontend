import ProtectedRoute from "./ProtectedRoute";

export default function EmployerRoute() {
  return <ProtectedRoute allowedRoles={["employer"]} />;
}