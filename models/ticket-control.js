const fs = require('fs');
const path = require('path');
const Ticket = require('./ticket');

class TicketControl {

    constructor() {
        this.last       = 0 ;
        this.today      = new Date().getDate();
        this.tickets    = [];
        this.lastFour   = [];

        this.init();
    }
    
    get toJson() {
        return {
            last : this.last,
            today : this.today,
            tickets : this.tickets,
            lastFour: this.lastFour
        }
    }

    init() {
        const { today, last, lastFour, tickets } = require('../db/data.json');
        if(today == this.today){
            this.tickets  = tickets;
            this.last     = last;
            this.lastFour = lastFour;
        } else {
            this.saveDatabase();
        }
    }

    saveDatabase() {
        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ));

    }

    next() {
        
        this.last += 1;
        const ticket = new Ticket( this.last, null );
        this.tickets.push( ticket );

        this.saveDatabase();

        return `Ticket ${ticket.number}`;
    }

    attend( desktop = '') {

        /**
         * No existen tickets pendiente
         */
        if( this.tickets.length == 0 ){
            return null;
        } 

        /**
         * Existen tickets pendientes
         */

        const ticket = this.tickets.shift(); //El método shift() elimina el primer elemento del array y lo retorna. Este método modifica la longitud del array.
        ticket.desktop = desktop;
        this.lastFour.unshift( ticket ); // El método unshift inserta los valores proporcionados al inicio de un objeto del tipo array. unshift es intencionalmente genérico

        if ( this.lastFour.length > 4){
            this.lastFour.splice( -1, 1); //El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos.
        }

        this.saveDatabase();

        return ticket;
    }
}   

module.exports = TicketControl;