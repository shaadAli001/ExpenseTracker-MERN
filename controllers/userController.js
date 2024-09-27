const userModel = require("../models/userModel");

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("User Not Found!!");
        }
        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error
        })
    }
}

exports.registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        return res.status(201).json({
            success: true,
            newUser
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            error
        })
    }
}