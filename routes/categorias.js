const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
} = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
    "/:id", [
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        validarCampos,
    ],
    obtenerCategoriaPorId
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
    "/", [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    crearCategoria
);

// Actualizar categoria - privado - cualquier persona con un token válido
router.put(
    "/:id", [
        validarJWT,
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ],
    actualizarCategoria
);

// Borrar categoria - privado - Solo Admin
router.delete(
    "/:id", [
        validarJWT,
        esAdminRole,
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeCategoriaPorId),
        validarCampos,
    ],
    eliminarCategoria
);

module.exports = router;