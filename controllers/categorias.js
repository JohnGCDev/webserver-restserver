const { Categoria } = require("../models");

const obtenerCategorias = async(req, res) => {
    const { limite = "5", desde = "0" } = req.query;
    const query = { estado: true };

    const [categorias, total] = await Promise.all([
        Categoria.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
        .populate("usuario", "nombre"),
        Categoria.countDocuments(query),
    ]);

    res.json({
        total,
        categorias,
    });
};

const obtenerCategoriaPorId = async(req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate("usuario", "nombre");

    if (!categoria.estado) {
        return res.status(400).json({
            msg: `No existe ninguna categoría en la BD con el id ${id}`,
        });
    }

    res.json({
        categoria,
    });
};

const crearCategoria = async(req, res) => {
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoría ${categoriaDB.nombre} ya existe`,
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);
    // Guardar en DB
    await categoria.save();

    res.status(201).json({ categoria });
};

actualizarCategoria = async(req, res) => {
    const { id } = req.params;
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    };

    // Validar que el nombre no exista
    const categoriaBD = await Categoria.findOne({ nombre: data.nombre });
    if (categoriaBD) {
        return res.status(400).json({
            msg: `El nombre ${data.nombre} no se encuentra disponible. Elija otro.`,
        });
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});
    res.json({
        categoria,
    });
};

eliminarCategoria = async(req, res) => {
    const { id } = req.params;

    await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: "Categoria Eliminada",
    });
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
};