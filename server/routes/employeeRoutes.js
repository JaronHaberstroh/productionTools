import express from "express";
import * as userController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/find", userController.getEmployeesList);
router.post("/create", userController.addEmployee);
router.put("/edit", userController.editEmployee);
router.delete("/delete", userController.deleteEmployee);

export default router;
