import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth.store";

export default function LoginPage() {
    const login = useAuth((state) => state.login);
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);

        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !user) return;
        
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "employer") navigate("/employer");
        else if (user.role === "applicant") navigate("/applicant");
    }, [isAuthenticated, user, navigate]);

    return (
        <div>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <a href="/register">Register</a>
            </p>
        </div>
    );
}