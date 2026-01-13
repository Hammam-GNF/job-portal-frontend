import { api } from "./axios";

export const registerApplicant = (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    return api.post("/auth/register", payload);
}

export const registerEmployer = (payload: {
    name: string;
    email: string;
    password: string;
}) => {
    return api.post("/auth/register/employer", payload);
}

