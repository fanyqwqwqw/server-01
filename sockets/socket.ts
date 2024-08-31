import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const desconectar = ( cliente: Socket ) => { //
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const mensaje = ( cliente: Socket, io: socketIO.Server ) => {//
    cliente.on('mensaje', (  payload: { de: string, cuerpo: string }  ) => { //
        //
        console.log('Mensaje recibido', payload );
        
        io.emit('mensaje-nuevo', payload );
    });
}



// Escuchar eliminación lógica
export const eliminarRegistro = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('eliminar-registro', (id: number) => {
        console.log('Registro eliminado con ID:', id);
        io.emit('registroEliminado', id); // Emitir el evento a todos los clientes conectados
    });
};

export const notificarMensaje = (cliente: Socket, io:socketIO.Server) => {
    cliente.on('notificacion', (payload: any) => {
        console.log('Notificación recibida:', payload);
        io.emit('notificacion-angular', payload); // Emitir a Angular
    });
        
}

