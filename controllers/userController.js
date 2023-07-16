import { User } from "../model/usermodel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken";
import errorHandler from "../middlewares/errorMiddleware.js";

export const getAllUsers = async (req, res) => {
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return next(new errorHandler("Inavlid email or password!", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new errorHandler("Invalid email or password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}!`, 200);



    } catch (error) {
        next(error);
    }

};


export const register = async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });

        if (user)
            return next(new errorHandler("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });
        sendCookie(user, res, "Registered Successfully!", 201)
    } catch (error) {
        next(error);
    }
};

export const getMyProfile = (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};
export const logout = (req, res) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        success: true,
        message: "you are logged out!",


    })
};






