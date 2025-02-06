"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurarRegistro = exports.notificarMensaje = exports.emitirPedidoFinalizado = exports.detallesPedidosEnviados = exports.finalizarPedido = exports.eliminarRegistro = exports.desconectar = exports.mensaje = exports.mensajeFlask = void 0;
const axios_1 = __importDefault(require("axios"));
const mensajeFlask = (cliente, io) => {
    cliente.on('mensaje-para-flask', (payload) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Mensaje recibido de Angular:', payload);
        // Enviar a Flask
        //const flaskUrl = 'http://localhost:5001/chatbot'; // Cambiar por la URL de Flask
        const flaskUrl = 'https://ia-x07k.onrender.com/chatbot'; // Cambiar por la URL de Flask
        try {
            const response = yield axios_1.default.post(flaskUrl, payload);
            //const flaskResponse = response.data.payload['message'];
            const flaskResponse = response.data.response;
            //console.log('response:', flaskResponse);
            console.log('Mensaje recibido de Flask:', flaskResponse);
            // Enviar respuesta a Angular
            io.emit('mensaje-desde-flask', { de: 'Flask', cuerpo: flaskResponse });
        }
        catch (error) {
            console.error('Error al comunicar con Flask:', error);
        }
    }));
};
exports.mensajeFlask = mensajeFlask;
// Escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        //
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
exports.desconectar = desconectar;
// Escuchar eliminación lógica
const eliminarRegistro = (cliente, io) => {
    cliente.on('eliminar-registro', (id) => {
        console.log('Registro eliminado con ID:', id);
        io.emit('registroEliminado', id); // Emitir el evento a todos los clientes conectados
    });
};
exports.eliminarRegistro = eliminarRegistro;
//Escuchar Pedido finalizado
const finalizarPedido = (cliente, io) => {
    cliente.on('pedido-finalizado', (payload) => {
        console.log('Notificación recibida:', payload);
        io.emit('recibir-pedido', payload); // Emitir a Angular
    });
};
exports.finalizarPedido = finalizarPedido;
//Escuchar Detalles Pedidos Enviados
const detallesPedidosEnviados = (cliente, io) => {
    cliente.on('detalles-pedidos-enviado', (payload) => {
        console.log('Recibiendo:', payload);
        io.emit('detalles-pedidos-recibidos', payload); // Emitir a Angular
    });
};
exports.detallesPedidosEnviados = detallesPedidosEnviados;
// Emitir un evento único desde el back-end
const emitirPedidoFinalizado = (cliente, io) => {
    cliente.on('pedido-finalizado-back', (payload) => {
        console.log('Emitiendo evento "pedido-finalizado-back" a todos los clientes:', payload);
        io.emit('pedido-finalizado-back', payload); // Evento único para evitar conflicto
        // Emitir a Angular
    });
};
exports.emitirPedidoFinalizado = emitirPedidoFinalizado;
const notificarMensaje = (cliente, io) => {
    cliente.on('notificacion', (payload) => {
        console.log('Notificación recibida:', payload);
        io.emit('notificacion-angular', payload); // Emitir a Angular
    });
};
exports.notificarMensaje = notificarMensaje;
//Escuchar restauración lógica creo no da
const restaurarRegistro = (cliente, io) => {
    cliente.on("restaurar-registro", (jsonObj) => {
        console.log("Registro restaurado con ID:", jsonObj);
        io.emit("restaurarRegistro", jsonObj); // Emitir el evento a todos los clientes conectados
    });
};
exports.restaurarRegistro = restaurarRegistro;
