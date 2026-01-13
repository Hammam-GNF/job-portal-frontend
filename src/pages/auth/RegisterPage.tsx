import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApplicant, registerEmployer } from "../../api/auth.api";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [role, setRole] = useState<"applicant" | "employer">("applicant");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (role === "applicant") {
                await registerApplicant({ name, email, password });
            } else {
                await registerEmployer({ name, email, password });
            }

            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Register</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <select value={role} onChange={(e) => setRole(e.target.value as any)}>
                    <option value="applicant">Applicant</option>
                    <option value="employer">Employer</option>
                </select>

                <input 
                    type="text"
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required
                />

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
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    )
}