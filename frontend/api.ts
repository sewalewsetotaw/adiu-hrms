import axios from "axios";

// Axios instance
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "";

export const api = axios.create({
  baseURL: BASE_URL,
});

// ======================
// TYPES
// ======================

// Response from DB
export type Employee = {
  id: number;
  name: string;
  email: string;
};

// Request payload (no id)
export type EmployeeInput = {
  name: string;
  email: string;
};

// ======================
// API FUNCTIONS
// ======================

// GET all employees
export const getEmployees = () =>
  api.get<Employee[]>("/employees");

// CREATE employee
export const createEmployee = (data: EmployeeInput) =>
  api.post<Employee>("/employees", data);

// UPDATE employee
export const updateEmployee = (id: number, data: EmployeeInput) =>
  api.put<Employee>(`/employees/${id}`, data);

// DELETE employee
export const deleteEmployee = (id: number) =>
  api.delete(`/employees/${id}`);