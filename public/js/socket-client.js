// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.getElementById('txtMensaje');
const btnEnviar = document.getElementById('btnEnviar');



const socket = io();

socket.on('connect' , () => {
    console.log("Cliente conectado" , socket.id);
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect' , () => {
    console.log("Cliente desconectado");
    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

btnEnviar.addEventListener( 'click', () => {
    
    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        uui: '12321sdda21321321321'
    }
    
    socket.emit( 'enviar-mensaje' , payload , ( id ) => {
        console.log("Desde el server",id);
    } );

    socket.on( 'enviar-mensaje' , ( payload ) =>{
        console.log("Desde el server",payload);
    } );
});