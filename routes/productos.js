const { Router } = require("express");
const { check } = require("express-validator");
const {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
} = require("../controllers/productos");
const {
    existeProductoPorId,
    existeCategoriaPorId,
} = require("../helpers/db-validators");

const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// Obtener todas los productos - publico
router.get("/", obtenerProductos);

// Obtener un producto por id - publico
router.get(
    "/:id", [
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProductoPorId
);

// Crear producto - privado - cualquier persona con un token válido
router.post(
    "/", [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("categoria", "Debe proporcionarse una categoría").not().isEmpty(),
        check("categoria", "Se requiere un ID de categoría válido").isMongoId(),
        check("categoria").custom(existeCategoriaPorId),
        validarCampos,
    ],
    crearProducto
);

// Actualizar producto - privado - cualquier persona con un token válido
router.put(
    "/:id", [
        validarJWT,
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos, // Detener las validaciones en este punto si se encuentra algún error
        check("categoria", "Debe proporcionarse una categoría").not().isEmpty(),
        check("categoria", "Se requiere un ID de categoría válido").isMongoId(),
        check("categoria").custom(existeCategoriaPorId),
        check("nombre", "El nombre es obligatorio").not().isEmpty(), // No debería ser obligatorio
        validarCampos,
    ],
    actualizarProducto
);

// Borrar producto - privado - Solo Admin
router.delete(
    "/:id", [
        validarJWT,
        esAdminRole,
        check("id", "Se requiere un ID").not().isEmpty(),
        check("id", "Se requiere un ID válido").isMongoId(),
        check("id").custom(existeProductoPorId),
        validarCampos,
    ],
    eliminarProducto
);

module.exports = router;