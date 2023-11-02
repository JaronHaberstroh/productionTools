import mongoose, { Schema } from "mongoose";

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const productionLineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ["Hot End", "Cold End", "Lamination", "inGeneralFactory"],
    required: true,
  },
  positions: [positionSchema],
});

const ProductionLine = mongoose.model("ProductionLine", productionLineSchema);
export default ProductionLine;
