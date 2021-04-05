const {response} = require('express');

const usuariosGet = (req, res = response) => {
    const {token, page = 1, limit} = req.query
    res.json({
        msg: 'get API - Controller',
        token,
        page,
        limit
    });
};

const usuariosPut = (req, res = response) => {
    const {id} = req.params;
    res.json({
        msg: 'put API - Controller',
        id
    });
};

const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.status(201).json({
        msg: 'post API - Controller',
        body
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controller'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}