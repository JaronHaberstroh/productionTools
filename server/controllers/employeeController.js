import User from "../models/user.js";
import { employeeDataMap } from "../utils/reqDataMap.js";

export const getEmployeesList = async (req, res) => {
  try {
    const userInfo = employeeDataMap(req.body);

    const userList = await User.find(userInfo);

    res
      .status(200)
      .json({
        message: "All Employees fitting search.",
        employeesList: userList,
      });
  } catch (err) {
    res.status(500).json({ message: "Failed to locate Employee.", error: err });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const userInfo = employeeDataMap(req.body);

    const user = new User(userInfo);

    await user.save();

    res.status(201).json({ message: "New Employee added to DB." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add new Employee to DB.", error: err });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.deleteOne({ _id: userId });

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

    const user = employeeDataMap(req.body);

    await User.findOneAndUpdate(query, user);

    res.status(200).json({ message: "Employee data updated." });
  } catch (err) {
    res.status(500).json({ message: "Failed to alter Employee.", error: err });
  }
};
