const { Router } = require("express");
const { check } = require("express-validator");
const {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary,
} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");
const {
    validarArchivoSubir,
    validarExtensionArchivo,
} = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post("/", validarArchivoSubir, cargarArchivo);

// Actualizar imgs de un modelo en la Nube
router.put(
    "/:coleccion/:id", [
        validarArchivoSubir,
        validarExtensionArchivo(undefined),
        check("id", "El ID debe ser válido").isMongoId(),
        check("coleccion").custom((c) =>
            coleccionesPermitidas(c, ["usuarios", "productos"])
        ),
        validarCampos,
    ],
    actualizarImagenCloudinary
);

// Actualizar imgs de un modelo localmente
// router.put(
//     "/:coleccion/:id", [
//         validarArchivoSubir,
//         check("id", "El ID debe ser válido").isMongoId(),
//         check("coleccion").custom((c) =>
//             coleccionesPermitidas(c, ["usuarios", "productos"])
//         ),
//         validarCampos,
//     ],
//     actualizarImagen
// );

// Obtener imgs de un modelo localmente
// router.get(
//     "/:coleccion/:id", [
//         check("id", "El ID debe ser válido").isMongoId(),
//         check("coleccion").custom((c) =>
//             coleccionesPermitidas(c, ["usuarios", "productos"])
//         ),
//         validarCampos,
//     ],
//     mostrarImagen
// );

// Obtener imgs de un modelo en la Nube
router.get(
    "/:coleccion/:id", [
        check("id", "El ID debe ser válido").isMongoId(),
        check("coleccion").custom((c) =>
            coleccionesPermitidas(c, ["usuarios", "productos"])
        ),
        validarCampos,
    ],
    mostrarImagenCloudinary
);

module.exports = router;