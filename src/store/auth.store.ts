import { create } from "zustand";
import { api } from "../api/axios";

type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employer" | "applicant";
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
};

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  //LOGIN METHOD
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });

    const { token, user } = response.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ token, user, isAuthenticated: true });
  },

  //LOGOUT METHOD
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });

    window.location.href = "/login";
  },

  //HYDRATE METHOD
  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({ token, user: JSON.parse(user), isAuthenticated: true });
    }
  },
}));
