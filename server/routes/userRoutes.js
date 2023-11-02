import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/find", userController.getUsersList);
router.post("/create", userController.addUser);
router.put("/edit", userController.editUser);
router.delete("/delete", userController.deleteUser);

export default router;
