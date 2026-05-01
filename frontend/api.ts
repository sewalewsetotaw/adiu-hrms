import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("VITE_API_URL is missing");
}

export const api = axios.create({
  baseURL: BASE_URL,
});