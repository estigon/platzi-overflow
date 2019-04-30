import Debug from 'debug';
import { secret } from '../config';
const debug = new Debug('platzi-overflow:auth-middleware');
import jwt from 'jsonwebtoken';

export const users = [
    {
        firstName: 'Elys',
        lastName:'Gonzalez',
        email: 'elysestiben@gmail.com',
        password: '1234567',
        _id: 12345
    }
];

export function findUserByEmail(e){
    const user = users.find(user => { 
        return user.email === e;
    });
    console.log("user 1", user);
    return user;
}

export function ComparePasswords(providedPassword, userPassword){
    return providedPassword === userPassword;
}

export const required = (req, res, next) => {console.log('headers', req.headers);
    const myTokenHeader = req.headers['authorization'].replace("Bearer ", "");console.log("myTokenHeader", myTokenHeader);
    jwt.verify(myTokenHeader, secret, (err, token) => {
        if(err) {
            debug("JWT was not encrypted with our secret");
            return res.status(401).json({
                message:"Unauthorized",
                error: err
            });
        }else {
            debug(`the ${token} is valid`);
            req.user = token.user;
            next();
        }
    });
}