import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) => { //
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {//
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => { //
        //
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
}

// Escuchar eliminación lógica
export const eliminarRegistro = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('eliminar-registro', (id: number) => {
        console.log('Registro eliminado con ID:', id);
        io.emit('registroEliminado', id); // Emitir el evento a todos los clientes conectados
    });
};

//Escuchar restauración lógica
export const restaurarRegistro = (cliente: any, io: socketIO.Server) => {
    cliente.on("restaurar-registro", (jsonObj: any) => {
        console.log("Registro restaurado con ID:", jsonObj);
        io.emit("restaurarRegistro", jsonObj); // Emitir el evento a todos los clientes conectados
    });
};


//Escuchar Pedido finalizado
export const finalizarPedido = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('pedido-finalizado', (payload: any) => {
        console.log('Notificación recibida:', payload);
        io.emit('recibir-pedido', payload); // Emitir a Angular
    });
};

// Emitir un evento único desde el back-end
export const emitirPedidoFinalizado = (cliente: Socket,io: socketIO.Server) => {
    cliente.on('pedido-finalizado-back', (payload: any) => {
    console.log('Emitiendo evento "pedido-finalizado-back" a todos los clientes:', payload);

    io.emit('pedido-finalizado-back', payload); // Evento único para evitar conflicto
    // Emitir a Angular
    });

};


export const notificarMensaje = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('notificacion', (payload: any) => {
        console.log('Notificación recibida:', payload);
        io.emit('notificacion-angular', payload); // Emitir a Angular
    });
};


