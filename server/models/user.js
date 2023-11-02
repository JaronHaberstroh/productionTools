import mongoose, { Schema } from "mongoose";

const userRoleSchema = new Schema({
  isSuper: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: false,
  },
  shift: {
    type: String,
    required: true,
  },
  currentPosition: {
    type: String,
    default: "Laborer",
    required: false,
  },
  department: {
    type: String,
    enum: ["Hot End", "Cold End", "Lamination", "inGeneralFactory"],
    default: "inGeneralFactory",
  },
  userRole: {
    type: [userRoleSchema],
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

export const userDataFields = Object.keys(User.schema.paths);

export default User;
