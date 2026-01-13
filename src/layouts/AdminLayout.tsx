import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

export default function AdminLayout() {
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}