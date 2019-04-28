var express = require('express');
import bodyParser from 'body-parser';
import { question } from './routes';
import { auth } from './routes';

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

if(process.env.NODE_ENV === 'development'){
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
        next();
    });
}

app.use('/api/questions', question);//de esta manera declaramos como ruta base esta ruta para nuestro endpoint
//usamos app.use en lugar de .post o .get, porque de esta manera le indicamos que pueden hacerse distintos tipos de peticiones

app.use('/api/auth', auth);

export default app;