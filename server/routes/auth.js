import express from 'express';
import Debug from 'debug';
import { find } from 'tslint/lib/utils';
import jwt from 'jsonwebtoken';
const app = express.Router();
const debug = new Debug('platzi-overflow:auth');

const users = [
    {
        firstName: 'Elys',
        lastName:'Gonzalez',
        email: 'elysestiben@gmail.com',
        password: '1234567',
        _id: 12345
    }
];

const secret = "miclavesecreta";

function findUserByEmail(e){
    const user = users.find(user => { 
        return user.email === e;
    });
    console.log("user 1", user);
    return user;
}

function ComparePasswords(providedPassword, userPassword){
    return providedPassword === userPassword;
}

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

function handleLoginFailed(res){
    return res.status(401).json({
        message: "login failed",
        Error: "Email and password not match"
    });
}

export default app;