import mongoose, { Schema } from "mongoose";

const productionLineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ["Hot End", "Cold End", "Lamination"],
    required: true,
  },
});

const ProductionLine = mongoose.model("ProductionLine", productionLineSchema);
export default ProductionLine;
