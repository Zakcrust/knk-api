const mongoose = require('mongoose');
const userSchema = require("../schemas/user");
const user = mongoose.model("User", userSchema);
const db = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('dotenv').config();

exports.get = async (req, res) => {
    try {
        const data = await user.find({});
        return res.status(200).send({
            message: "User data has been retrieved",
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
}

exports.create = async (req, res) => {
    try {
        if(req.body.password == undefined || req.body.password.length < 8)
        {
            return res.status(400).send({
                message: "Invalid password, password must be longer than 8 characters"
            })
        }
        req.body.password = bcrypt.hashSync(req.body.password,saltRounds);
        const data = await user.create(req.body);
        if (data) {
            return res.status(200).send({
                message: "User data has been created",
                data: data
            })
        }
        else {
            return res.status(400).send({
                message: "failed to create user data",
            })
        }

    } catch (error) {
        if(error.code == 11000)
        {
            return res.status(500).send({
                message: `${req.body.username} already exists`
            })    
        }
        return res.status(500).send({
            message: error
        })
    }
}

exports.update = async (req, res) => {
    try {
        const data = await user.findByIdAndUpdate(req.params.id, req.body);
        if (data) {
            return res.status(200).send({
                message: "User data has been updated",
                data: data
            })
        }
        else {
            return res.status(400).send({
                message: "User data not found",
            })
        }

    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const data = await user.findByIdAndDelete(req.params.id, req.body);
        if (data) {
            return res.status(200).send({
                message: "User data has been deleted",
                data: data
            })
        }
        else {
            return res.status(400).send({
                message: "User data not found",
            })
        }

    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
}

exports.login = async (req, res) => {
    try {
        const data = await user.findOne({
            username: req.body.username
        }).select('+password');
        if(req.body.password == undefined || req.body.password.length < 8)
        {
            return res.status(400).send({
                message: "Invalid password, password must be longer than 8 characters"
            })
        }
        if(data)
        {
            console.log(data);
            var checkPassword = bcrypt.compareSync(req.body.password, data.password)
            if(checkPassword)
            {
                var token = await jwt.sign({
                    username: data.username,
                    password: data.password
                }, process.env.SECRET, {
                    expiresIn: "7d"
                });
                return res.status(200).send({
                    message: "Login success",
                    data: data,
                    token: token
                })
            }
            else {
                return res.status(400).send({
                    message: "Invalid username/password"
                })    
            }
        }
        else {
            return res.status(400).send({
                message: "Invalid username/password"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error
        })
    }
}