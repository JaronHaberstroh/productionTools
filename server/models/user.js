import mongoose, { Schema } from "mongoose";

const userRoleSchema = new Schema({
  isSupervisor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  canLogin: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  employeeNumber: {
    type: Number,
    required: true,
  },
  startDate: Date,
  shift: {
    type: String,
  },
  currentPosition: {
    type: String,
    default: "Laborer",
  },
  userRole: {
    type: userRoleSchema,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
