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
  hydrated: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  hydrated: false,

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
    localStorage.clear();

    set({ 
      user: null, 
      token: null, 
      isAuthenticated: false,
      hydrated: true
    });
  },

  //HYDRATE METHOD
  hydrate: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({ 
        token, 
        user: JSON.parse(user), 
        isAuthenticated: true, 
        hydrated: true 
      });
    } else {
      set({ hydrated: true });
    }
  },
}));
