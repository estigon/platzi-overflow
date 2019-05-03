import express from 'express';
import debug from 'debug';
import { find } from 'tslint/lib/utils';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { findUserByEmail, ComparePasswords } from '../middleware';
import { User } from '../models';
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const app = express.Router();


app.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user 2", user);
    if(!user){
        debug(`User with email ${email} not found`);
        return handleLoginFailed(res);
    }
    if(!ComparePasswords(password, user.password)){
        debug(`User password not match`);
        return handleLoginFailed(res);
    }

    const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
    res.status(200).json({
        message: "Login success",
        token,
        userId: user._id,
        userName: user.firstName,
        email: user.email
    });
});

app.post('/signup', async (req, res, next) => {
    if(req.body){
        let userToDb;
        const user = new User ({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            firstName: req.body.firstname,
            lastName: req.body.lastname
        });
        try {
            const userByEmail = await findUserByEmail(user.email);
            console.log(userByEmail);

            if(!userByEmail){
                userToDb = await user.save();
                const token = jwt.sign({ userToDb }, secret, { expiresIn: 86400 });
                res.status(201).json({
                    message: "Login success",
                    token,
                    userId: userToDb._id,
                    userName: user.firstName,
                    email: user.email
                });
            }else{
                res.status(400).json({
                    message: "An error ocurred",
                    error: "Email must be unique"
                });
            }
        } catch (error) {
            res.status(400).json({
                message: "An error ocurred",
                error: "Email must be unique"
            });
        }
    }else{
        return handleLoginFailed(res);
    }
});

function handleLoginFailed(res){
    return res.status(401).json({
        message: "login failed",
        error: "Email and password not match"
    });
}

export default app;