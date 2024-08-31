"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificarMensaje = exports.eliminarRegistro = exports.mensaje = exports.desconectar = void 0;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
exports.desconectar = desconectar;
// Escuchar mensajes
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        //
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// Escuchar eliminación lógica
const eliminarRegistro = (cliente, io) => {
    cliente.on('eliminar-registro', (id) => {
        console.log('Registro eliminado con ID:', id);
        io.emit('registroEliminado', id); // Emitir el evento a todos los clientes conectados
    });
};
exports.eliminarRegistro = eliminarRegistro;
const notificarMensaje = (cliente, io) => {
    cliente.on('notificacion', (payload) => {
        console.log('Notificación recibida:', payload);
        io.emit('notificacion-angular', payload); // Emitir a Angular
    });
};
exports.notificarMensaje = notificarMensaje;
