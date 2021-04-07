const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const googleVerify = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo",
            });
        }
        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado false",
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password",
            });
        }
        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador del sitio",
        });
    }
};

const googleSignin = async(req, res = response) => {
    try {
        const { id_token } = req.body;
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            // Crear usuario
            const data = {
                nombre,
                correo,
                password: ":P",
                img,
                google: true,
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            // Usuario no existe en BD
            return res.status(401).json({
                msg: "Hable con el administrador, usuario bloqueado",
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (err) {
        res.status(400).json({
            msg: "Token de Google no es válido",
        });
    }
};

module.exports = {
    login,
    googleSignin,
};