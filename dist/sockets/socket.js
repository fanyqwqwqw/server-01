"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.restaurarRegistro = exports.notificarMensaje = exports.emitirPedidoFinalizado = exports.finalizarPedido = exports.eliminarRegistro = exports.mensaje = exports.desconectar = void 0;
=======
exports.notificarMensaje = exports.emitirPedidoFinalizado = exports.finalizarPedido = exports.restaurarRegistro = exports.eliminarRegistro = exports.mensaje = exports.desconectar = void 0;
>>>>>>> 17629c37a22a2856dacb72c35f8e9218e3252dc6
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
<<<<<<< HEAD
=======
//Escuchar restauración lógica
const restaurarRegistro = (cliente, io) => {
    cliente.on("restaurar-registro", (jsonObj) => {
        console.log("Registro restaurado con ID:", jsonObj);
        io.emit("restaurarRegistro", jsonObj); // Emitir el evento a todos los clientes conectados
    });
};
exports.restaurarRegistro = restaurarRegistro;
>>>>>>> 17629c37a22a2856dacb72c35f8e9218e3252dc6
//Escuchar Pedido finalizado
const finalizarPedido = (cliente, io) => {
    cliente.on('pedido-finalizado', (payload) => {
        console.log('Notificación recibida:', payload);
        io.emit('recibir-pedido', payload); // Emitir a Angular
    });
};
exports.finalizarPedido = finalizarPedido;
// Emitir un evento único desde el back-end
const emitirPedidoFinalizado = (cliente, io) => {
    cliente.on('pedido-finalizado-back', (payload) => {
        console.log('Emitiendo evento "pedido-finalizado-back" a todos los clientes:', payload);
        io.emit('pedido-finalizado-back', payload); // Evento único para evitar conflicto
        // Emitir a Angular
    });
};
exports.emitirPedidoFinalizado = emitirPedidoFinalizado;
<<<<<<< HEAD
=======


>>>>>>> 17629c37a22a2856dacb72c35f8e9218e3252dc6
const notificarMensaje = (cliente, io) => {
    cliente.on('notificacion', (payload) => {
        console.log('Notificación recibida:', payload);
        io.emit('notificacion-angular', payload); // Emitir a Angular
    });
};
exports.notificarMensaje = notificarMensaje;
//Escuchar restauración lógica
const restaurarRegistro = (cliente, io) => {
    cliente.on("restaurar-registro", (jsonObj) => {
        console.log("Registro restaurado con ID:", jsonObj);
        io.emit("restaurarRegistro", jsonObj); // Emitir el evento a todos los clientes conectados
    });
};
exports.restaurarRegistro = restaurarRegistro;
