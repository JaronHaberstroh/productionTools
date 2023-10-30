import mongoose, { Schema } from "mongoose";

const productionLineSchema = new Schema({
  department: [
    {
      departmentName: String,
      line: [
        {
          lineName: String,
          position: [
            {
              positionName: String,
            },
          ],
        },
      ],
    },
  ],
});

const ProductionLine = mongoose.model("ProductionLine", productionLineSchema);
export default ProductionLine;
