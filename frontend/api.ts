import axios from "axios";

// Always use env variable (safe for Vercel + local)
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
});

// ======================
// TYPES
// ======================

export type Employee = {
  id: number;
  name: string;
  email: string;
};

export type EmployeeInput = {
  name: string;
  email: string;
};

// ======================
// API FUNCTIONS
// ======================

export const getEmployees = () =>
  api.get<Employee[]>("/employees");

export const createEmployee = (data: EmployeeInput) =>
  api.post<Employee>("/employees", data);

export const updateEmployee = (id: number, data: EmployeeInput) =>
  api.put<Employee>(`/employees/${id}`, data);

export const deleteEmployee = (id: number) =>
  api.delete(`/employees/${id}`);