
class chatMensajes {

    constructor(){
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10);
    }

    get usuariosArr() {
        return Object.values( this.usuarios );
    }
}