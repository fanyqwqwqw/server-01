import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { Server as SocketIOServer } from 'socket.io'; // Cambiado aquí
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _intance: Server; //:instance es del tipo de la clase Server

    public app: express.Application;
    public port: number;

    public io: SocketIOServer;

    private httpServer: http.Server;
    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        //
        this.httpServer = new http.Server(this.app); //
        this.io = new SocketIOServer(this.httpServer, { //
            cors: {
                origin: "*", // 
                methods: ["GET", "POST"]
            }
        });
        this.escucharSockets();
    }

    public static get instance() {
        //
        return this._intance || (this._intance = new Server());//si ya existe una instancia de la misma // el this es como si fuere Server, si es la primera vez, que cree una instancia
    }
    private escucharSockets() { //

        console.log('Escuchando conexiones - sockets');
        //
        this.io.on('connection', cliente => { //
            console.log('Cliente conectado');
            // Mensajes
            socket.mensaje(cliente, this.io);

            socket.mensajeFlask(cliente, this.io);

            // Desconectar
            socket.desconectar(cliente);

            // Notificación desde Flutter
            socket.notificarMensaje(cliente, this.io);

            // Eiminación lógica
            socket.eliminarRegistro(cliente, this.io);

            // Restauración lógica
            socket.restaurarRegistro(cliente, this.io);

            // Pedido Finalizado
            socket.finalizarPedido(cliente, this.io);


             // Emitir un evento único desde el back-end
             socket.emitirPedidoFinalizado(cliente, this.io);

            //flutter:  socket.emit('notificacion', {'mensaje': 'Nuevo Mensaje'});
            //flutter:  socket.emit('notificacion', {'mensaje': 'Nuevo Mensaje'});
        });

    }


    start(callback: Function) {
        console.log("Test1");
        this.httpServer.listen(this.port, callback); //inicializamos con httpServer
        console.log("Test2");
    }

}
