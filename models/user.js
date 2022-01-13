
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required: [true, 'El nombre es obligatio']
    },
    correo:{
        type:String,
        required: [true, 'El correo es obligatio'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'La contraseña es obligatio']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }
});

module.exports = model ('Usuario', UsuarioSchema );