import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../api";
import type { Employee } from "../api";

export default function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Error loading employees:", err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateEmployee(editId, { name, email });
        setEditId(null);
      } else {
        await createEmployee({ name, email });
      }

      setName("");
      setEmail("");
      loadEmployees();
    } catch (err) {
      console.error("Error saving employee:", err);
    }
  };

  const handleEdit = (emp: Employee) => {
    setName(emp.name);
    setEmail(emp.email);
    setEditId(emp.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      loadEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          Employee Management
        </h1>

        {/* FORM */}
        <div className="flex gap-2 mb-6">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 flex-1 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* LIST */}
        <div className="space-y-3">
          {employees.length === 0 ? (
            <p className="text-gray-500">No employees found</p>
          ) : (
            employees.map((emp) => (
              <div
                key={emp.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <div>
                  <p className="font-semibold">{emp.name}</p>
                  <p className="text-gray-500">{emp.email}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}