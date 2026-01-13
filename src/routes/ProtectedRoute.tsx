import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/auth.store.ts";

type Props = {
    allowedRoles: Array<"admin" | "employer" | "applicant">;
};

export default function ProtectedRoute({ allowedRoles }: Props) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}