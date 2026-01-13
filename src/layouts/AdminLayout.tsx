import { Outlet } from "react-router-dom";
import { useAuth } from "../store/auth.store";

export default function AdminLayout() {
    const logout = useAuth((state) => state.logout);

    return (
        <div>
            <header style={{padding : 16, borderBottom: "1px solid #ccc"}}>
                <button onClick={logout}>Logout</button>
            </header>

            <main style={{padding: 16}}>
                <Outlet />
            </main>
        </div>
    );
}