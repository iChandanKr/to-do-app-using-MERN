import { User } from "../model/usermodel.js";

export const getAllUsers = async (req, res) => {
    console.log(req.query);
    const user = await User.find()
    res.json({
        success: true,
        users: user,
    })
};

export const createNewUser =  async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name: name,
        email,
        password,
    })
    res.status(201).cookie("ipl", "mumbaiIndians").json({
        success: true,
        users: user,
    })
};

export const searchUserById = async (req, res) => {
    const { id } = req.params;
    // const {id} = req.query;
    // console.log(id);
    const user = await (User.findById(id));
    res.json({
        success: true,
        user,
    })
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await (User.findById(id));
    res.json({
        success: true,
        message:'updated'
    })
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await (User.findById(id));
    await user.deleteOne()
    res.json({
        success: true,
        message:'deleted'
    })
};




