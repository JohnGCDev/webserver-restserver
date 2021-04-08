const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

const esRoleValido = async(rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const emailExiste = async(correo = "") => {
    const yaExisteEmail = await Usuario.findOne({ correo });
    if (yaExisteEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`);
    }
};

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe ningún usuario con el id: ${id}`);
    }
};

const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`No existe ninguna categoría con el id ${id}`);
    }
};

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`No existe ningún producto con el id ${id}`);
    }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(
            `La colección ${coleccion} no es permitida, ${colecciones}`
        );
    }
    return true;
};

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas,
};