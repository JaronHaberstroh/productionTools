import Employee from "../models/employee.js";

export const getEmployeesList = async (req, res) => {
  try {
    const employeeInfo = {
      firstName: req.body.fName,
      lastName: req.body.lName,
      employeeNumber: req.body.employeeNumber,
      startDate: req.body.startDate,
      shift: req.body.shift,
      currentPosition: req.body.currentPosition,
    };

    const employeesList = await Employee.find(employeeInfo);

    res
      .status(200)
      .json({ message: "All Employees fitting search.", employeesList });
  } catch (err) {
    res.status(500).json({ message: "Failed to locate Employee.", error: err });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const employeeInfo = {
      firstName: req.body.fName,
      lastName: req.body.lName,
      employeeNumber: req.body.employeeNumber,
      startDate: req.body.startDate,
      shift: req.body.shift,
      currentPosition: req.body.currentPosition,
    };

    const employee = new Employee(employeeInfo);

    await employee.save();

    res.status(201).json({ message: "New Employee added to DB.", employee });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add new Employee to DB.", error: err });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;

    await Employee.deleteOne({ _id: employeeId });

    res.status(204);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete Employee from DB.", error: err });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const employee = {
      firstName: req.body.fName,
      lastName: req.body.lName,
      employeeNumber: req.body.employeeNumber,
      startDate: req.body.startDate,
      shift: req.body.shift,
      currentPosition: req.body.currentPosition,
    };
    await Employee.findOneAndUpdate(query, employee);
    res.status(200).json({ message: "Employee data updated." });
  } catch (err) {
    res.status(500).json({ message: "Failed to alter Employee.", error: err });
  }
};
