import Debug from 'debug';
import { secret } from '../config';
const debug = new Debug('platzi-overflow:auth-middleware');
import jwt from 'jsonwebtoken';
import User from '../models/user';
var bcrypt = require('bcryptjs');

export const findUserByEmail = async (email) => {
    try {
        return await User.findOne({email});
    } catch (error) {
        console.log("no se encontro usuario existente con este email ", error);
    }
}

export function ComparePasswords(providedPassword, userPassword){
    return bcrypt.compareSync(providedPassword, userPassword);
}

export const required = (req, res, next) => {
    const myTokenHeader = req.headers['authorization'].replace("Bearer ", "");
    jwt.verify(myTokenHeader, secret, (err, token) => {
        if(err) {
            debug("JWT was not encrypted with our secret");
            return res.status(401).json({
                message:"Unauthorized",
                error: 'No hay token de autenticacion'
            });
        }else {
            debug(`the ${token} is valid`);
            req.user = token.user;
            next();
        }
    });
}