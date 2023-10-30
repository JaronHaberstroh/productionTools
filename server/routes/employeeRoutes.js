import express from "express";
import * as employeeController from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", employeeController.getAll);
router.post("/create", employeeController.addEmployee);

export default router;
