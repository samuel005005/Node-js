// Referencias html

let txtUid  = document.querySelector('#txtUid');
let txtMensaje  = document.querySelector('#txtMensaje');
let ulUsuarios  = document.querySelector('#ulUsuarios');
let ultMensajes = document.querySelector('#ulMensajes');
let btnSalir    = document.querySelector('#btn-exit');


let usuario = null;
let socket = null;
const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8001/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


const validarJWT = async() => {

    const token = localStorage.getItem('token') || '';

    if( token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servicio');
    }
    
    const response = await fetch( url, 
        { headers: 
            { 
                'x-token':token 
            } 
    });

    const { user:usuarioDb, token:tokenDb } = await response.json();
    localStorage.setItem('token', tokenDb);
    usuario = usuarioDb;
    document.title = usuario.nombre;

    await conectarSocket();
}

const conectarSocket = async () => {
    
    socket = io({
        'extraHeaders': {
            'x-token':localStorage.getItem('token')
        }
    });

    socket.on('connect' , () => {
        
        console.log('Socket conectado')
    });


    socket.on('disconnect' , () => {
        
        console.log('Socket disconnect')
    });

    socket.on('recibir-mensajes', () => {

    });

    socket.on('usuariosActivos', () => {
        
    });

    socket.on('mensaje-privado', () => {
        
    });

}

const main = async () => {
    await validarJWT();

}


main();
// const socket = io();

// socket.on( 'connect' , () => {
    
// });