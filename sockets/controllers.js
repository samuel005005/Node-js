
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
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);

    //Conectarlo a una sola especial
    socket.join( usuario.id ); // global, socket.id, usuario.id (Salas vigentes)

    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuariosActivos', chatMensajes.usuariosArr );
    });

    socket.on('enviar-mensaje', ( { uid , mensaje } ) => {

        if( uid ){
            // Mensaje private 
            socket.to( uid ).emit( 'mensaje-privado', {de:usuario.nombre ,mensaje } );
            return ;
        }
        chatMensajes.enviar(usuario.id, usuario.nombre, mensaje);
        io.emit('recibir-mensajes', chatMensajes.ultimos10)
    });
}



module.exports = {
    socketController
}