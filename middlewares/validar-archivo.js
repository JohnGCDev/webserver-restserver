const validarArchivoSubir = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: "No hay archivos que subir - archivo" });
    }
    next();
};

const validarExtensionArchivo = (
    extensionesValidas = ["png", "jpg", "jpeg", "gif"]
) => {
    // Función que devuelve un middleware (otra función)
    return (req, res, next) => {
        const { archivo } = req.files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];

        //Validar la extensión
        if (!extensionesValidas.includes(extension)) {
            return res.status(400).json({
                msg: `La extensión .${extension} no es permitida - ${extensionesValidas}`,
            });
        }
        next();
    };
};

module.exports = {
    validarArchivoSubir,
    validarExtensionArchivo,
};