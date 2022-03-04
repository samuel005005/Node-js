
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
    
    const socket = io({
        'extraHeaders': {
            'x-token':localStorage.getItem('token')
        }
    });
}

const main = async () => {
    await validarJWT();

}


main();
// const socket = io();

// socket.on( 'connect' , () => {
    
// });