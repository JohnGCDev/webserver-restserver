const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async(req, res) => {
    try {
        const nombreArchivo = await subirArchivo(req.files, undefined, "imgs");
        res.json({
            nombre: nombreArchivo,
        });
    } catch (err) {
        res.status(400).json({ msg: err });
    }
};

const actualizarImagen = async(req, res) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID ${id}`,
                });
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imgs previas
    try {
        if (modelo.img) {
            // Ya existe una img previa, eliminarla
            const pathImagen = path.join(
                __dirname,
                "../uploads/",
                coleccion,
                modelo.img
            );
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (err) {
        console.log(err);
    }

    modelo.img = await subirArchivo(req.files, undefined, coleccion);

    await modelo.save();

    res.json({ modelo });
};

const mostrarImagen = async(req, res) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID ${id}`,
                });
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    try {
        if (modelo.img) {
            // Armar el path para mostrar la img
            const pathImagen = path.join(
                __dirname,
                "../uploads/",
                coleccion,
                modelo.img
            );
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }
    } catch (err) {
        console.log(err);
    }
    // Imagen no encontrada, mostrar una imagen de relleno
    res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
};

const actualizarImagenCloudinary = async(req, res) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID ${id}`,
                });
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    // Limpiar imgs previas
    try {
        if (modelo.img) {
            // Ya existe una img previa, eliminarla
            const nombreArr = modelo.img.split("/");
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
        }
    } catch (err) {
        console.log(err);
    }
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json({ modelo });
};

const mostrarImagenCloudinary = async(req, res) => {
    const { coleccion, id } = req.params;

    let modelo;
    switch (coleccion) {
        case "usuarios":
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el ID ${id}`,
                });
            }
            break;
        case "productos":
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el ID ${id}`,
                });
            }
            break;

        default:
            return res.status(500).json({ msg: "Se me olvido validar esto" });
    }

    try {
        if (modelo.img) {
            return res.json({url: modelo.img});
        }
    } catch (err) {
        console.log(err);
    }
    // Imagen no encontrada, mostrar una imagen de relleno
    res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary,
};