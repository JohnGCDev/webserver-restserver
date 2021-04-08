const { Producto } = require("../models");

const obtenerProductos = async(req, res) => {
    const { limite = "5", desde = "0" } = req.query;
    const query = { estado: true };

    const [productos, total] = await Promise.all([
        Producto.find(query)
        .limit(Number(limite))
        .skip(Number(desde))
        .populate("usuario", "nombre")
        .populate("categoria", "nombre"),
        Producto.countDocuments(query),
    ]);

    res.json({
        total,
        productos,
    });
};

const obtenerProductoPorId = async(req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate("usuario", "nombre")
        .populate("categoria", "nombre");

    if (!producto.estado) {
        return res.status(400).json({
            msg: `No existe ningún producto en la BD con el id ${id}`,
        });
    }

    res.json({
        producto,
    });
};

const crearProducto = async(req, res) => {
    const { nombre, precio = 0, categoria, descripcion = "" } = req.body;

    // Validar que un producto con el mismo nombre no exista
    const productoDB = await Producto.findOne({ nombre: nombre.toUpperCase() });
    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`,
        });
    }

    // Generar la data a guardar
    const data = {
        nombre: nombre.toUpperCase(),
        precio,
        categoria,
        descripcion,
        usuario: req.usuario._id,
    };

    const producto = new Producto(data);
    // Guardar en DB
    await producto.save();

    res.status(201).json({ producto });
};

actualizarProducto = async(req, res) => {
    const { id } = req.params;
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        precio: req.body.precio || 0,
        categoria: req.body.categoria,
        descripcion: req.body.descripcion || "",
        usuario: req.usuario._id,
    };

    // Validar que el nombre no exista
    const productoBD = await Producto.findOne({ nombre: data.nombre });
    if (productoBD) {
        return res.status(400).json({
            msg: `El nombre ${data.nombre} no se encuentra disponible. Elija otro.`,
        });
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
    res.json({
        producto,
    });
};

eliminarProducto = async(req, res) => {
    const { id } = req.params;

    await Producto.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: "Producto Eliminado",
    });
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};