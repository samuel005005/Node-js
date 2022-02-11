
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required : [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        require:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        refer:'Usuario',
        require:true
    }
});

CategoriaSchema.methods.toJSON = function(){

    const {__v, _id, ...categoria} = this.toObject();
    categoria.id = _id
    
    return categoria;
}

module.exports = model ('Categoria', CategoriaSchema );