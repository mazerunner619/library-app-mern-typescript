import express from 'express';
import {handleLogin, handleRegister} from '../controllers/AuthController'
import {Schemas, ValidateSchema} from '../middlewares/Validation'

const router = express.Router();

router.post("/register", ValidateSchema(Schemas.user.create, 'body'), handleRegister);
router.post("/login", ValidateSchema(Schemas.user.login, 'body'), handleLogin);

export default router;