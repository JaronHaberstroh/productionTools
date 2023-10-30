import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  employeeNumber: Number,
  startDate: Date,
  shift: String,
  currentPosition: String,
  certifiedPositions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductionLines",
    },
  ],
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
