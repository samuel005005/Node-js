
const { comprobarJWT } = require('../helpers');
const ChatMensajes = require('../models/chatMensajes');

const chatMensajes = new ChatMensajes();

const socketController =  async ( socket , io ) => {

    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if (!usuario){
        return socket.disconnect();
    }

    chatMensajes.conectarUsuario (usuario);
    io.emit('usuariosActivos', chatMensajes.usuariosArr );
    
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuariosActivos', chatMensajes.usuariosArr );
    });

    socket.on('enviar-mensaje', ( { uid , mensaje } ) => {
        chatMensajes.enviar(usuario.id, usuario.nombre, mensaje);
        io.emit('recibir-mensajes', chatMensajes.ultimos10)
    });
}



module.exports = {
    socketController
}