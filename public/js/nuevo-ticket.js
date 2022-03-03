

console.log('Nuevo Ticket HTML');


// Referencias del HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const buttonCreate = document.querySelector('button');

const socket = io();

socket.on( 'connect', () => {
    buttonCreate.disabled = false;
});

socket.on( 'disconnect', () => {
    buttonCreate.disabled = true;
});

socket.on( 'last-ticket' , ( paylaod ) => {
    lblNuevoTicket.innerText =  `Ticket ${paylaod}`
}); 

buttonCreate.addEventListener( 'click', () => {
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});