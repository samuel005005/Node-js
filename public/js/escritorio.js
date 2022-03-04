

console.log('Escritorio HTML');


// Referencias del HTML
const lblEscritorio  = document.querySelector('h1');
const buttonAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('desktop') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desktop = searchParams.get('desktop');
lblEscritorio.innerText = desktop;  
lblAlert.style.display = 'none';

const socket = io();

socket.on( 'connect', () => {
    buttonAtender.disabled = false;
});

socket.on( 'disconnect', () => {
    buttonAtender.disabled = true;
});

socket.on( 'last-ticket' , ( payload ) => {
    // lblNuevoTicket.innerText =  `Ticket ${paylaod}`
}); 

socket.on( 'pedding-ticket' , ( pendientes ) => {

    if(pendientes == 0){
        lblAlert.style.display = 'block';
    }else{
        lblAlert.style.display = 'none';
    }
    lblPendientes.innerHTML = pendientes;
});

buttonAtender.addEventListener( 'click', () => {
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });
    socket.emit( 'attend-ticket', { desktop }, ( { ok, ticket, msg } ) => {
        if( !ok ){
            lblTicket.innerHTML = `Nadie`
            return lblAlert.style.display = 'block';
        } 
        lblTicket.innerHTML = `Ticket ${ticket.number}`
    });
});