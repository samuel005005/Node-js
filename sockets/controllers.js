const TicketControl = require("../models/ticket-control");

const ticketControl =  new TicketControl();

const socketController =  ( socket ) => {

    socket.emit( 'last-ticket', ticketControl.last );
    
    socket.on( 'next-ticket', (payload , callback ) => { 
        const next  = ticketControl.next();
        callback( next );
        // socket.broadcast.emit('next-ticket', payload);
    });

    socket.on( 'attend-ticket', ( { desktop }, callback) => {
        
        if( !desktop ){
            return callback ({
                ok:false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attend(desktop);
        if( !ticket ){
            return callback ({
                ok:false,
                msg: 'No hay tickets pendientes'
            })
        }

        return callback ({
            ok:true,
            ticket
        })

    }); 
}

module.exports = {
    socketController
}