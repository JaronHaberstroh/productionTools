import Employee from "../models/employee.js";

export const getAll = (req, res) => {
  res.json({ message: "hello, world" });
};

export const addEmployee = async (req, res) => {
  try {
    const employee = new Employee({
      firstName: req.body.fName,
      lastName: req.body.lName,
      employeeNumber: req.body.employeeNumber,
      startDate: req.body.startDate,
      shift: req.body.shift,
      currentPosition: req.body.currentPosition,
    });

    console.log(employee);
    await employee.save();

    res.status(200).json({ message: "New Employee added to DB" });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
