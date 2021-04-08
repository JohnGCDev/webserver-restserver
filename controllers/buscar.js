const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto, Role} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino); // Verificar si el termino se trata de un id de MongoDB
    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario)? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // Busqueda case insensitive
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });
    res.json({
        results: usuarios
    });
};

const buscarCategorias = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino); // Verificar si el termino se trata de un id de MongoDB
    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria)? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // Busqueda case insensitive
    const categorias = await Categoria.find({
        $and: [{nombre: regex}, {estado: true}],
    });
    res.json({
        results: categorias
    });
};

const buscarProductos = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino); // Verificar si el termino se trata de un id de MongoDB
    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto)? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // Busqueda case insensitive
    const productos = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre').populate('usuario', 'nombre');
    res.json({
        results: productos
    });
};

const buscarRoles = async(termino = '', res) => {
    const esMongoId = ObjectId.isValid(termino); // Verificar si el termino se trata de un id de MongoDB
    if(esMongoId){
        const rol = await Role.findById(termino);
        return res.json({
            results: (rol)? [rol] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // Busqueda case insensitive
    const roles = await Role.find({rol: regex});
    res.json({
        results: roles
    });
};

const buscar = (req, res = response) => {
    const {coleccion, termino} = req.params;
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':        
            buscarCategorias(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        case 'roles':
            buscarRoles(termino, res);
            break;
        default:
            // res.status(500).json({
            //     msg: `Se me olvidó incluir ${coleccion} en los parámetros de busqueda`
            // });
            res.json({
                results: []
            });
    }   
};

module.exports = {
    buscar,
};