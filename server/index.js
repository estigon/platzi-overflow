import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug("platzi-overflow:root");

//without async await
mongoose.connect( mongoUrl, { useNewUrlParser: true }).then(
    () => { console.log("Conectado correctamente a la base de datos de mongodb"); }
).catch(
    err => { console.log(`la conexion tiene el siguiente error: ${err}`); }
);
app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`);
});

// async function start() {
//    await mongoose.connect( mongoUrl, { useCreateIndex:true });
//    app.listen(PORT, () => {
//     debug(`Server running at port ${PORT}`);
// });
// }

// start();
