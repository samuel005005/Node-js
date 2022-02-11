
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
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Role' 
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

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model ('Usuario', UsuarioSchema );