const User = require("../model/userModel");
const { usertSignUp, userLogin } = require("../validation/joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.userSignup = async (req, res) => {
    try {
        const { email, password, mobileNumber, name, age, gender, country, state } = req.body;
        const { error } = usertSignUp.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        } else {
            const exist = await User.findOne({ email: req.body.email });
            if (exist) {
                return res.status(400).json({
                    status: 0,
                    message: "This email is already taken!"
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newuser = await User.create({
                email,
                password: hashedPassword,
                mobileNumber,
                name,
                age,
                gender,
                country,
                state
            });
            return res.status(200).json({
                status: 1,
                message: "User is Signup sucessfully",
                result: {
                    _id: newuser._id,
                    name: newuser.name,
                    email: newuser.email,
                    mobileNumber: newuser.mobileNumber,
                    age: newuser.age,
                    gender: newuser.gender,
                    country: newuser.country,
                    state: newuser.state,
                },
            });
        }
    } catch (err) {
        console.log("Error in userSignup:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = userLogin.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 0,
                message: error.details[0].message
            });
        } else {
            let userResult = await User.findOne({ email });
            if (!userResult) {
                return res.status(404).json({
                    status: 0,
                    message: "Email Not found",
                });
            }
            let passCheck = bcrypt.compareSync(
                password,
                userResult.password
            );
            if (passCheck == false) {
                return res.status(401).json({
                    status: 0,
                    message: "Incorrect password.",
                });
            } else {
                let dataToken = {
                    _id: userResult._id,
                    isUser: userResult.isUser,
                };
                let token = jwt.sign(dataToken, process.env.JWT_SECRET,
                    {
                        expiresIn: "30d",
                    }
                );
                return res.status(200).json({
                    status: 1,
                    message: "User Login Successfully.....",
                    result: {
                        _id: userResult._id,
                        email: userResult.email,
                        name: userResult.name,
                        token,
                    },
                });
            }
        }
    } catch (error) {
        console.log("login Api error=============>", error);
        return res.status(500).json({
            status: 0,
            message: error.toString(),
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                status: 0,
                message: "User not found",
            });
        }
        return res.status(200).json({
            status: 1,
            message: "User fetched successfully",
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                age: user.age,
                gender: user.gender,
                country: user.country,
                state: user.state,
            },
        });
    } catch (err) {
        console.log("Error in getUser:", err);
        return res.status(500).json({
            status: 0,
            message: err.toString(),
        });
    }
};

