import ProtectedRoute from "./ProtectedRoute";

export default function ApplicantRoute() {
  return <ProtectedRoute allowedRoles={["applicant"]} />;
}