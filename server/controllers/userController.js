import User from "../models/user.js";
import { userDataMap } from "../utils/reqDataMap.js";

export const getUsersList = async (req, res) => {
  try {
    const userInfo = userDataMap(req.body);

    const userList = await User.find(userInfo);

    res.status(200).json({
      message: "All Users fitting search.",
      usersList: userList,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to locate Employee.", error: err });
  }
};

export const addUser = async (req, res) => {
  try {
    const userInfo = userDataMap(req.body);

    const user = new User(userInfo);

    await user.save();

    res.status(201).json({ message: "New User added to DB." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add new User to DB.", error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await User.deleteOne({ _id: userId });

    res.status(204);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete User from DB.", error: err });
  }
};

export const editUser = async (req, res) => {
  try {
    const query = { _id: req.params.id };

    const user = userDataMap(req.body);

    await User.findOneAndUpdate(query, user);

    res.status(200).json({ message: "User data updated." });
  } catch (err) {
    res.status(500).json({ message: "Failed to alter User.", error: err });
  }
};
