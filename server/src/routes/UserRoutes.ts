import express from "express";
import {getUserById, getAllUsers, deleteUser, updateUser} from "../controllers/UserController";
import { Schemas, ValidateSchema } from "../middlewares/Validation";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:userId", ValidateSchema(Schemas.user.userId, 'params'), getUserById);
router.delete('/:userId', ValidateSchema(Schemas.user.userId, 'params'), deleteUser);
router.put('/', ValidateSchema(Schemas.user.update, 'body'), updateUser);

export default router;
