const TicketControl = require("../models/ticket-control");

const ticketControl =  new TicketControl();

const socketController =  ( socket ) => {

    socket.emit( 'last-ticket', ticketControl.last );
    socket.emit ( 'current-ticket', ticketControl.lastFour );
    socket.emit('pedding-ticket', ticketControl.tickets.length);
    
    socket.on( 'next-ticket', (payload , callback ) => { 
        const next  = ticketControl.next();
        callback( next );
        socket.broadcast.emit('pedding-ticket', ticketControl.tickets.length);
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

        /**Notificar cambios en los ultimos cuatros**/

        socket.broadcast.emit ( 'current-ticket', ticketControl.lastFour );
        socket.emit('pedding-ticket', ticketControl.tickets.length);
        socket.broadcast.emit('pedding-ticket', ticketControl.tickets.length);
        return callback ({
            ok:true,
            ticket
        })

    }); 

}

module.exports = {
    socketController
}