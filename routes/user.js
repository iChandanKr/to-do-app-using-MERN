import express from "express";
// const myController = require('../controllers/userController');
import {
    getAllUsers,
    register, login, getMyProfile, logout
} from "../controllers/userController.js"
import { isAutheticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/all', getAllUsers);


router.post('/new', register);
router.post('/login', login)
router.get('/logout',logout )
router.get('/me',isAutheticated,getMyProfile);  





export default router;  