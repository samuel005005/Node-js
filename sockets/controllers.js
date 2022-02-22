
const socketController =  ( socket ) => {
    console.log('conectado');

    socket.on('disconnect', () => { 
        console.log('disconnect') 
    });

    socket.on('enviar-mensaje', (payload , callback ) => { 
        const id = 123456;

        callback( id );
        
        socket.broadcast.emit('enviar-mensaje', payload);

    });
}

module.exports = {
    socketController
}