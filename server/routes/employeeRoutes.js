import express from "express";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/find", employeeController.getEmployeesList);
router.post("/create", employeeController.addEmployee);
router.put("/edit", employeeController.editEmployee);
router.delete("/delete", employeeController.deleteEmployee);

export default router;
