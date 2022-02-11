
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role:{
        type:String,
        required: [true, 'El role es obligatio']
    },
});

RoleSchema.methods.toJSON = function(){
    const { _id , ...rol} = this.toObject();

    rol.id = _id;
    
    return rol;
}

module.exports = model ('Role', RoleSchema );