import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import axios from 'axios';
import { log } from 'console';


export const mensajeFlask = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('mensaje-para-flask', async (payload: { de: string, cuerpo: string }) => {

      console.log('Mensaje recibido de Angular:', payload);
      
      // Enviar a Flask
      //const flaskUrl = 'http://localhost:5001/chatbot'; // Cambiar por la URL de Flask
      const flaskUrl = 'https://ia-x07k.onrender.com/chatbot'; // Cambiar por la URL de Flask

      


      try {
        const response = await axios.post(flaskUrl, payload);
        //const flaskResponse = response.data.payload['message'];
        const flaskResponse = response.data.response;
      //console.log('response:', flaskResponse);
      console.log('Mensaje recibido de Flask:', flaskResponse);
        // Enviar respuesta a Angular
        io.emit('mensaje-desde-flask', { de: 'Flask', cuerpo: flaskResponse });
      } catch (error) {
        console.error('Error al comunicar con Flask:', error);
      }
    });
  };
  
  

  // Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {//
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => { //
        //
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
}



export const desconectar = (cliente: Socket) => { //
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
}


// Escuchar eliminación lógica
export const eliminarRegistro = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('eliminar-registro', (id: number) => {
        console.log('Registro eliminado con ID:', id);
        io.emit('registroEliminado', id); // Emitir el evento a todos los clientes conectados
    });
};



//Escuchar Pedido finalizado
export const finalizarPedido = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('pedido-finalizado', (payload: any) => {
        console.log('Notificación recibida:', payload);
        io.emit('recibir-pedido', payload); // Emitir a Angular
    });
};



//Escuchar Detalles Pedidos Enviados
export const detallesPedidosEnviados = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('detalles-pedidos-enviado', (payload: any) => {
        console.log('Recibiendo:', payload);
        io.emit('detalles-pedidos-recibidos', payload); // Emitir a Angular
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



//Escuchar restauración lógica creo no da
export const restaurarRegistro = (cliente: any, io: socketIO.Server) => {
    cliente.on("restaurar-registro", (jsonObj: any) => {
        console.log("Registro restaurado con ID:", jsonObj);
        io.emit("restaurarRegistro", jsonObj); // Emitir el evento a todos los clientes conectados
    });
};
