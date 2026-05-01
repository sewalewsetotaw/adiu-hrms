const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// HEALTH CHECK
const healthCheck = (req, res) => {
  res.json({ status: "OK" });
};

// GET ALL
const getEmployees = async (req, res) => {
  const data = await prisma.employee.findMany();
  res.json(data);
};

// GET BY ID
const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  const employee = await prisma.employee.findUnique({
    where: { id: Number(id) },
  });

  res.json(employee);
};

// CREATE
const createEmployee = async (req, res) => {
  const { name, email } = req.body;

  const employee = await prisma.employee.create({
    data: { name, email },
  });

  res.json(employee);
};

// UPDATE
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const employee = await prisma.employee.update({
    where: { id: Number(id) },
    data: { name, email },
  });

  res.json(employee);
};

// DELETE
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  await prisma.employee.delete({
    where: { id: Number(id) },
  });

  res.json({ message: "Deleted" });
};

module.exports = {
  healthCheck,
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};