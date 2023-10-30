import mongoose, { Schema } from "mongoose";

const srSupervisorSchema = new Schema({
  firstName: String,
  lastName: String,
  employeeNumber: Number,
  crew: String,
  startDate: Date,
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
});

const SrSupervisor = mongoose.model("SrSupervisor", srSupervisorSchema);
export default SrSupervisor;
