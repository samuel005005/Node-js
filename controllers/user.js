const { response, request } = require('express');

const getUser = (req = request, res = response) => {

    const { q, name = "No Name", apikey, page = 1, limit } = req.query;

    res.json({
        'msj':'get API - controlador',
        q,
        name,
        apikey,
        page,
        limit
    });

}

const postUser = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        'msj':'get API - controlador',
        nombre,
        edad
    });

}

const putUser = (req = request, res = response) => {

    const id = req.params.id;

    res.json({
        'msj':'get API - controlador',
        id
    });
}

const patchUser = (req = request, res = response) => {

    res.json({
        'msj':'get API - controlador'
    });

}

const deleteUser = (req = request, res = response) => {

    res.json({
        'msj':'get API - controlador'
    });
     
}


 
module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}