const { response, request } = require('express');

const getUser = (req = request, res = response) => {
    res.json({
        'msj':'get API - controlador'
    });
}

const postUser = (req = request, res = response) => {
    res.json({
        'msj':'get API - controlador'
    });
}

const putUser = (req = request, res = response) => {
    res.json({
        'msj':'get API - controlador'
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