import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = Server.instance;


// BodyParser //DEben ir antes de las rutas
server.app.use( bodyParser.urlencoded({ extended: true }) ); //Son middleware
server.app.use( bodyParser.json() ); //pasa la petición a un formato json 

// CORS
server.app.use( cors({ origin: true, credentials: true  }) );


// Rutas de servicios
server.app.use('/', router );




server.start( () => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
});


