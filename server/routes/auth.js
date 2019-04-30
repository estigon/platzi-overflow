import express from 'express';
import debug from 'debug';
import { find } from 'tslint/lib/utils';
import jwt from 'jsonwebtoken';
import { secret } from '../config';
import { users, findUserByEmail, ComparePasswords } from '../middleware';
const app = express.Router();


app.post('/signin', (req, res, next) => {
    const { email, password } = req.body;
    const user = findUserByEmail(email);
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

app.post('/signup', (req, res, next) => {
    if(req.body){
        const data = req.body;
        if(!findUserByEmail(data.email)){
            const user = {
                email: data.email,
                password: data.password,
                firstName: data.firstname,
                lastName: data.lastname,
                _id: Date.now()
            }
            users.push(user);
            const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
            res.status(201).json({
                message: "Login success",
                token,
                userId: user._id,
                userName: user.firstName,
                email: user.email
            });
        }else{
            return handleLoginFailed(res);
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