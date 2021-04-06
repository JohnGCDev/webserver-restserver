const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
};