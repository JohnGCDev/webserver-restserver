const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async(req, res = response, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay un token en la petición",
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        // Verificar que usuario exista en la BD
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido - Usuario no existente en la BD",
            });
        }

        // Verificar que el usuario siga activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no válido - Usuario con estado: false",
            });
        }
        req.usuario = usuario;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};

module.exports = {
    validarJWT,
};