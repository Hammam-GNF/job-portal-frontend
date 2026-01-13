import ProtectedRoute from "./ProtectedRoute";

export default function AdminRoute() {
  return <ProtectedRoute allowedRoles={["admin"]} />;
}