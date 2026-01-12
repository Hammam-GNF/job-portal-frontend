import { api } from "./axios";

const testAuth = async () => {
  try {
    const loginRes = await api.post("/auth/login", {
      email: "admin@gmail.com",
      password: "123456789",
    });

    const token = loginRes.data.data.token;
    localStorage.setItem("token", token);

    console.log("LOGIN OK", loginRes.data);

    const meRes = await api.get("/auth/me");
    console.log("ME OK", meRes.data);
  } catch (err: any) {
    console.log(err.response?.status, err.response?.data);
  }
};

testAuth();
