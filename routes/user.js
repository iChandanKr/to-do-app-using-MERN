import express from "express";
// const myController = require('../controllers/userController');
import {
    getAllUsers,
    createNewUser, searchUserById, updateUser, deleteUser
} from "../controllers/userController.js"

const router = express.Router();

router.get('/all', getAllUsers);


router.post('/new', createNewUser);

router.route('/userid/:id')
    .get(searchUserById)
    .put(updateUser)
    .delete(deleteUser)

// router.get('/userid/:id', searchUserById);

// router.put('/userid/:id', updateUser);

// router.delete('/userid/:id', deleteUser);


export default router;  