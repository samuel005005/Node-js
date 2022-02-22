// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

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